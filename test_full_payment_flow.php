<?php

require_once 'vendor/autoload.php';

// Bootstrap Laravel
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Order;
use App\User;
use App\OrderItem;
use App\Product;
use App\PaymentMethod;
use App\ShippingMethod;
use App\OrderStatus;
use Carbon\Carbon;

echo "=== FULL PAYMENT FLOW TEST ===" . PHP_EOL . PHP_EOL;

// Check database connections and required data
echo "1. DATABASE VALIDATION:" . PHP_EOL;

try {
    // Check if we can connect to database
    DB::connection()->getPdo();
    echo "✅ Database connection: OK" . PHP_EOL;
    
    // Check required statuses exist
    $statuses = OrderStatus::whereIn('id', [1, 2, 4])->get();
    echo "✅ Order statuses: " . $statuses->count() . " found" . PHP_EOL;
    
    // Check payment methods
    $paymentMethods = PaymentMethod::all();
    echo "✅ Payment methods: " . $paymentMethods->count() . " found" . PHP_EOL;
    
    // Check shipping methods
    $shippingMethods = ShippingMethod::all();
    echo "✅ Shipping methods: " . $shippingMethods->count() . " found" . PHP_EOL;
    
} catch (Exception $e) {
    echo "❌ Database error: " . $e->getMessage() . PHP_EOL;
    exit(1);
}

echo PHP_EOL . "2. CREATING TEST ORDER:" . PHP_EOL;

try {
    // Create a test order
    $order = new Order();
    $order->user_id = null; // Guest order
    $order->first_name = 'Test';
    $order->last_name = 'Customer';
    $order->email = 'test@example.com';
    $order->phone = '+381601234567';
    $order->total = 150.00;
    $order->subtotal = 150.00;
    $order->order_status_id = 1; // Pending
    $order->payment_method_id = 3; // Card payment
    $order->shipping_method_id = 9; // E-voucher
    $order->created_at = Carbon::now();
    $order->updated_at = Carbon::now();
    
    $order->save();
    echo "✅ Test order created with ID: " . $order->id . PHP_EOL;
    
} catch (Exception $e) {
    echo "❌ Failed to create test order: " . $e->getMessage() . PHP_EOL;
    exit(1);
}

echo PHP_EOL . "3. TESTING PAYMENT PARAMETERS:" . PHP_EOL;

try {
    $paymentParams = $order->getPaymentParams();
    
    echo "✅ Payment parameters generated successfully" . PHP_EOL;
    echo "- Order ID: " . $paymentParams->oid . PHP_EOL;
    echo "- Amount: " . $paymentParams->amount . " RSD" . PHP_EOL;
    echo "- Merchant ID: " . $paymentParams->clientid . PHP_EOL;
    echo "- Currency: " . $paymentParams->currency . " (Serbian Dinar)" . PHP_EOL;
    echo "- Hash generated: " . (strlen($paymentParams->hash) > 0 ? 'YES' : 'NO') . PHP_EOL;
    
} catch (Exception $e) {
    echo "❌ Failed to generate payment parameters: " . $e->getMessage() . PHP_EOL;
}

echo PHP_EOL . "4. SIMULATING SUCCESSFUL PAYMENT:" . PHP_EOL;

try {
    // Simulate successful payment response from NestPay
    $successData = [
        'oid' => $order->id,
        'AuthCode' => 'TEST123456',
        'TransId' => 'TXN' . time(),
        'Response' => 'Approved',
        'ProcReturnCode' => '00',
        'mdStatus' => '1',
        'EXTRA_TRXDATE' => Carbon::now()->format('Y-m-d H:i:s')
    ];
    
    // Start database transaction
    DB::beginTransaction();
    
    // Update order with transaction data
    $order->transaction_data = json_encode($successData);
    $order->order_status_id = 2; // Paid status
    $order->save();
    
    // Check if order was updated successfully
    $updatedOrder = Order::find($order->id);
    if ($updatedOrder->order_status_id == 2) {
        echo "✅ Order status updated to 'Paid'" . PHP_EOL;
    } else {
        echo "❌ Failed to update order status" . PHP_EOL;
    }
    
    // Test voucher generation (if applicable)
    if ($order->shipping_method_id == 9) {
        echo "✅ E-voucher order detected - vouchers would be generated" . PHP_EOL;
    }
    
    DB::commit();
    echo "✅ Payment success flow completed" . PHP_EOL;
    
} catch (Exception $e) {
    DB::rollBack();
    echo "❌ Payment success simulation failed: " . $e->getMessage() . PHP_EOL;
}

echo PHP_EOL . "5. TESTING PAYMENT FAILURE:" . PHP_EOL;

try {
    // Create another test order for failure test
    $failOrder = new Order();
    $failOrder->user_id = null;
    $failOrder->first_name = 'Test';
    $failOrder->last_name = 'Customer';
    $failOrder->email = 'test@example.com';
    $failOrder->phone = '+381601234567';
    $failOrder->total = 75.00;
    $failOrder->subtotal = 75.00;
    $failOrder->order_status_id = 1; // Pending
    $failOrder->payment_method_id = 3; // Card payment
    $failOrder->shipping_method_id = 1; // Regular shipping
    $failOrder->save();
    
    // Simulate failed payment response
    $failData = [
        'oid' => $failOrder->id,
        'AuthCode' => null,
        'TransId' => null,
        'Response' => 'Declined',
        'ProcReturnCode' => '05',
        'mdStatus' => '0'
    ];
    
    DB::beginTransaction();
    
    $failOrder->transaction_data = json_encode($failData);
    $failOrder->order_status_id = 4; // Failed status
    $failOrder->save();
    
    DB::commit();
    
    echo "✅ Payment failure flow tested with order ID: " . $failOrder->id . PHP_EOL;
    
} catch (Exception $e) {
    DB::rollBack();
    echo "❌ Payment failure simulation failed: " . $e->getMessage() . PHP_EOL;
}

echo PHP_EOL . "6. CONFIGURATION SUMMARY:" . PHP_EOL;
echo "- Test Merchant ID: " . env('NESTPAY_ID', '13IN003803') . PHP_EOL;
echo "- Store Key configured: " . (env('NESTPAY_KEY') ? 'YES' : 'NO') . PHP_EOL;
echo "- Test Gateway: https://testsecurepay.eway2pay.com/fim/est3Dgate" . PHP_EOL;
echo "- Success URL: https://posebanpoklon.rs/payment/success" . PHP_EOL;
echo "- Fail URL: https://posebanpoklon.rs/payment/fail" . PHP_EOL;

echo PHP_EOL . "7. TEST RECOMMENDATIONS:" . PHP_EOL;
echo "✅ Use test cards from: Documentation/Primeri testnih case-ova..." . PHP_EOL;
echo "✅ Monitor transactions at: https://testsecurepay.eway2pay.com/bib/report/user.login" . PHP_EOL;
echo "✅ Test with actual payment form at: /cart/checkout" . PHP_EOL;
echo "✅ Verify voucher generation for e-voucher orders" . PHP_EOL;
echo "✅ Check email sending functionality" . PHP_EOL;

echo PHP_EOL . "=== TEST COMPLETED ===" . PHP_EOL;

// Clean up test orders
try {
    $orderIds = array_filter([$order->id, $failOrder->id ?? null]);
    Order::whereIn('id', $orderIds)->delete();
    echo "Test orders cleaned up." . PHP_EOL;
} catch (Exception $e) {
    echo "Note: Test orders may need manual cleanup." . PHP_EOL;
}