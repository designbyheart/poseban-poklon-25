<?php

namespace App\Http\Controllers;

use App\Bundle;
use App\Currency;
use App\GiftCard;
use App\Jobs\SendNewOrderAdminEmail;
use App\Jobs\SendNewOrderUserEmail;
use App\Order;
use App\OrderItem;
use App\OrderStatus;
use App\PaymentMethod;
use App\Product;
use App\Services\EmailService;
use App\Services\FiscalCashRegister;
use App\Setting;
use App\ShippingMethod;
use App\Version;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{

    public function __construct()
    {

        $this->middleware('check_role:admin,editor', ['except' => ['publicIndexData', 'ordersHistory', 'calculate', 'store', 'orderSuccess', 'paymentSuccess', 'paymentFail']]);
        $this->middleware('auth', ['only' => ['ordersHistory']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        return view('admin.order.index');
    }

    /**
     * Send list of orders with JSON
     */
    public function indexData(Request $request)
    {
        $orders = new Order();

        $per_page = $request->per_page ?? 20;

        if (!empty($request->sort_key) && !empty($request->sort_order)) {
            $orders = $orders->orderBy($request->sort_key, $request->sort_order);
        }

        if (!empty($request->search)) {
            $orders = $orders->where('id', 'like', '%' . $request->search . '%')
                ->orWhere('customer_name', 'like', '%' . $request->search . '%')
                ->orWhere('customer_surname', 'like', '%' . $request->search . '%')
                ->orWhere('customer_email', 'like', '%' . $request->search . '%');
        }

        $orders = $orders->with('paymentMethod', 'shippingMethod', 'status')->paginate($per_page);

        $orders->getCollection()->transform(function ($order, $key) use ($request) {
            $order = convertPrices($request, null, $order);
            return $order;
        });

        return response()->json($orders, 200);
    }

    /**
     * Send list of orders for current user with JSON
     */
    public function publicIndexData(Request $request)
    {
        $user = Auth::user();

        if (!empty($user)) {

            $per_page = $request->per_page ?? 20;

            $orders = Order::where('user_id', $user->id)->with('items')->paginate($per_page);

            return response()->json($orders, 200);
        }
    }

    /**
     * Get a single item data
     */
    public function getSingleItem(Request $request)
    {

        $order = Order::find($request->id);

        $order->load('currency', 'user', 'paymentMethod', 'shippingMethod', 'status', 'items');

        $order->items->load('product', 'vouchers');

        if (!empty($order)) {
            return response()->json($order);
        }
    }

    /**
     * Get user orders history
     */
    public function ordersHistory()
    {
        $user = Auth::User();
        $orders = Order::where('user_id', $user->id)->get();

        return view('user.profile.orders-history', compact('orders'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        return view('user.order.create');
    }

    /**
     * Calculate price
     */
    public function calculate(Request $request)
    {
        $order = new Order($request->all());

        if (!empty($request->giftcard_code)) {

            $giftCard = GiftCard::where('code', $request->giftcard_code)->first();

            if (!empty($giftCard) && $giftCard->validate()) {
                $order->giftcard_code = $giftCard->code;
            }
        }

        $orderItems = $request->order_items;

        foreach ($orderItems as $item) {
            $product = Product::find($item['product_id']);
            $orderItem = new OrderItem($item);
            $orderItem->product()->associate($product);
            $orderItem->order()->associate($order);
            $orderItem->product_price = $product->price;

            //every order item can have multiple versions(color, material, size, etc..) which can affect price value.
            if (!empty($item['versions'])) {

                foreach ($item['versions'] as $v) {

                    $version = Version::find($v);

                    $version->increase_price ?
                        $orderItem->product_price += $version->price :
                        $orderItem->product_price -= $version->price;

                    $orderItem->versions->push($version);
                }

                $orderItem->product_total = $orderItem->product_price * $item['product_quantity'];
            } else {
                $orderItem->product_total = $orderItem->product_price * $item['product_quantity'];
            }

            if ($orderItem->box_count > 0) {
                $orderItem->box_total = $orderItem->box_count * 690;
                $orderItem->product_total += $orderItem->box_total;
            }

            $order->items->push($orderItem);
        }

        //Adds bundles to orders from array of bundle id's
        if (!empty($request->bundles)) {

            foreach ($request->bundles as $b) {
                $bundle = Bundle::find($b);
                $order->bundles->push($bundle);
            }
        }

        $order = $order->countPrice($request, $check_price = true);

        return $results = ["total" => $order['total'], "subtotal" => $order['subtotal'], "discount" => $order['discount']];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        $order = new Order($request->all());
        $user = null;
        //TODO add default currency for situation when request doesnt have one

        if (Auth::check()) {
            $user = Auth::user();
            $order->user()->associate($user);
        }

        if (!empty($request->currency_id)) {
            $currency = Currency::find($request->currency_id);
            $order->currency()->associate($currency);
        }

        if (!empty($request->payment_method_id)) {
            $order->paymentMethod()->associate(PaymentMethod::find($request->payment_method_id));
        }

        if (!empty($request->shipping_method_id)) {
            $order->shippingMethod()->associate(ShippingMethod::find($request->shipping_method_id));
        }

        if (!empty($request->giftcard_code)) {

            $giftcard = GiftCard::where('code', $request->giftcard_code)->first();

            if (!empty($giftcard) && $giftcard->validate()) {
                $order->giftcard_code = $giftcard->code;
                $giftcard->activate();
            }
        }

        if ($order->save()) {

            $orderItems = $request->order_items;

            foreach ($orderItems as $item) {

                $product = Product::find($item['product_id']);

                $orderItem = new OrderItem($item);

                $orderItem->product()->associate($product);

                $orderItem->order()->associate($order);

                $orderItem->product_price = $product->price;

                //every order item can have multiple versions(color, material, size, etc..) which can affect price value.
                if (!empty($item['versions'])) {

                    foreach ($item['versions'] as $v) {

                        $version = Version::find($v);

                        $version->increase_price ?
                            $orderItem->product_price += $version->price :
                            $orderItem->product_price -= $version->price;
                    }

                    $orderItem->product_total = $orderItem->product_price * $item['product_quantity'];

                    if ($orderItem->box_count > 0) {
                        $orderItem->box_total = $orderItem->box_count * 690;
                        $orderItem->product_total = $orderItem->product_total + $orderItem->box_total;
                    }

                    $orderItem->save();
                    $orderItem->versions()->sync($item['versions']);
                } else {
                    $orderItem->product_total = $orderItem->product_price * $item['product_quantity'];
                    if ($orderItem->box_count > 0) {
                        $orderItem->box_total = $orderItem->box_count * 690;
                        $orderItem->product_total = $orderItem->product_total + $orderItem->box_total;
                    }
                    $orderItem->save();
                }
            }

            //Adds bundles to orders from array of bundle id's
            if (!empty($request->bundles)) {
                $order->bundles()->sync($request->bundles);
            }

            $order->countPrice();

            //Get default status and call setStatus function, passing default
            $default_status_setting = Setting::where('slug', 'default_order_status')->first();

            if (!empty($default_status_setting)) {
                $status_id = (int)$default_status_setting->content;
                $default_status = OrderStatus::find($status_id);
            } else {
                $default_status = OrderStatus::where('title', 'New')->first();
            }


            //Send email to administrator about new order
            SendNewOrderAdminEmail::dispatch($order)->delay(now()->addSeconds(2));

            //Send email to administrator about new order
            SendNewOrderUserEmail::dispatch($order)->delay(now()->addSeconds(3));

            $order->setStatus($default_status);
        }

        //Prepare parameters for card payment if it is selected
        if ($order->paymentMethod->id === 3) {
            $payment_params = $order->getPaymentParams();
            return response()->json(['payment_params' => $payment_params], 200);
        } else {
            return response()->json('success', 200);
        }
    }

    /**
     * Successful payment page
     */
    public function paymentSuccess(Request $request)
    {
        if (!isset($request->oid)) {
            Log::error('Payment success called without order ID');
            return redirect()->route('home')->with('error', 'Invalid payment information');
        }

        $order = Order::find($request->oid);
        if (!$order) {
            Log::error('Payment success: Order not found', ['order_id' => $request->oid]);
            return redirect()->route('home')->with('error', 'Order not found');
        }

        try {
            $payment_params = $request->payment_params;
        } catch (Exception $e) {
            Log::error('Error retrieving payment params', [
                'order_id' => $request->oid,
                'error' => $e->getMessage()
            ]);
            $payment_params = null;
        }

        $transaction_data = [
            'order_id' => $request->oid,
            'auth_code' => $request->AuthCode ?? null,
            'trans_id' => $request->TransId ?? null,
            'response' => $request->Response ?? null,
            'proc_return_code' => $request->ProcReturnCode ?? null,
            'md_status' => $request->mdStatus ?? null,
            'extra_trxdate' => isset($request->EXTRA_TRXDATE) ?
                Carbon::parse($request->EXTRA_TRXDATE)->format('Y-m-d H:i:s') :
                Carbon::now()->format('Y-m-d H:i:s')
        ];

        try {
            DB::beginTransaction();

            $order->transaction_data = json_encode($transaction_data);
            //Set paid status
            $status = OrderStatus::find(2);

            // Save order before other operations
            $order->save();

            if (isset($status)) {
                $order->setStatus($status);
            }

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Failed to update order with transaction data', [
                'order_id' => $order->id,
                'error' => $e->getMessage()
            ]);
        }

        // Fiscal cash register - outside transaction as it's an external service
        try {
            $cashRegister = new FiscalCashRegister();
            $cashRegister->sendInvoice($order);
        } catch (Exception $e) {
            Log::error('Failed to send invoice to fiscal cash register', [
                'order_id' => $order->id,
                'error' => $e->getMessage()
            ]);
        }

        $transaction_data = (object)$transaction_data;
        $success = true;

        // Generate and send eVouchers if needed
        try {
            if ($order->shipping_method_id === 9) {
                Log::debug("Starting voucher generation for order", ['order_id' => $order->id]);

                // First generate vouchers
                $vouchersGenerated = $order->generateVouchers();

                if (!$vouchersGenerated) {
                    Log::error('Failed to generate vouchers', ['order_id' => $order->id]);
                } else {
                    Log::info('Vouchers generated successfully', ['order_id' => $order->id]);

                    // Queue email job instead of sending directly
                    try {
                        // Use job to send voucher email in the background
                        // Give more time for voucher generation to complete
                        \App\Jobs\SendVoucherEmail::dispatch($order->id)->delay(now()->addSeconds(30));
                        Log::info('Voucher email job queued successfully', ['order_id' => $order->id]);
                    } catch (Exception $e) {
                        Log::error('Exception queuing voucher email job', [
                            'order_id' => $order->id,
                            'error' => $e->getMessage()
                        ]);
                    }
                }
            } else {
                Log::debug('Skipping voucher generation - not an e-voucher order', [
                    'order_id' => $order->id,
                    'shipping_method_id' => $order->shipping_method_id
                ]);
            }
        } catch (Exception $e) {
            Log::error('Exception during voucher generation process', [
                'order_id' => $order->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }

        return view('user.order.order-placed', compact('order', 'transaction_data', 'success', 'payment_params'));
    }

    /**
     * Unsuccessful payment page
     */
    public function paymentFail(Request $request)
    {
        if (isset($request->oid)) {
            $order = Order::find($request->oid);
            $transaction_data = [
                'order_id' => $request->oid,
                'auth_code' => $request->AuthCode,
                'trans_id' => $request->TransId,
                'response' => $request->Response,
                'proc_return_code' => $request->ProcReturnCode,
                'md_status' => $request->mdStatus,
                'extra_trxdate' => Carbon::parse($request->EXTRA_TRXDATE)->format('Y-m-d H:i:s')
            ];
            $order->transaction_data = json_encode($transaction_data);
            //Set failed status
            $status = OrderStatus::find(4);
            $order->save();
            if (isset($status)) {
                $order->setStatus($status);
            }
            $transaction_data = (object)$transaction_data;
            $success = false;
            $payment_params = $order->getPaymentParams();
            return view('user.order.order-placed', compact('order', 'transaction_data', 'success', 'payment_params'));
        }
    }

    /**
     * Display the specified resource.
     *
     * @param Order $order
     * @return Response
     */
    public function show(Order $order)
    {
        return view('admin.order.show');
    }

    /**
     * Order success page
     */
    public function orderSuccess()
    {

        return view('user.order.order-placed');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Order $order
     * @return Response
     */
    public function update(Request $request, Order $order)
    {
        if (!empty($request->currency_id)) {
            $currency = Currency::find($request->currency_id);
            $order->currency()->associate($currency);
        }

        if (!empty($request->payment_method_id)) {
            $order->paymentMethod()->associate(PaymentMethod::find($request->payment_method_id));
        }

        if (!empty($request->shipping_method_id)) {
            $order->shippingMethod()->associate(ShippingMethod::find($request->shipping_method_id));
        }

        //Adds bundles to orders from array of bundle id's
        if (!empty($request->bundles)) {
            $order->bundles()->sync($request->bundles);
        }

        $order->update($request->all());

        $order->countPrice();

        if ((!empty($request->order_status_id)) && ($order->status->id != $request->order_status_id)) {
            $this->updateOrderStatus($request, $order->id);
        }

        return response()->json('success', 200);
    }

    public function updateOrderStatus(Request $request, $orderId = null)
    {
        $order = Order::find($orderId ?: $request->order_id);
        $status = OrderStatus::find($request->order_status_id);

        $message = $request->message;
        $order->setStatus($status, $message);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Order $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        if ($order->delete()) {
            return response('success', 200);
        }
    }

    /**
     * Handle voucher generation process (for testing)
     *
     * @param Order $order
     * @return bool
     */
    protected function handleVoucherGeneration(Order $order)
    {
        try {
            if ($order->shipping_method_id === 9) {
                Log::debug("Starting voucher generation for order", ['order_id' => $order->id]);

                // First generate vouchers
                $vouchersGenerated = $order->generateVouchers();

                if (!$vouchersGenerated) {
                    Log::error('Failed to generate vouchers', ['order_id' => $order->id]);
                    return false;
                } else {
                    Log::info('Vouchers generated successfully', ['order_id' => $order->id]);

                    // Now send email with vouchers
                    try {
                        $emailService = app(EmailService::class);
                        $emailSent = $emailService->sendVoucher($order->id);

                        if (!$emailSent) {
                            Log::error('Failed to send voucher email', ['order_id' => $order->id]);
                            return false;
                        } else {
                            Log::info('Voucher email sent successfully', ['order_id' => $order->id]);
                            return true;
                        }
                    } catch (Exception $e) {
                        Log::error('Exception sending voucher email', [
                            'order_id' => $order->id,
                            'error' => $e->getMessage()
                        ]);
                        return false;
                    }
                }
            }
            return false;
        } catch (Exception $e) {
            Log::error('Exception during voucher generation process', [
                'order_id' => $order->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return false;
        }
    }
}
