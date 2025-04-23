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
use App\Services\FiscalCashRegister;
use App\Setting;
use App\ShippingMethod;
use App\Utilities\VoucherUtility;
use App\Version;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
//        $orders = Order::where('user_id', $user->id)->get();
        $orders = $user->orders();

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
            Log::info('Attempting to send invoice to fiscal cash register', [
                'order_id' => $order->id
            ]);

            $cashRegister = new FiscalCashRegister();
            $result = $cashRegister->sendInvoice($order);

            Log::info('Invoice sent successfully to fiscal cash register', [
                'order_id' => $order->id,
                'result' => $result
            ]);
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

        if ((!empty($request->order_status_id)) && ($order->order_status_id != $request->order_status_id)) {
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
        $chunkSize = env('PDF_CHUNK_SIZE', 2);
        $memoryLimit = env('MEMORY_LIMIT', '512M');

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
        if ((int)$order->shipping_method_id !== 9) {
            return;
        }

        Log::debug("Starting voucher generation for order", [
            'order_id' => $order->id,
            'voucher_count' => $order->vouchers->count()
        ]);

        try {
            // First generate vouchers in database if they don't exist
            if (!$order->vouchers()->exists()) {
                $vouchersGenerated = $order->generateVouchers();
                if (!$vouchersGenerated) {
                    Log::error('Failed to generate vouchers', ['order_id' => $order->id]);
                    return;
                }
                Log::info('Vouchers generated successfully in database', ['order_id' => $order->id]);
            }

            // Process vouchers in chunks to manage memory
            $order->vouchers()->chunk(2, function ($vouchers) {
                foreach ($vouchers as $voucher) {
                    $this->processSingleVoucher($voucher);
                    // Clear memory after each voucher
                    gc_collect_cycles();
                }
            });

            // Verify all PDFs exist before sending email
            $missingPdfs = $order->vouchers()->get()->filter(function ($voucher) {
                return !file_exists(storage_path("app/vouchers/{$voucher->voucher_code}.pdf"));
            });

            if ($missingPdfs->isEmpty()) {
                SendVoucherEmail::dispatch($order->id);
                Log::info('Voucher email dispatched', ['order_id' => $order->id]);
            } else {
                Log::error('Not dispatching email - missing PDFs', [
                    'order_id' => $order->id,
                    'missing_vouchers' => $missingPdfs->pluck('voucher_code')
                ]);
            }

        } catch (Exception $e) {
            Log::error('Error processing vouchers', [
                'order_id' => $order->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }
    }

    /**
     * Process a single voucher PDF generation
     */
    protected function processSingleVoucher($voucher): bool
    {
        $pdfPath = storage_path("app/vouchers/{$voucher->voucher_code}.pdf");

        if (file_exists($pdfPath)) {
            return true;
        }

        try {
            // Ensure directory exists
            if (!file_exists(storage_path('app/vouchers'))) {
                mkdir(storage_path('app/vouchers'), 0755, true);
            }

            // Set higher memory limit for this specific operation
            $originalMemoryLimit = ini_get('memory_limit');
            ini_set('memory_limit', '512M');

            // Generate and save PDF
            $pdf = VoucherUtility::generateVoucherPDF($voucher);

            if ($pdf) {
                $pdf->save($pdfPath);

                // Clear PDF object from memory
                unset($pdf);

                Log::info('Generated PDF for voucher', [
                    'voucher_id' => $voucher->id,
                    'voucher_code' => $voucher->voucher_code,
                    'path' => $pdfPath
                ]);

                // Restore original memory limit
                ini_set('memory_limit', $originalMemoryLimit);

                return true;
            }

            return false;

        } catch (Exception $e) {
            Log::error('Exception generating PDF for voucher', [
                'voucher_id' => $voucher->id,
                'error' => $e->getMessage()
            ]);
            return false;
        } finally {
            // Ensure memory limit is restored even if an error occurs
            if (isset($originalMemoryLimit)) {
                ini_set('memory_limit', $originalMemoryLimit);
            }

            // Force garbage collection
            gc_collect_cycles();
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
                            'order_status_id' => 2
                        ];
                    }
                }

                return [
                    'success' => false,
                    'message' => 'Order is not paid',
                    'order_status_id' => $order->order_status_id
                ];
            }

            return [
                'success' => true,
                'message' => 'Order is paid',
                'order_status_id' => $order->order_status_id
            ];

        } catch (Exception $e) {
            Log::error('Error validating order status', [
                'order_id' => $order->id,
                'error' => $e->getMessage()
            ]);

            return [
                'success' => false,
                'message' => 'Error validating order status: ' . $e->getMessage(),
                'order_status_id' => $order->order_status_id
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

            // Verify this is an e-voucher order
            if ((int)$order->shipping_method_id !== 9) {
                return response()->json([
                    'success' => false,
                    'message' => 'Not an e-voucher order'
                ], 400);
            }

            // Generate vouchers if they don't exist
            $existingVouchers = $order->vouchers()->count();
            if ($existingVouchers === 0) {
                $vouchersGenerated = $order->generateVouchers();
                if (!$vouchersGenerated) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to generate vouchers'
                    ], 500);
                }
                $order->refresh();
            }

            // Generate/regenerate PDFs for all vouchers
            foreach ($order->vouchers as $voucher) {
                $pdfPath = storage_path("app/vouchers/{$voucher->voucher_code}.pdf");

                try {
                    // Ensure directory exists
                    if (!file_exists(storage_path('app/vouchers'))) {
                        mkdir(storage_path('app/vouchers'), 0755, true);
                    }

                    // Generate and save PDF (overwrite if exists)
                    $pdf = VoucherUtility::generateVoucherPDF($voucher);
                    if ($pdf) {
                        $pdf->save($pdfPath);
                        Log::info('Generated/Updated PDF for voucher', [
                            'voucher_id' => $voucher->id,
                            'voucher_code' => $voucher->voucher_code,
                            'path' => $pdfPath
                        ]);
                    }
                } catch (Exception $e) {
                    Log::error('Exception generating PDF for voucher', [
                        'voucher_id' => $voucher->id,
                        'error' => $e->getMessage()
                    ]);
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to generate PDF: ' . $e->getMessage()
                    ], 500);
                }
            }

            // Verify all PDFs exist
            $allPDFsExist = $order->vouchers->every(function ($voucher) {
                return file_exists(storage_path("app/vouchers/{$voucher->voucher_code}.pdf"));
            });

            if (!$allPDFsExist) {
                if (!$this->regenerateMissingPDFs($order)) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to generate some missing PDFs'
                    ], 500);
                }
            }

            // Force send email regardless of previous sends
//            if (app()->environment('local')) {
            // Execute directly in local environment
            $job = new SendVoucherEmail($order->id);
            $job->handle();
            Log::info('Voucher email sent directly (local environment)', ['order_id' => $order->id]);
//            } else {
//                // Queue in production
//                SendVoucherEmail::dispatch($order->id);
//                Log::info('Voucher email queued (production environment)', ['order_id' => $order->id]);
//            }

            return response()->json([
                'success' => true,
                'message' => app()->environment('local') ? 'Vouchers processed and email sent directly' : 'Vouchers processed and email queued',
                'order_id' => $order->id,
                'voucher_count' => $order->vouchers->count(),
                'customer_email' => $order->customer_email
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

    /**
     * Regenerate missing PDFs for an order's vouchers
     *
     * @param Order $order
     * @return bool True if all PDFs exist after regeneration, false otherwise
     */
    protected function regenerateMissingPDFs(Order $order): bool
    {
        foreach ($order->vouchers as $voucher) {
            $pdfPath = storage_path("app/vouchers/{$voucher->voucher_code}.pdf");
            if (!file_exists($pdfPath)) {
                $pdf = VoucherUtility::generateVoucherPDF($voucher);
                if ($pdf) {
                    $pdf->save($pdfPath);
                    Log::info('Regenerated missing PDF for voucher', [
                        'voucher_id' => $voucher->id,
                        'voucher_code' => $voucher->voucher_code
                    ]);
                }
            }
        }

        // Check if all PDFs exist after regeneration
        return $order->vouchers->every(function ($voucher) {
            return file_exists(storage_path("app/vouchers/{$voucher->voucher_code}.pdf"));
        });
    }
}
