<?php

namespace App\Console\Commands;

use App\Jobs\SendNewOrderAdminEmail;
use App\Jobs\SendNewOrderUserEmail;
use App\Jobs\SendVoucherEmail;
use App\Order;
use App\Services\EmailService;
use App\Voucher;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class TestEmailSending extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test-email {type=all : Type of email to test (all, admin, user, voucher, direct)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test email sending functionality with real emails';

    protected $testEmail = 'designbyheart@gmail.com';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $type = $this->argument('type');

        $this->info("Testing email sending: {$type}");

        // Check Brevo API key
        if (empty(config('services.brevo.key'))) {
            $this->error('Brevo API key is not set in config/services.php');
            return 1;
        }

        try {
            switch ($type) {
                case 'all':
                    $this->testDirectEmail();
                    $this->testAdminEmail();
                    $this->testUserEmail();
                    $this->testVoucherEmail();
                    break;

                case 'admin':
                    $this->testAdminEmail();
                    break;

                case 'user':
                    $this->testUserEmail();
                    break;

                case 'voucher':
                    $this->testVoucherEmail();
                    break;

                case 'direct':
                    $this->testDirectEmail();
                    break;

                default:
                    $this->error("Unknown test type: {$type}");
                    return 1;
            }

            $this->info('Email tests completed successfully');
            return 0;
        } catch (\Exception $e) {
            $this->error("Error testing emails: " . $e->getMessage());
            $this->line($e->getTraceAsString());
            return 1;
        }
    }

    /**
     * Test direct email sending via the EmailService
     */
    private function testDirectEmail()
    {
        $this->info('Testing direct email sending...');
        $emailService = new EmailService();

        $result = $emailService->sendEmail(
            'emails.test.test_email',
            ['message' => 'Test email sent from TestEmailSending command'],
            [['email' => $this->testEmail, 'name' => 'Test Recipient']],
            'Test Email from Command Line'
        );

        $this->info('Direct email sent');
    }

    /**
     * Test admin notification email
     */
    private function testAdminEmail()
    {
        $this->info('Testing admin notification email...');

        // Create or use existing order
        $order = $this->getTestOrder();

        // Create and dispatch job directly
        $job = new SendNewOrderAdminEmail($order);
        $job->handle();

        $this->info('Admin email sent');
    }

    /**
     * Test user notification email
     */
    private function testUserEmail()
    {
        $this->info('Testing user notification email...');

        // Create or use existing order
        $order = $this->getTestOrder();

        // Override email for testing
        $order->email = $this->testEmail;
        $order->save();

        // Create and dispatch job directly
        $job = new SendNewOrderUserEmail($order);
        $job->handle();

        $this->info('User email sent');
    }

    /**
     * Test voucher email
     */
    private function testVoucherEmail()
    {
        $this->info('Testing voucher email...');

        // Create a test order specifically for e-vouchers
        $order = $this->getTestOrder();
        $order->shipping_method_id = 9;
        $order->customer_email = $this->testEmail;
        $order->save();

        // Generate vouchers if needed
        if (Voucher::where('order_id', $order->id)->count() == 0) {
            $this->info('Generating vouchers for order...');
            $result = $order->generateVouchers();
            if (!$result) {
                throw new \Exception("Failed to generate vouchers for order {$order->id}");
            }
        }

        // Create and dispatch job directly
        $job = new SendVoucherEmail($order->id);
        $job->handle();

        $this->info('Voucher email sent');
    }

    /**
     * Get or create a test order
     */
    private function getTestOrder()
    {
        // Try to find an existing test order
        $order = Order::where('customer_email', $this->testEmail)
            ->orWhere('email', $this->testEmail)
            ->first();

        if (!$order) {
            $this->info('Creating new test order...');

            // Create a minimal test order
            $order = new Order();
            $order->customer_name = 'Test';
            $order->customer_surname = 'Customer';
            $order->customer_email = $this->testEmail;
            $order->email = $this->testEmail;
            $order->phone = '123456789';
            $order->country = 'Test Country';
            $order->city = 'Test City';
            $order->address = 'Test Address';
            $order->postal_code = '12345';
            $order->shipping_method_id = 1;
            $order->payment_method_id = 1;
            $order->save();

            // Add a test item
            $product = \App\Product::first();
            if ($product) {
                $orderItem = new \App\OrderItem();
                $orderItem->product_id = $product->id;
                $orderItem->order_id = $order->id;
                $orderItem->product_quantity = 1;
                $orderItem->product_price = $product->price;
                $orderItem->product_total = $product->price;
                $orderItem->save();
            }

            $order->countPrice();
        } else {
            $this->info("Using existing test order #{$order->id}");
        }

        return $order;
    }
}
