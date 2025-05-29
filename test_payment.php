<?php

require_once 'vendor/autoload.php';

// Bootstrap Laravel
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

// Create a test order
$order = new App\Order();
$order->id = 'TEST' . time();
$order->total = 100.00;

// Get payment parameters
$params = $order->getPaymentParams();

echo "=== PAYMENT INTEGRATION TEST ===" . PHP_EOL;
echo "Test Bank Details Configuration:" . PHP_EOL;
echo "- Merchant ID: " . env('NESTPAY_ID', '13IN003803') . PHP_EOL;
echo "- Store Key: " . (env('NESTPAY_KEY') ? 'SET' : 'NOT SET') . PHP_EOL;
echo "- Gateway URL: https://testsecurepay.eway2pay.com/fim/est3Dgate" . PHP_EOL;
echo PHP_EOL;

echo "Generated Payment Parameters:" . PHP_EOL;
foreach ($params as $key => $value) {
    echo "- {$key}: {$value}" . PHP_EOL;
}

echo PHP_EOL;
echo "=== TEST FORM HTML ===" . PHP_EOL;
echo '<form method="post" action="https://testsecurepay.eway2pay.com/fim/est3Dgate">' . PHP_EOL;
foreach ($params as $key => $value) {
    echo '<input type="hidden" name="' . $key . '" value="' . htmlspecialchars($value) . '">' . PHP_EOL;
}
echo '<input type="submit" value="Test Payment">' . PHP_EOL;
echo '</form>' . PHP_EOL;

echo PHP_EOL;
echo "=== CONFIGURATION VALIDATION ===" . PHP_EOL;

// Check environment configuration
if (!env('NESTPAY_ID')) {
    echo "❌ NESTPAY_ID not set in .env file" . PHP_EOL;
} else {
    echo "✅ NESTPAY_ID configured: " . env('NESTPAY_ID') . PHP_EOL;
}

if (!env('NESTPAY_KEY')) {
    echo "❌ NESTPAY_KEY not set in .env file" . PHP_EOL;
} else {
    echo "✅ NESTPAY_KEY configured" . PHP_EOL;
}

// Validate required parameters
$required_params = ['clientid', 'amount', 'oid', 'okUrl', 'failUrl', 'currency', 'hash'];
foreach ($required_params as $param) {
    if (isset($params->$param) && !empty($params->$param)) {
        echo "✅ Required parameter '{$param}': OK" . PHP_EOL;
    } else {
        echo "❌ Required parameter '{$param}': MISSING" . PHP_EOL;
    }
}

echo PHP_EOL;
echo "=== NEXT STEPS ===" . PHP_EOL;
echo "1. Ensure NESTPAY_KEY is set in .env file" . PHP_EOL;
echo "2. Use test cards from Documentation/Primeri testnih case-ova..." . PHP_EOL;
echo "3. Test payment flow on: https://testsecurepay.eway2pay.com/fim/est3Dgate" . PHP_EOL;
echo "4. Monitor transaction in Merchant Center: https://testsecurepay.eway2pay.com/bib/report/user.login" . PHP_EOL;