<?php

namespace App\Http\Controllers;

use App\Bundle;
use App\Currency;
use App\GiftCard;
use App\Jobs\SendNewOrderAdminEmail;
use App\Jobs\SendNewOrderUserEmail;
use App\Jobs\SendVoucherEmail;
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

        $this->middleware('check_role:admin,editor', ['except' => ['publicIndexData', 'ordersHistory', 'calculate', 'store', 'orderSuccess', 'paymentSuccess', 'paymentFail', 'handleVoucherGeneration', 'testVoucherGeneration']]);
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

            //Send order confirmation email to user immediately
            SendNewOrderUserEmail::dispatch($order);

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

            // Dispatch voucher email if this is an e-voucher order
            if ($order->shipping_method_id === 9) { // E-voucher shipping method
                SendVoucherEmail::dispatch($order->id);
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

        // Send order confirmation email immediately
        \App\Jobs\SendNewOrderUserEmail::dispatch($order);
        Log::info('Order confirmation email dispatched', ['order_id' => $order->id]);

        // Generate and send eVouchers if needed
        try {
            $this->processVouchers($order);
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
        if (!isset($request->oid)) {
            Log::error('Payment fail called without order ID', [
                'request_data' => $request->all()
            ]);
            return redirect()->route('home')->with('error', 'Invalid payment information');
        }

        $order = Order::find($request->oid);
        if (!$order) {
            Log::error('Payment fail: Order not found', ['order_id' => $request->oid]);
            return redirect()->route('home')->with('error', 'Order not found');
        }

        Log::warning('Payment failed for order', [
            'order_id' => $order->id,
            'payment_method' => $order->paymentMethod->name ?? 'Unknown',
            'amount' => $order->total
        ]);

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
            //Set failed status
            $status = OrderStatus::find(4);

            if (!$status) {
                Log::error('Failed status (4) not found in order_statuses table');
                throw new Exception('Failed status not found');
            }

            $order->save();
            $order->setStatus($status);

            DB::commit();

            Log::info('Order status updated to Failed after payment failure', [
                'order_id' => $order->id,
                'order_status_id' => $status->id
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Failed to update order status after payment failure', [
                'order_id' => $order->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }

        $transaction_data = (object)$transaction_data;
        $success = false;
        $payment_params = $order->getPaymentParams();

        return view('user.order.order-placed', compact('order', 'transaction_data', 'success', 'payment_params'));
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
     * Handle voucher generation and sending
     */
    public function handleVoucherGeneration(Order $order)
    {
        try {
            if ((int)$order->shipping_method_id !== 9) {
                return [
                    'success' => false,
                    'message' => 'Not an e-voucher order'
                ];
            }

            // Check paid status using order_status_id directly, cast both to integers
            if ((int)$order->order_status_id !== 2) {
                    Log::warning('Order is not in paid status', [
                        'order_id' => $order->id,
                    'order_status_id' => $order->order_status_id,
                    ]);
                    return [
                        'success' => false,
                        'message' => 'Order must be in paid status'
                    ];
                }

                // Check existing vouchers
                $existingVouchers = $order->vouchers()->count();
            Log::info('Processing paid order', [
                    'order_id' => $order->id,
                'existing_vouchers' => $existingVouchers
                ]);

            // Generate vouchers if needed
                if ($existingVouchers === 0) {
                $vouchersGenerated = $order->generateVouchers();

                if (!$vouchersGenerated) {
                    Log::error('Failed to generate vouchers', ['order_id' => $order->id]);
                    return [
                        'success' => false,
                        'message' => 'Failed to generate vouchers'
                    ];
                }

                    Log::info('Vouchers generated successfully', ['order_id' => $order->id]);
                }

            // Send email with vouchers
                    try {
                if (app()->environment('local')) {
                    // Execute directly in local environment
                    $job = new \App\Jobs\SendVoucherEmail($order->id);
                    $job->handle();
                    Log::info('Voucher email sent directly (local environment)', ['order_id' => $order->id]);
                } else {
                    // Queue in production
                    SendVoucherEmail::dispatch($order->id);
                    Log::info('Voucher email queued (production environment)', ['order_id' => $order->id]);
                }

                    return [
                        'success' => true,
                    'message' => app()->environment('local') ? 'Vouchers processed and email sent directly' : 'Vouchers processed and email queued',
                        'existing_vouchers' => $existingVouchers,
                        'new_vouchers' => $order->vouchers()->count() - $existingVouchers
                    ];
                    } catch (Exception $e) {
                        Log::error('Exception sending voucher email', [
                            'order_id' => $order->id,
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                        ]);
                    return [
                        'success' => false,
                        'message' => 'Failed to send voucher email: ' . $e->getMessage()
                    ];
                    }
        } catch (Exception $e) {
            Log::error('Exception during voucher generation process', [
                'order_id' => $order->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return [
                'success' => false,
                'message' => 'Error processing vouchers: ' . $e->getMessage()
            ];
        }
    }

    protected function processVouchers(Order $order): void
    {
        if ((int)$order->shipping_method_id === 9) {
            Log::debug("Starting voucher generation for order", ['order_id' => $order->id]);

            // First check if vouchers exist in database
            $vouchersExist = $order->vouchers()->exists();

            if (!$vouchersExist) {
                // Generate vouchers in database if they don't exist
            $vouchersGenerated = $order->generateVouchers();
            if (!$vouchersGenerated) {
                Log::error('Failed to generate vouchers', ['order_id' => $order->id]);
                    return;
                }
                Log::info('Vouchers generated successfully in database', ['order_id' => $order->id]);
            }

            // Now handle PDF generation for each voucher
            $order->vouchers->each(function ($voucher) {
                $pdfPath = storage_path("app/vouchers/{$voucher->voucher_code}.pdf");

                // Check if PDF already exists
                if (!file_exists($pdfPath)) {
                    try {
                        // Ensure directory exists
                        if (!file_exists(storage_path('app/vouchers'))) {
                            mkdir(storage_path('app/vouchers'), 0755, true);
                        }

                        // Generate and save PDF
                        $pdf = VoucherUtility::generateVoucherPDF($voucher);
                        if ($pdf) {
                            $pdf->save($pdfPath);
                            Log::info('Generated PDF for voucher', [
                                'voucher_code' => $voucher->voucher_code,
                                'path' => $pdfPath
                            ]);
            } else {
                            Log::error('Failed to generate PDF for voucher', [
                                'voucher_code' => $voucher->voucher_code
                            ]);
                        }
                    } catch (Exception $e) {
                        Log::error('Exception generating PDF for voucher', [
                            'voucher_code' => $voucher->voucher_code,
                            'error' => $e->getMessage()
                        ]);
                    }
                } else {
                    Log::info('PDF already exists for voucher', [
                        'voucher_code' => $voucher->voucher_code,
                        'path' => $pdfPath
                    ]);
                }
            });

            // Send voucher email
                \App\Jobs\SendVoucherEmail::dispatch($order->id);
            Log::info('Voucher email dispatched', ['order_id' => $order->id]);
        } else {
            Log::debug('Skipping voucher generation - not an e-voucher order', [
                'order_id' => $order->id,
                'shipping_method_id' => $order->shipping_method_id
            ]);
        }
    }

    protected function ensureOrderStatus(Order $order)
    {
        if (!$order->status) {
            Log::warning('Order has no status, attempting to fix', [
                'order_id' => $order->id
            ]);

            try {
                // Get the default status (assuming ID 1 is the default/initial status)
                $defaultStatus = OrderStatus::find(1);

                if (!$defaultStatus) {
                    Log::error('Default order status not found in database');
                    throw new Exception('Default order status not found');
                }

                // Set the status
                $order->status()->associate($defaultStatus);
                $order->save();

                // Reload the status relationship
                $order->load('status');

                Log::info('Successfully set default status for order', [
                    'order_id' => $order->id,
                    'order_status_id' => $defaultStatus->id
                ]);

                return true;
            } catch (Exception $e) {
                Log::error('Failed to set default status for order', [
                    'order_id' => $order->id,
                    'error' => $e->getMessage()
                ]);
                return false;
            }
        }
        return true;
    }

    protected function validateOrderStatus(Order $order)
    {
        try {
            Log::info('Validating order status', [
                'order_id' => $order->id,
                'current_status' => $order->order_status_id,
                'has_transaction' => !empty($order->transaction_data)
            ]);

            // Primary check: Is order paid (order_status_id = 2)?
            if (!$order->order_status_id || $order->order_status_id !== 2) {
                // Secondary check: If status is not paid but transaction is successful,
                // we should update the status to paid
                if (!empty($order->transaction_data)) {
                    $transData = json_decode($order->transaction_data);
                    if (isset($transData->response) &&
                        strtolower($transData->response) === 'approved' &&
                        $transData->proc_return_code === '00') {

                        // Update to paid status
                        $order->order_status_id = 2;
                        $order->save();

                        Log::info('Updated order to paid status based on transaction data', [
                            'order_id' => $order->id
                        ]);

                        return [
                            'success' => true,
                            'message' => 'Order updated to paid status',
                            'status_id' => 2
                        ];
                    }
                }

                return [
                    'success' => false,
                    'message' => 'Order is not paid',
                    'status_id' => $order->order_status_id
                ];
            }

            return [
                'success' => true,
                'message' => 'Order is paid',
                'status_id' => $order->order_status_id
            ];

        } catch (Exception $e) {
            Log::error('Error validating order status', [
                'order_id' => $order->id,
                'error' => $e->getMessage()
            ]);

            return [
                'success' => false,
                'message' => 'Error validating order status: ' . $e->getMessage(),
                'status_id' => $order->order_status_id
            ];
        }
    }

    public function testVoucherGeneration($orderId)
    {
        try {
            // Load order with necessary relationships
            $order = Order::with(['items', 'vouchers', 'status'])->find($orderId);

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found'
            ], 404);
        }

            // Now proceed with voucher generation
            $result = $this->handleVoucherGeneration($order);

            // Get status name safely
            $statusName = null;
            if ($order->status) {
                $statusName = $order->status->title;
            } else {
                // Try to get status name directly
                $status = OrderStatus::find($order->order_status_id);
                $statusName = $status ? $status->title : null;
            }

            return response()->json([
                'success' => $result['success'],
                'message' => $result['message'],
                'data' => [
                    'order_id' => $order->id,
                    'customer_email' => $order->customer_email,
                    'shipping_method_id' => $order->shipping_method_id,
                    'order_status_id' => $order->order_status_id,
                    'status_name' => $statusName,
                    'vouchers_count' => $order->vouchers()->count(),
                    'is_evoucher' => (int)$order->shipping_method_id === 9,
                    'existing_vouchers' => $result['existing_vouchers'] ?? 0,
                    'new_vouchers' => $result['new_vouchers'] ?? 0
                ]
            ]);

        } catch (Exception $e) {
            Log::error('Error in testVoucherGeneration', [
                'order_id' => $orderId,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error during voucher processing',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
