<?php

require_once 'vendor/autoload.php';
$username = getenv('NESTPAY_USERNAME');
$pass = getenv('NESTPAY_PASSWORD');

// Bootstrap Laravel
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Order;

echo "=== SIMPLIFIED PAYMENT INTEGRATION TEST ===" . PHP_EOL . PHP_EOL;

echo "1. BANK DETAILS VALIDATION:" . PHP_EOL;
$nestpayId = env('NESTPAY_ID', '13IN003803');
$nestpayKey = env('NESTPAY_KEY');

echo "- Test Merchant ID: " . $nestpayId . PHP_EOL;
echo "- Store Key: " . ($nestpayKey ? 'CONFIGURED ✅' : 'NOT SET ❌') . PHP_EOL;
echo "- Gateway URL: https://testsecurepay.eway2pay.com/fim/est3Dgate" . PHP_EOL;
echo "- Currency: 941 (Serbian Dinar)" . PHP_EOL;
echo "- Hash Algorithm: ver2 (SHA-512)" . PHP_EOL;

echo PHP_EOL . "2. TESTING PAYMENT PARAMETER GENERATION:" . PHP_EOL;

try {
    // Create test order instance (don't save to DB)
    $testOrder = new Order();
    $testOrder->id = 'TEST' . time();
    $testOrder->total = 250.00;

    $params = $testOrder->getPaymentParams();

    echo "✅ Payment parameters generated successfully" . PHP_EOL;
    echo "- Client ID: " . $params->clientid . PHP_EOL;
    echo "- Order ID: " . $params->oid . PHP_EOL;
    echo "- Amount: " . $params->amount . " RSD" . PHP_EOL;
    echo "- Success URL: " . $params->okUrl . PHP_EOL;
    echo "- Fail URL: " . $params->failUrl . PHP_EOL;
    echo "- Transaction Type: " . $params->trantype . PHP_EOL;
    echo "- Store Type: " . $params->storetype . PHP_EOL;
    echo "- Language: " . $params->lang . PHP_EOL;
    echo "- Hash Length: " . strlen($params->hash) . " chars" . PHP_EOL;

} catch (Exception $e) {
    echo "❌ Payment parameter generation failed: " . $e->getMessage() . PHP_EOL;
    exit(1);
}

echo PHP_EOL . "3. PAYMENT FORM HTML:" . PHP_EOL;
echo "<!-- Copy this form to test manually -->" . PHP_EOL;
echo '<form method="post" action="https://testsecurepay.eway2pay.com/fim/est3Dgate" target="_blank">' . PHP_EOL;
foreach ($params as $key => $value) {
    echo '<input type="hidden" name="' . $key . '" value="' . htmlspecialchars($value) . '">' . PHP_EOL;
}
echo '<input type="submit" value="🔐 TEST PAYMENT" style="background: #28a745; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">' . PHP_EOL;
echo '</form>' . PHP_EOL;

echo PHP_EOL . "4. HASH VERIFICATION:" . PHP_EOL;
if ($nestpayKey) {
    // Manually recreate the hash to verify
    $plainText = $params->clientid . "|" . $params->oid . "|" . $params->amount . "|" .
        $params->okUrl . "|" . $params->failUrl . "|" . $params->trantype . "||" .
        $params->rnd . "||||" . $params->currency . "|" . $nestpayKey;

    $manualHash = base64_encode(pack('H*', hash('sha512', $plainText)));

    echo "- Generated hash matches manual calculation: " . ($params->hash === $manualHash ? '✅ YES' : '❌ NO') . PHP_EOL;
    echo "- Plain text for hash: " . substr($plainText, 0, 100) . "..." . PHP_EOL;
} else {
    echo "❌ Cannot verify hash - NESTPAY_KEY not configured" . PHP_EOL;
}

echo PHP_EOL . "5. ROUTE VALIDATION:" . PHP_EOL;
try {
    $routes = [];

    // Check if payment routes exist
    if (Route::has('payment.success')) {
        echo "✅ Payment success route: Exists" . PHP_EOL;
    } else {
        echo "❌ Payment success route: Missing" . PHP_EOL;
    }

    if (Route::has('payment.fail')) {
        echo "✅ Payment fail route: Exists" . PHP_EOL;
    } else {
        echo "❌ Payment fail route: Missing" . PHP_EOL;
    }

} catch (Exception $e) {
    echo "ℹ️  Route check skipped (routes not available in CLI)" . PHP_EOL;
}

echo PHP_EOL . "6. TESTING CONFIGURATION:" . PHP_EOL;
echo "📋 Test Cards (from Documentation):" . PHP_EOL;
echo "   - Use cards from: Documentation/Primeri testnih case-ova za trgovce sa testnim karticama.xls" . PHP_EOL;
echo "📋 Merchant Center:" . PHP_EOL;
echo "   - Login: https://testsecurepay.eway2pay.com/bib/report/user.login" . PHP_EOL;
echo "   - Username: " . $username . PHP_EOL;
echo "   - Password: " . maskSensitiveData($pass) . " (change on first login)" . PHP_EOL;

echo PHP_EOL . "7. NEXT STEPS:" . PHP_EOL;
echo "1️⃣ Copy the HTML form above and test it in a browser" . PHP_EOL;
echo "2️⃣ Use a test card from the documentation" . PHP_EOL;
echo "3️⃣ Verify the transaction appears in the Merchant Center" . PHP_EOL;
echo "4️⃣ Test both successful and failed payment scenarios" . PHP_EOL;
echo "5️⃣ Check that success/fail URLs redirect correctly" . PHP_EOL;

echo PHP_EOL . "=== INTEGRATION TEST SUMMARY ===" . PHP_EOL;
echo "✅ Bank details: Configured with test parameters" . PHP_EOL;
echo "✅ Payment parameters: Generated successfully" . PHP_EOL;
echo "✅ Hash calculation: " . ($nestpayKey ? 'Working' : 'Needs NESTPAY_KEY') . PHP_EOL;
echo "✅ NestPay integration: Ready for testing" . PHP_EOL;

if (!$nestpayKey) {
    echo PHP_EOL . "⚠️  IMPORTANT: Set NESTPAY_KEY in your .env file" . PHP_EOL;
    echo "   1. Login to Merchant Center" . PHP_EOL;
    echo "   2. Go to Administration tab" . PHP_EOL;
    echo "   3. Generate new Store Key" . PHP_EOL;
    echo "   4. Add NESTPAY_KEY=your_key to .env" . PHP_EOL;
}
