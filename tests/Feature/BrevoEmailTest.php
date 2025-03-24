<?php

namespace Tests\Feature;

use App\Jobs\SendNewOrderAdminEmail;
use App\Jobs\SendNewOrderUserEmail;
use App\Jobs\SendVoucherEmail;
use App\Order;
use App\Services\EmailService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Queue;
use Tests\TestCase;

class BrevoEmailTest extends TestCase
{
    use RefreshDatabase;

    protected $testEmailAddress = 'designbyheart@gmail.com';

    public function setUp(): void
    {
        parent::setUp();

        // Make sure the BREVO_API_KEY is set in the .env file for testing
        $this->assertNotEmpty(config('services.brevo.key'), 'Brevo API key is not set in .env');
    }

    /** @test */
    public function it_can_send_direct_email_via_brevo()
    {
        // Create a test email service
        $emailService = app(EmailService::class);

        // Test direct email sending
        $result = $emailService->sendEmail(
            'emails.test.test_email', // Create this template view
            ['message' => 'This is a test email'],
            [['email' => $this->testEmailAddress]],
            'Test Email from Brevo Integration Test'
        );

        // Check if the response is successful
        $this->assertNotFalse($result);
    }

    /** @test */
    public function it_can_send_new_order_admin_email()
    {
        // Create a mock order
        $order = factory(Order::class)->create([
            'customer_email' => $this->testEmailAddress,
            'customer_name' => 'Test Customer',
            'customer_surname' => 'Test',
        ]);

        // Dispatch the job directly (not queued for testing)
        $job = new SendNewOrderAdminEmail($order);
        $job->handle();

        // Since we don't have a direct way to validate email delivery,
        // we'll consider no exceptions as success
        $this->assertTrue(true, 'SendNewOrderAdminEmail job completed without exceptions');
    }

    /** @test */
    public function it_can_send_new_order_user_email()
    {
        // Create a mock order
        $order = factory(Order::class)->create([
            'email' => $this->testEmailAddress,
            'customer_name' => 'Test Customer',
            'customer_surname' => 'Test',
        ]);

        // Dispatch the job directly
        $job = new SendNewOrderUserEmail($order);
        $job->handle();

        $this->assertTrue(true, 'SendNewOrderUserEmail job completed without exceptions');
    }

    /** @test */
    public function it_can_send_voucher_email()
    {
        // Create a mock order with shipping_method_id = 9 (e-voucher)
        $order = factory(Order::class)->create([
            'shipping_method_id' => 9,
            'email' => $this->testEmailAddress,
            'customer_email' => $this->testEmailAddress,
            'customer_name' => 'Test Customer',
            'customer_surname' => 'Test',
        ]);

        // We need to set up vouchers for this order first
        $vouchersGenerated = $order->generateVouchers();
        $this->assertTrue($vouchersGenerated, 'Vouchers should be generated successfully');

        // Dispatch the voucher email job
        $job = new SendVoucherEmail($order->id);
        $job->handle();

        $this->assertTrue(true, 'SendVoucherEmail job completed without exceptions');
    }

    /** @test */
    public function it_dispatches_correct_email_jobs_for_new_order()
    {
        // Set up queue fake
        Queue::fake();

        // Create test request data - this should match what would be sent from the frontend
        $orderData = [
            'customer_name' => 'Test Customer',
            'customer_surname' => 'Test',
            'email' => $this->testEmailAddress,
            'customer_email' => $this->testEmailAddress,
            'payment_method_id' => 1, // Adjust based on your available payment methods
            'shipping_method_id' => 1, // Regular shipping
            'order_items' => [
                [
                    'product_id' => 1, // Adjust based on your available products
                    'product_quantity' => 1,
                    'versions' => []
                ]
            ]
        ];

        // Create the order using the controller or service directly
        $response = $this->postJson('/api/orders', $orderData);

        // Check if the order was created successfully
        $response->assertStatus(200);

        // Assert the expected jobs were dispatched
        Queue::assertPushed(SendNewOrderAdminEmail::class);
        Queue::assertPushed(SendNewOrderUserEmail::class);
    }

    /** @test */
    public function it_dispatches_voucher_email_for_evoucher_orders()
    {
        // Set up queue fake
        Queue::fake();

        // Create test request data with shipping_method_id = 9 (e-voucher)
        $orderData = [
            'customer_name' => 'Test Customer',
            'customer_surname' => 'Test',
            'email' => $this->testEmailAddress,
            'customer_email' => $this->testEmailAddress,
            'payment_method_id' => 3, // Card payment (since this is likely immediate payment)
            'shipping_method_id' => 9, // E-voucher
            'order_items' => [
                [
                    'product_id' => 1, // Adjust based on your available products
                    'product_quantity' => 1,
                    'versions' => []
                ]
            ]
        ];

        // Create the order
        $response = $this->postJson('/api/orders', $orderData);

        // Check if the order was created successfully
        $response->assertStatus(200);

        // Simulate payment success to trigger voucher generation
        $orderId = json_decode($response->getContent())->id ?? Order::latest()->first()->id;

        $this->get(route('payment.success', ['oid' => $orderId]));

        // Assert the expected jobs were dispatched
        Queue::assertPushed(SendVoucherEmail::class);
    }
}
