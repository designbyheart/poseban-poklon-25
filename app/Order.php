<?php

namespace App;

use App\Jobs\SendNewOrderUserEmail;
use App\Jobs\SendOrderStatusChangedEmail;
use App\Jobs\SendVoucherEmail;
use App\Utilities\VoucherUtility;
use Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class Order extends Model
{
    //'subtotal', 'total', 'discount',

    protected $fillable = ['customer_name', 'customer_surname', 'customer_email', 'customer_phone', 'address_one', 'address_two', 'country', 'city', 'zip_code', 'comment', 'coupon_code', 'created_at', 'user_agreements', 'rec_name', 'rec_surname', 'rec_phone', 'rec_email', 'transaction_data'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function coupon()
    {
        return $this->belongsTo('App\Coupon');
    }

    public function giftCard()
    {
        return $this->belongsTo('App\GiftCard');
    }

    public function currency()
    {
        return $this->belongsTo('App\Currency');
    }

    public function paymentMethod()
    {
        return $this->belongsTo('App\PaymentMethod');
    }

    public function shippingMethod()
    {
        return $this->belongsTo('App\ShippingMethod');
    }

    public function status()
    {
        return $this->belongsTo(OrderStatus::class, 'order_status_id');
    }

    public function items()
    {
        return $this->hasMany('App\OrderItem', 'order_id');
    }

    public function bundles()
    {
        return $this->belongsToMany('App\Bundle', 'bundles_orders')->withTimestamps();
    }

    public function vouchers()
    {
        return $this->hasMany('App\Voucher', 'order_id');
    }

    /**
     * Set order status and send notification email
     *
     * @param OrderStatus $status Status to set
     * @param string|null $message Custom message (defaults to status message)
     * @return \Illuminate\Http\JsonResponse
     */
    public function setStatus($status, $message = null)
    {
        try {
            // Update order status relationship
            $this->status()->associate($status);

            // Save the order and send email notification
            if ($this->update()) {
                $this->sendStatusEmail($status, $message);

                // For paid status, generate vouchers
                if ($status->id === 2) { // 2 = Paid
                    Log::info('Order marked as paid, generating vouchers', ['order_id' => $this->id]);
                    $this->generateVouchers();
                }

                return response()->json('success', 200);
            }
        } catch (\Exception $e) {
            Log::error('Exception in setStatus', [
                'order_id' => $this->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json('error', 500);
        }
    }

    /**
     * Send order status change email notification
     *
     * @param OrderStatus $status New status
     * @param string|null $message Custom message (defaults to status message)
     * @return void
     */
    public function sendStatusEmail($status, $message = null)
    {
        if (empty($message)) {
            $message = $status->message;
        }

        $email = $this->customer_email;
        if (empty($email)) {
            Log::warning('Cannot send status email: missing customer email', [
                'order_id' => $this->id
            ]);
            return;
        }

        $order = $this->load('shippingMethod', 'paymentMethod', 'giftCard', 'coupon', 'currency', 'status', 'items.product', 'user');

        if (!empty($message)) {
            SendOrderStatusChangedEmail::dispatch($email, $message, $order)->delay(now()->addSeconds(10));
            Log::info('Status change email dispatched', [
                'order_id' => $this->id,
                'status_id' => $status->id,
                'customer_email' => $email
            ]);
        }
    }

    /**
     * Calculate order prices including discounts
     *
     * @param Request|null $request
     * @param bool $check_price
     * @return $this
     */
    public function countPrice($request = null, $check_price = false)
    {
        $discount = 0;
        $this->coupon_discount = 0;
        $this->giftcard_discount = 0;

        $this->subtotal = $this->items->sum('product_total');

        //Add all bundles price to order subtotal
        if (!empty($this->bundles)) {
            $bundle_price = 0;

            foreach ($this->bundles as $bundle) {
                $bundle_price += $bundle->items()->sum('price');
            }

            $this->subtotal += $bundle_price;
        };

        $this->total = $this->subtotal;

        //Find all promotions available for order products or categories, returns discount value
        $promotion_discount = Promotion::process($this->items, $check_price);
        $discount += $promotion_discount;

        //Validate coupon and calculate discount for order
        if (!empty($this->coupon_code)) {
            $coupon = Coupon::where('coupon_code', $this->coupon_code)->first();

            if (!empty($coupon) && $coupon->validate()) {
                $discount += $this->coupon_discount = $coupon->process($this->items, $request);
            }
        }

        //Add giftcard price to discount
        if (!empty($this->giftcard_code)) {
            $giftCard = GiftCard::where('code', $this->giftcard_code)->first();
            $this->giftcard_discount = $giftCard->value;
            $discount += $this->giftcard_discount;

            $discount_per_item = $this->giftcard_discount / count($this->items);

            foreach ($this->items as $item) {
                $item->gift_card_discount = $discount_per_item;
                $item->update();
            }
        }

        $this->discount = $discount;
        $this->total -= $discount;

        //Add shipping price to order cost
        if (!empty($this->shippingMethod)) {
            $this->total += $this->shippingMethod->cost;
            $this->subtotal += $this->shippingMethod->cost;
        }

        if ($this->total < 0) {
            $this->total = 0;
        }

        $this->update();

        return $this;
    }

    /**
     * Prepare parameters for payment system
     *
     * @return object Payment parameters
     */
    public function getPaymentParams()
    {
        // Use production merchant ID for production environment, test ID for others
        $isProd = app()->environment('production');
        $orgClientId = env('NESTPAY_ID');

        // Use production store key for production environment, test key for others
        $storeKey = env('NESTPAY_KEY');

        $orgOid = $this->id;
        $orgAmount = number_format((float)$this->total, 2, '.', '');
        $orgOkUrl = "https://posebanpoklon.rs/payment/success";
        $orgFailUrl = "https://posebanpoklon.rs/payment/fail";
        $shopurl = "https://posebanpoklon.rs/";
        $orgTransactionType = "Auth";
        $orgInstallment = "";
        $orgRnd = bin2hex(random_bytes(20));
        $orgCurrency = "941"; // Serbian dinar as specified in instructions
        $clientId = str_replace("|", "\\|", str_replace("\\", "\\\\", $orgClientId));
        $oid = str_replace("|", "\\|", str_replace("\\", "\\\\", $orgOid));
        $amount = str_replace("|", "\\|", str_replace("\\", "\\\\", $orgAmount));
        $okUrl = str_replace("|", "\\|", str_replace("\\", "\\\\", $orgOkUrl));
        $failUrl = str_replace("|", "\\|", str_replace("\\", "\\\\", $orgFailUrl));
        $transactionType = str_replace("|", "\\|", str_replace("\\", "\\\\", $orgTransactionType));
        $installment = str_replace("|", "\\|", str_replace("\\", "\\\\", $orgInstallment));
        $rnd = str_replace("|", "\\|", str_replace("\\", "\\\\", $orgRnd));
        $currency = str_replace("|", "\\|", str_replace("\\", "\\\\", $orgCurrency));

        // Log payment parameters for debugging
        Log::info('Generating payment parameters', [
            'order_id' => $this->id,
            'merchant_id' => $orgClientId,
            'environment' => app()->environment(),
            'amount' => $orgAmount
        ]);

        $plainText = $clientId . "|" . $oid . "|" . $amount . "|" . $orgOkUrl . "|" . $orgFailUrl . "|" . $transactionType . "||" . $rnd . "||||" . $currency . "|" . $storeKey;
        $hashValue = hash('sha512', $plainText);
        $hash = base64_encode(pack('H*', $hashValue));
        $lang = "sr"; // Serbian language as specified in instructions
        return (object)[
            'clientid' => $orgClientId,
            'description' => 'Porudžbina ' . $orgOid,
            'amount' => $orgAmount,
            'oid' => $orgOid,
            'rnd' => $orgRnd,
            'okUrl' => $orgOkUrl, // Fixed to use original URL without escaping
            'failUrl' => $orgFailUrl, // Fixed to use original URL without escaping
            'shopurl' => $shopurl,
            'trantype' => $orgTransactionType,
            'currency' => $orgCurrency,
            'hash' => $hash,
            'storetype' => '3d_pay_hosting',
            'hashAlgorithm' => 'ver2', // As specified in instructions
            'lang' => $lang,
            'encoding' => 'utf-8'
        ];
    }

    /**
     * Generate vouchers for this order
     *
     * @return bool Success status
     */
    public function generateVouchers()
    {
        try {
            $order = $this;

            // Don't generate vouchers for failed or unpaid orders
            if ($order->status->id !== 2) { // 2 = Paid status
                Log::warning('Attempted to generate vouchers for non-paid order', [
                    'order_id' => $order->id,
                    'status_id' => $order->status->id
                ]);
                return false;
            }

            $order_items = $order->items->load('product');
            $vouchersGenerated = false;

            foreach ($order_items as $item) {
                $order_item = OrderItem::find($item->id);
                $product_count = $order_item->product_quantity;

                // Check if we've already generated some vouchers for this order item
                $already_generated = $order_item->vouchers->count();
                $vouchers_count = $product_count - $already_generated;
                $personal_messages = json_decode($item->personal_message);

                if ($vouchers_count > 0) {
                    Log::info('Generating ' . $vouchers_count . ' vouchers for order item', [
                        'order_id' => $order->id,
                        'item_id' => $item->id,
                        'product_id' => $order_item->product->id
                    ]);

                    for ($i = 0; $i < $vouchers_count; $i++) {
                        if (!empty($order_item)) {
                            $voucher = VoucherUtility::createVoucher(
                                $order,
                                $order_item,
                                $i,
                                $already_generated,
                                $personal_messages
                            );

                            if ($voucher) {
                                $vouchersGenerated = true;
                            } else {
                                Log::error('Failed to generate voucher', [
                                    'order_id' => $order->id,
                                    'item_id' => $item->id,
                                    'index' => $i
                                ]);
                            }
                        }
                    }
                }
            }

            // Send email to customer with vouchers
            if ($vouchersGenerated) {
                Log::info('Vouchers were generated, sending email to customer', ['order_id' => $order->id]);
                $this->sendCustomerEmail();
            }

            return true;

        } catch (\Exception $e) {
            Log::error('Error generating vouchers', [
                'order_id' => $this->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return false;
        }
    }

    /**
     * Send email with vouchers to the customer
     *
     * @param string $paper_size PDF paper size ('a4' or 'a5')
     * @return bool Whether the email was sent successfully
     */
    public function sendCustomerEmail($paper_size = 'a4')
    {
        try {
            if (empty($this->customer_email)) {
                Log::error('Cannot send customer email: missing customer email', [
                    'order_id' => $this->id
                ]);
                return false;
            }

            // First send order confirmation email immediately
            SendNewOrderUserEmail::dispatch($this);
            Log::info('Order confirmation email dispatched', [
                'order_id' => $this->id,
                'customer_email' => $this->customer_email
            ]);

            // Count vouchers to verify they exist
            $voucherCount = Voucher::where('order_id', $this->id)->count();
            if ($voucherCount == 0) {
                Log::error('Cannot send customer email: no vouchers found', [
                    'order_id' => $this->id
                ]);
                return false;
            }

            // Use the job to send vouchers with delay
            SendVoucherEmail::dispatch($this->id)->delay(now()->addMinutes(5));
            Log::info('Voucher email job dispatched with delay', [
                'order_id' => $this->id,
                'customer_email' => $this->customer_email,
                'recipient_email' => $this->rec_email ?? 'none'
            ]);
            return true;
        } catch (\Exception $e) {
            Log::error('Exception in sendCustomerEmail', [
                'order_id' => $this->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return false;
        }
    }
}
