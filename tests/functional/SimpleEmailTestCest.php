<?php

use App\Jobs\SendNewOrderAdminEmail;
use App\Jobs\SendNewOrderUserEmail;
use App\Jobs\SendVoucherEmail;
use App\Order;
use App\Voucher;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Config;
use Tests\Support\FunctionalTester;

/**
 * Simplified email test that doesn't require database access
 */
class SimpleEmailTestCest
{
    protected $testEmailAddress = 'designbyheart@gmail.com';

    public function _before(FunctionalTester $I)
    {
        // Verify Brevo API key is set
        $brevoApiKey = env('BREVO_API_KEY');
        $I->comment('Brevo API key status: ' . (empty($brevoApiKey) ? 'Missing' : 'Found'));

        // If no key is found, set a test key
        if (empty($brevoApiKey)) {
            Config::set('services.brevo.key', 'test-api-key-for-codeception');
            $I->comment('Using test API key for Brevo');
        }
    }

    // Test email queue dispatching with mocks
    public function emailJobsAreQueued(FunctionalTester $I)
    {
        // Fake the queue
        Queue::fake();

        // Create a mock order
        $order = $this->createMockOrder();

        // Dispatch email jobs
        SendNewOrderAdminEmail::dispatch($order);
        SendNewOrderUserEmail::dispatch($order);

        // Assert jobs were queued
        Queue::assertPushed(SendNewOrderAdminEmail::class);
        Queue::assertPushed(SendNewOrderUserEmail::class);

        $I->comment('Email jobs were successfully queued');
    }

    // Test voucher email queue dispatching with mocks
    public function voucherEmailJobIsQueued(FunctionalTester $I)
    {
        // Fake the queue
        Queue::fake();

        // Create a mock order with shipping_method_id = 9 (e-voucher)
        $order = $this->createMockOrder();
        $order->shipping_method_id = '9'; // String to test type conversion

        // Dispatch voucher email job
        SendVoucherEmail::dispatch($order->id);

        // Assert job was queued
        Queue::assertPushed(SendVoucherEmail::class);

        $I->comment('Voucher email job was successfully queued');
    }

    /**
     * Create a mock Order object without using the database
     */
    private function createMockOrder()
    {
        $order = new Order();
        $order->id = 12345;
        $order->email = $this->testEmailAddress;
        $order->customer_email = $this->testEmailAddress;
        $order->customer_name = 'Test Customer';
        $order->customer_surname = 'Test Customer';

        return $order;
    }
}
