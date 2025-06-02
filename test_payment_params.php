<?php

require_once 'vendor/autoload.php';

// Bootstrap Laravel
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Order;
use Illuminate\Support\Facades\Log;

echo "=== PAYMENT PARAMETERS TEST ===" . PHP_EOL . PHP_EOL;

// Test in different environments
$environments = ['local', 'production'];

foreach ($environments as $env) {
    echo "Testing in {$env} environment:" . PHP_EOL;

    // Set the environment for testing
    app()->detectEnvironment(function() use ($env) {
        return $env;
    });

    // Create a test order
    $order = new Order();
    $order->id = 9999; // Test ID
    $order->total = 1000.00;

    // Generate payment parameters
    $params = $order->getPaymentParams();

    echo "- Merchant ID: " . $params->clientid . PHP_EOL;
    echo "- Order ID: " . $params->oid . PHP_EOL;
    echo "- Amount: " . $params->amount . PHP_EOL;
    echo "- Environment: " . app()->environment() . PHP_EOL;
    echo "- Hash generated: " . (strlen($params->hash) > 0 ? 'YES' : 'NO') . PHP_EOL;

    // Expected merchant ID based on environment
    $expectedMerchantId = ($env === 'production') ? '13IN001632' : env('NESTPAY_ID', '13IN003803');

    if ($params->clientid === $expectedMerchantId) {
        echo "✅ Correct merchant ID for {$env} environment" . PHP_EOL;
    } else {
        echo "❌ Wrong merchant ID for {$env} environment" . PHP_EOL;
        echo "  Expected: {$expectedMerchantId}, Got: {$params->clientid}" . PHP_EOL;
    }

    echo PHP_EOL;
}

echo "=== TEST COMPLETED ===" . PHP_EOL;
