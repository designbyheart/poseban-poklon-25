<?php

namespace App;

use App\Coupon;
use App\Jobs\SendOrderStatusChangedEmail;
use App\Jobs\SendNewOrderUserEmail;
use App\Jobs\SendVoucherEmail;
use App\Services\EmailService;
use Auth;
use App\Product;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\OrderStatus;
use App\Promotion;
use Illuminate\Database\Eloquent\Model;

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
        return $this->belongsTo('App\OrderStatus', 'order_status_id');
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

    //Set order status function and send status email
    public function setStatus($status, $message = null)
    {
        $this->status()->associate($status);

        if ($this->update()) {
            $this->sendStatusEmail($status, $message);
            return response()->json('success', 200);
        }
    }

    //Send status email info
    public function sendStatusEmail($status, $message = null)
    {
        if (empty($message)) {
            $message = $status->message;
        }

        $email = $this->customer_email;

        $order = $this->load('shippingMethod', 'paymentMethod', 'giftCard', 'coupon', 'currency', 'status', 'items.product', 'user');

        if (!empty($message)) {
            SendOrderStatusChangedEmail::dispatch($email, $message, $order)->delay(now()->addSeconds(10));
        }
    }

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

        $this->total =  $this->subtotal;

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

    //Prepare parameters for payment system
    public function getPaymentParams()
    {
        $orgClientId = env('NESTPAY_ID');
        $orgOid = $this->id;
        $orgAmount = number_format((float)$this->total, 2, '.', '');
        $orgOkUrl = "https://posebanpoklon.rs/payment/success";
        $orgFailUrl = "https://posebanpoklon.rs/payment/fail";
        $shopurl = "https://posebanpoklon.rs/";
        $orgTransactionType = "Auth";
        $orgInstallment = "";
        $orgRnd = bin2hex(random_bytes(20));
        $orgCurrency = "941";
        $clientId = str_replace("|", "\\|", str_replace("\\", "\\\\", $orgClientId));
        $oid = str_replace("|", "\\|", str_replace("\\", "\\\\", $orgOid));
        $amount = str_replace("|", "\\|", str_replace("\\", "\\\\", $orgAmount));
        $okUrl = str_replace("|", "\\|", str_replace("\\", "\\\\", $orgOkUrl));
        $failUrl = str_replace("|", "\\|", str_replace("\\", "\\\\", $orgFailUrl));
        $transactionType = str_replace("|", "\\|", str_replace("\\", "\\\\", $orgTransactionType));
        $installment = str_replace("|", "\\|", str_replace("\\", "\\\\", $orgInstallment));
        $rnd = str_replace("|", "\\|", str_replace("\\", "\\\\", $orgRnd));
        $currency = str_replace("|", "\\|", str_replace("\\", "\\\\", $orgCurrency));
        $storeKey =  env('NESTPAY_KEY');
        $plainText = $clientId . "|" . $oid . "|" . $amount . "|" . $okUrl . "|" . $failUrl . "|" . $transactionType . "|" . $installment . "|" . $rnd . "||||" . $currency . "|" . $storeKey;
        $hashValue = hash('sha512', $plainText);
        $hash = base64_encode(pack('H*', $hashValue));
        $lang = "sr";
        return (object) [
            'clientid' => $orgClientId,
            'description' => 'Porudžbina ' . $orgOid,
            'amount' => $orgAmount,
            'oid' => $orgOid,
            'rnd' => $orgRnd,
            'okUrl' => $okUrl,
            'failUrl' => $failUrl,
            'shopurl' => $shopurl,
            'trantype' => $orgTransactionType,
            'currency' => $orgCurrency,
            'hash' => $hash,
            'storetype' => '3d_pay_hosting',
            'hashAlgorithm' => 'ver2',
            'lang' => $lang,
            'encoding' => 'utf-8'
        ];
    }

    //Generate a PDF Voucher
    public function generateVouchers()
    {
        try {
            $order = $this;

            $order_items = $order->items->load('product');
            $vouchersGenerated = false;

            foreach ($order_items as $item) {

                $order_item = OrderItem::find($item->id);

                $product = $order_item->product;

                $product_count = $order_item->product_quantity;

                $product_properties = json_decode($product->properties);

                $already_generated = $order_item->vouchers->count();

                $vouchers_count = $product_count - $already_generated;

                $personal_messages = json_decode($item->personal_message);

                if ($vouchers_count > 0) {

                    for ($i = 0; $i < $vouchers_count; $i++) {

                        if (!empty($order_item)) {

                            $voucher = new Voucher();

                            $voucher->voucher_code = $voucher->generateVoucherCode();

                            $voucher->activation_code = $voucher->generateActivationCode();

                            $voucher->end_date = $voucher->generateEndDate();

                            $voucher->order()->associate($order);
                            $voucher->orderItem()->associate($order_item);

                            //Set voucher values
                            $voucher->title = $product->title;
                            $voucher->description = $product->voucher_description;

                            if ($already_generated > 0) {

                                $voucher->personal_message = $personal_messages[$already_generated]->text;
                            } else {

                                $voucher->personal_message = $personal_messages[$i]->text;
                            }

                            //Voucher properties
                            $voucher->weather = $product_properties->weather;
                            $voucher->duration = $product_properties->duration;
                            $voucher->location = $product_properties->location;
                            $voucher->visitors = $product_properties->visitors;
                            $voucher->dress_code = $product_properties->dress_code;
                            if (!empty($product_properties->za_gledaoce)) {

                                $voucher->za_gledaoce = $product_properties->za_gledaoce;
                            }
                            $voucher->additional_info = $product_properties->additional_info;

                            if ($voucher->save() && $order->customer_email !== 'abramusagency@gmail.com') {
                                // Send email to partner company
                                $voucher->sendCompanyEmail();
                                $vouchersGenerated = true;
                            }
                        }
                    }
                }
            }

            // Send email to customer with vouchers
            if ($vouchersGenerated && $order->customer_email !== 'abramusagency@gmail.com') {
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
     * @param string $paper_size
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
                'customer_email' => $this->customer_email
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
