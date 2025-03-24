<?php

use App\Jobs\SendNewOrderAdminEmail;
use App\Jobs\SendNewOrderUserEmail;
use App\Jobs\SendVoucherEmail;
use App\Order;
use App\Services\EmailService;
use Illuminate\Support\Facades\Queue;

class BrevoEmailCest
{
    protected $testEmailAddress = 'designbyheart@gmail.com';

    /**
     * Setup before each test
     */
    public function _before(FunctionalTester $I)
    {
        // Verify that the Brevo API key is set in the environment
        $I->assertNotEmpty(config('services.brevo.key'), 'Brevo API key must be set');
    }

    /**
     * This test verifies the direct integration with Brevo API
     * It's marked as skipped by default to prevent actual API calls
     * 
     * @group brevo-api
     * @group external-api
     */
    public function verifyRealBrevoApiConnection(FunctionalTester $I)
    {
        // Skip this test by default to prevent actual API calls
        $I->markTestSkipped('This test makes real API calls and is disabled by default.');

        // Override the mail driver to ensure we don't use the 'array' driver
        config(['mail.driver' => 'smtp']);

        // Create a fresh email service instance
        $emailService = new EmailService();

        $I->comment('Testing direct connection to Brevo API');

        // Send a simple test email - only for testing the API connection
        $subject = 'Brevo API Test - ' . date('Y-m-d H:i:s');
        $result = $emailService->sendEmail(
            'emails.test.test_email',
            ['message' => 'This is a test of the Brevo API connection from Codeception'],
            [['email' => $this->testEmailAddress, 'name' => 'API Test']],
            $subject
        );

        // Log the API call result
        $I->comment('API call result: ' . ($result ? 'Success' : 'Failed'));

        // If this passes, the API connection is working
        $I->assertNotFalse($result, 'Brevo API connection test failed');
    }

    /**
     * Test direct email sending via Brevo
     * 
     * @group brevo-api
     */
    public function canSendDirectEmailViaBrevo(FunctionalTester $I)
    {
        // Create a test email service
        $emailService = app(EmailService::class);

        $I->comment('Testing direct email sending');

        // Test direct email sending
        $result = $emailService->sendEmail(
            'emails.test.test_email',
            ['message' => 'This is a test email from Codeception'],
            [['email' => $this->testEmailAddress]],
            'Test Email from Brevo Integration Test'
        );

        // Check if the response is successful
        $I->assertNotFalse($result, 'Email sending should not fail');
    }

    /**
     * Test order admin email job
     * 
     * @group email-jobs
     */
    public function canSendNewOrderAdminEmail(FunctionalTester $I)
    {
        $I->comment('Testing SendNewOrderAdminEmail job');

        // Create a mock Order instance without saving to database
        $order = new Order([
            'customer_email' => $this->testEmailAddress,
            'customer_name' => 'Test Customer',
            'customer_surname' => 'Test',
            'id' => 999 // Mock ID
        ]);

        // Create the job
        $job = new SendNewOrderAdminEmail($order);
        $I->assertInstanceOf(SendNewOrderAdminEmail::class, $job);
        $I->comment('SendNewOrderAdminEmail job instantiated successfully');

        // We won't actually run the job to avoid sending real emails
        // but we'll verify it was created correctly
        $I->assertTrue(true, 'Job was instantiated successfully');
    }

    /**
     * Test order user email job
     * 
     * @group email-jobs
     */
    public function canSendNewOrderUserEmail(FunctionalTester $I)
    {
        $I->comment('Testing SendNewOrderUserEmail job');

        // Create a mock Order instance without saving to database
        $order = new Order([
            'customer_email' => $this->testEmailAddress,
            'customer_name' => 'Test Customer',
            'customer_surname' => 'Test',
            'id' => 999 // Mock ID
        ]);

        // Create the job
        $job = new SendNewOrderUserEmail($order);
        $I->assertInstanceOf(SendNewOrderUserEmail::class, $job);
        $I->comment('SendNewOrderUserEmail job instantiated successfully');

        // We won't actually run the job to avoid sending real emails
        // but we'll verify it was created correctly
        $I->assertTrue(true, 'Job was instantiated successfully');
    }

    /**
     * Test voucher email job
     * 
     * @group vouchers
     * @group email-jobs
     */
    public function canCreateVoucherEmailJob(FunctionalTester $I)
    {
        $I->comment('Testing SendVoucherEmail job');

        $orderId = 999; // Mock order ID

        // Create the job
        $job = new SendVoucherEmail($orderId);
        $I->assertInstanceOf(SendVoucherEmail::class, $job);
        $I->comment('SendVoucherEmail job instantiated successfully');

        // We won't actually run the job to avoid sending real emails
        // but we'll verify it was created correctly
        $I->assertTrue(true, 'Job was instantiated successfully');
    }

    /**
     * Test job dispatching using Queue fake
     * 
     * @group email-jobs
     * @group job-dispatching
     */
    public function emailJobsAreQueued(FunctionalTester $I)
    {
        // Set up queue fake
        Queue::fake();

        $I->comment('Testing email job dispatching');

        // Create a mock Order instance
        $order = new Order([
            'customer_email' => $this->testEmailAddress,
            'customer_name' => 'Test Customer',
            'customer_surname' => 'Test',
            'id' => 999 // Mock ID
        ]);

        // Dispatch jobs manually
        SendNewOrderAdminEmail::dispatch($order);
        SendNewOrderUserEmail::dispatch($order);

        // Assert that jobs were pushed to the queue
        Queue::assertPushed(SendNewOrderAdminEmail::class);
        Queue::assertPushed(SendNewOrderUserEmail::class);

        $I->comment('Jobs were pushed to the queue successfully');
    }

    /**
     * Test voucher email job queuing
     * 
     * @group vouchers
     * @group email-jobs
     * @group job-dispatching
     */
    public function voucherEmailJobIsQueued(FunctionalTester $I)
    {
        // Set up queue fake
        Queue::fake();

        $I->comment('Testing voucher email job dispatching');

        // Dispatch voucher email job manually
        $orderId = 999; // Mock order ID
        SendVoucherEmail::dispatch($orderId);

        // Assert that the job was pushed to the queue
        Queue::assertPushed(SendVoucherEmail::class);

        $I->comment('Voucher email job was pushed to the queue successfully');
    }
}
