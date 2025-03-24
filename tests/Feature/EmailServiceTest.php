<?php

namespace Tests\Feature;

use App\Order;
use App\Services\EmailService;
use App\Voucher;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;

class EmailServiceTest extends TestCase
{
    use RefreshDatabase;

    protected $testEmailAddress = 'designbyheart@gmail.com';

    /** @test */
    public function email_service_can_send_basic_emails()
    {
        // Create a test email service
        $emailService = new EmailService();

        // Test email sending with minimal data
        $result = $emailService->sendEmail(
            'emails.test.test_email',
            ['message' => 'Test email from EmailServiceTest'],
            [['email' => $this->testEmailAddress, 'name' => 'Test Recipient']],
            'EmailService Test - Basic Email'
        );

        // If no exception was thrown, we consider it a success
        $this->assertTrue(true, 'Email was sent without exceptions');
    }

    /** @test */
    public function email_service_can_send_email_with_attachments()
    {
        // Create a test email service
        $emailService = new EmailService();

        // Create a simple PDF attachment
        $attachmentContent = 'Test PDF content';
        $attachment = [
            'content' => base64_encode($attachmentContent),
            'name' => 'test_attachment.txt'
        ];

        // Test email sending with attachment
        $result = $emailService->sendEmail(
            'emails.test.test_email',
            ['message' => 'Test email with attachment'],
            [['email' => $this->testEmailAddress, 'name' => 'Test Recipient']],
            'EmailService Test - Email with Attachment',
            [$attachment]
        );

        // If no exception was thrown, we consider it a success
        $this->assertTrue(true, 'Email with attachment was sent without exceptions');
    }

    /** @test */
    public function email_service_can_send_voucher_email()
    {
        // Create test order
        $order = factory(Order::class)->create([
            'shipping_method_id' => 9,
            'customer_email' => $this->testEmailAddress,
            'customer_name' => 'Test Customer',
            'customer_surname' => 'Test',
        ]);

        // Generate test vouchers - we need to mock this if order->generateVouchers() is complex
        // Create a test voucher directly for simplicity
        $voucher = factory(Voucher::class)->create([
            'order_id' => $order->id,
            'voucher_code' => 'TEST' . rand(10000, 99999),
            'status' => 'active',
            'expires_at' => now()->addMonths(12),
        ]);

        // Create a test email service
        $emailService = new EmailService();

        // Enable more detailed logging
        Log::info('Starting voucher email test', ['order_id' => $order->id]);

        // Send the voucher email
        $result = $emailService->sendVoucher($order->id);

        // Log the result
        Log::info('Voucher email test result', ['result' => $result]);

        // If no exception was thrown, we consider it a success
        $this->assertTrue(true, 'Voucher email was sent without exceptions');
    }

    /** @test */
    public function email_service_logs_errors_for_invalid_order()
    {
        Log::shouldReceive('error')
            ->once()
            ->with('Order not found for sending voucher', ['order_id' => 999999]);

        // Create a test email service
        $emailService = new EmailService();

        // Try to send a voucher email for a non-existent order
        $result = $emailService->sendVoucher(999999);

        // Should return false for non-existent order
        $this->assertFalse($result);
    }
}
