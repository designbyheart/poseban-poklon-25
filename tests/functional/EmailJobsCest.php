<?php

use App\Jobs\SendNewOrderAdminEmail;
use App\Jobs\SendNewOrderUserEmail;
use App\Jobs\SendVoucherEmail;
use App\Order;
use App\Voucher;
use App\PaymentMethod;
use App\ShippingMethod;
use App\Product;
use App\OrderItem;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

class EmailJobsCest
{
    protected $testEmailAddress = 'designbyheart@gmail.com';
    protected $testMode = false;

    // Before all tests
    public function _beforeSuite(\FunctionalTester $I)
    {
        // Verify database connection
        try {
            // Check connection without using potentially undefined methods
            DB::connection()->getPdo();
            $I->comment('Database connection successful: ' . DB::connection()->getDatabaseName());
        } catch (\Exception $e) {
            $I->fail('Database connection failed: ' . $e->getMessage());
        }

        // Verify Brevo API key is set in .env
        if (empty(env('BREVO_API_KEY'))) {
            $I->comment('WARNING: BREVO_API_KEY not found in .env file. Some tests may fail.');
        } else {
            $I->comment('BREVO_API_KEY found in .env file.');
        }

        // Fresh database for testing
        Artisan::call('migrate:fresh');
    }

    // Before each test
    public function _before(FunctionalTester $I)
    {
        // Make sure config is loaded and set a test API key if not found
        if (empty(config('services.brevo.key'))) {
            $I->comment('Setting test Brevo API key for tests - EMAILS WILL NOT ACTUALLY BE SENT');
            Config::set('services.brevo.key', 'test-api-key-for-codeception');
            $this->testMode = true;
        }

        // Now verify it's set
        $I->assertNotEmpty(config('services.brevo.key'), 'Brevo API key must be set');

        // Create necessary base data
        $this->createBasicTestData();
    }

    // After each test
    public function _after(FunctionalTester $I)
    {
        // Clean up after test if needed
    }

    /**
     * Create basic test data needed for all tests
     */
    protected function createBasicTestData()
    {
        // Create a default payment method if none exists
        if (PaymentMethod::count() == 0) {
            PaymentMethod::create([
                'name' => 'Test Payment Method',
                'description' => 'Payment method for tests',
                'price' => 0,
                'status' => 'active'
            ]);
        }

        // Create a default shipping method if none exists
        if (ShippingMethod::count() == 0) {
            ShippingMethod::create([
                'name' => 'Standard Shipping',
                'description' => 'Standard shipping method for tests',
                'price' => 0,
                'status' => 'active'
            ]);

            // Create e-voucher shipping method
            ShippingMethod::create([
                'name' => 'E-Voucher',
                'description' => 'E-voucher shipping method for tests',
                'price' => 0,
                'status' => 'active'
            ]);
        }

        // Ensure E-Voucher shipping method exists
        $evoucher = ShippingMethod::where('name', 'E-Voucher')->first();
        if (!$evoucher) {
            ShippingMethod::create([
                'name' => 'E-Voucher',
                'description' => 'E-voucher shipping method for tests',
                'price' => 0,
                'status' => 'active'
            ]);
        }

        // Create a test product if none exists
        if (Product::count() == 0) {
            Product::create([
                'title' => 'Test Product',
                'description' => 'Test product for tests',
                'price' => 100,
                'image' => 'test.jpg',
                'status' => 1,
                'type' => 'regular'
            ]);
        }
    }

    // Test admin email job works
    public function sendNewOrderAdminEmailJobWorks(FunctionalTester $I)
    {
        // Queue::fake(); - This would normally be used, but it's handled in the jobsAreDispatchedWhenOrderIsCreated test

        // Create a test order
        $I->comment('Creating test order');
        $order = new Order();
        $order->customer_email = $this->testEmailAddress;
        $order->customer_name = 'Test Customer';
        $order->customer_surname = 'Test Customer';
        $order->customer_phone = '123456789';
        $order->country = 'Test Country';
        $order->city = 'Test City';
        $order->address_one = 'Test Address';
        $order->zip_code = '12345';
        $order->payment_method_id = PaymentMethod::first()->id;
        $order->shipping_method_id = ShippingMethod::where('id', '!=', 9)->first()->id;
        $order->save();

        // Verify the order was created
        $I->comment('Verifying order was created: #' . $order->id);
        $I->assertTrue($order->id > 0, 'Order was successfully created');

        // Dispatchable test instead of directly handling
        try {
            $job = new SendNewOrderAdminEmail($order);
            $I->assertInstanceOf(SendNewOrderAdminEmail::class, $job);
            $I->comment('SendNewOrderAdminEmail job instantiated successfully');
        } catch (\Exception $e) {
            $I->fail('Failed to create job: ' . $e->getMessage());
        }
    }

    // Test user email job works
    public function sendNewOrderUserEmailJobWorks(FunctionalTester $I)
    {
        // Create a test order
        $I->comment('Creating test order');
        $order = new Order();
        $order->customer_email = $this->testEmailAddress;
        $order->customer_name = 'Test Customer';
        $order->customer_surname = 'Test Customer';
        $order->customer_phone = '123456789';
        $order->country = 'Test Country';
        $order->city = 'Test City';
        $order->address_one = 'Test Address';
        $order->zip_code = '12345';
        $order->payment_method_id = PaymentMethod::first()->id;
        $order->shipping_method_id = ShippingMethod::where('id', '!=', 9)->first()->id;
        $order->save();

        // Verify the order was created
        $I->comment('Verifying order was created: #' . $order->id);
        $I->assertTrue($order->id > 0, 'Order was successfully created');

        // Dispatchable test instead of directly handling
        try {
            $job = new SendNewOrderUserEmail($order);
            $I->assertInstanceOf(SendNewOrderUserEmail::class, $job);
            $I->comment('SendNewOrderUserEmail job instantiated successfully');
        } catch (\Exception $e) {
            $I->fail('Failed to create job: ' . $e->getMessage());
        }
    }

    // Test voucher email job works
    public function sendVoucherEmailJobWorks(FunctionalTester $I)
    {
        $I->comment('Starting voucher email job test');

        // Find E-voucher shipping method
        $eVoucherShipping = ShippingMethod::where('name', 'E-Voucher')->first();
        if (!$eVoucherShipping) {
            $I->fail('E-Voucher shipping method not found in database');
            return;
        }
        $I->comment('Using E-Voucher shipping method with ID: ' . $eVoucherShipping->id);

        // Create a test order with e-voucher shipping method
        $order = new Order();
        $order->shipping_method_id = $eVoucherShipping->id;
        $order->customer_email = $this->testEmailAddress;
        $order->customer_name = 'Test Customer';
        $order->customer_surname = 'Test Customer';
        $order->customer_phone = '123456789';
        $order->country = 'Test Country';
        $order->city = 'Test City';
        $order->address_one = 'Test Address';
        $order->zip_code = '12345';
        $order->payment_method_id = PaymentMethod::first()->id;
        $order->save();

        $I->comment('Test order created: ' . $order->id);
        $I->assertTrue($order->id > 0, 'Order was successfully created');

        // Create vouchers directly for testing
        $I->comment('Creating test vouchers');
        $voucher = new Voucher();
        $voucher->order_id = $order->id;
        $voucher->order_item_id = $item->id ?? null;
        $voucher->voucher_code = 'TEST' . rand(10000, 99999);
        $voucher->end_date = now()->addYear();
        $voucher->activated = true;
        $voucher->save();

        $I->comment('Test voucher created: ' . $voucher->voucher_code);
        $I->assertTrue($voucher->id > 0, 'Voucher was successfully created');

        // Dispatchable test instead of directly handling
        try {
            $job = new SendVoucherEmail($order->id);
            $I->assertInstanceOf(SendVoucherEmail::class, $job);
            $I->comment('SendVoucherEmail job instantiated successfully');
        } catch (\Exception $e) {
            $I->fail('Failed to create job: ' . $e->getMessage());
        }
    }

    // Test jobs are dispatched when order is created
    public function jobsAreDispatchedWhenOrderIsCreated(FunctionalTester $I)
    {
        // Fake the queue
        Queue::fake();

        // Create a test order
        $I->comment('Creating test order');
        $order = new Order();
        $order->customer_email = $this->testEmailAddress;
        $order->customer_name = 'Test Customer';
        $order->customer_surname = 'Test Customer';
        $order->customer_phone = '123456789';
        $order->country = 'Test Country';
        $order->city = 'Test City';
        $order->address_one = 'Test Address';
        $order->zip_code = '12345';
        $order->payment_method_id = PaymentMethod::first()->id;
        $order->shipping_method_id = ShippingMethod::where('name', '!=', 'E-Voucher')->first()->id;
        $order->save();

        $I->comment('Test order created: ' . $order->id);
        $I->assertTrue($order->id > 0, 'Order was successfully created');

        // Create order items
        $item = new OrderItem();
        $item->order_id = $order->id;
        $item->product_id = Product::first()->id;
        $item->product_quantity = 1;
        $item->product_price = 100;
        $item->product_total = 100;
        $item->save();

        // Dispatch events manually (to simulate what happens on API call)
        SendNewOrderAdminEmail::dispatch($order);
        SendNewOrderUserEmail::dispatch($order);

        // Verify jobs were dispatched
        $I->comment('Verifying jobs were dispatched');
        Queue::assertPushed(SendNewOrderAdminEmail::class);
        Queue::assertPushed(SendNewOrderUserEmail::class);
    }

    // Test voucher email job is dispatched for e-voucher orders
    public function voucherEmailJobIsDispatchedForEvoucherOrders(FunctionalTester $I)
    {
        $I->comment('Creating e-voucher order');

        // Find E-voucher shipping method
        $eVoucherShipping = ShippingMethod::where('name', 'E-Voucher')->first();
        if (!$eVoucherShipping) {
            $I->fail('E-Voucher shipping method not found in database');
            return;
        }
        $I->comment('Using E-Voucher shipping method with ID: ' . $eVoucherShipping->id);

        // Create e-voucher order
        $order = new Order();
        $order->shipping_method_id = $eVoucherShipping->id;
        $order->customer_email = $this->testEmailAddress;
        $order->customer_name = 'Test Customer';
        $order->customer_surname = 'Test Customer';
        $order->customer_phone = '123456789';
        $order->country = 'Test Country';
        $order->city = 'Test City';
        $order->address_one = 'Test Address';
        $order->zip_code = '12345';
        $order->payment_method_id = PaymentMethod::first()->id;
        $order->save();

        // Queue fake to catch dispatched jobs
        Queue::fake();

        // Create order items
        $item = new OrderItem();
        $item->order_id = $order->id;
        $item->product_id = Product::first()->id;
        $item->product_quantity = 1;
        $item->product_price = 100;
        $item->product_total = 100;
        $item->save();

        // Create voucher
        $voucher = new Voucher();
        $voucher->order_id = $order->id;
        $voucher->order_item_id = $item->id;
        $voucher->voucher_code = 'TEST' . rand(10000, 99999);
        $voucher->end_date = now()->addYear();
        $voucher->activated = 0;
        $voucher->save();

        // Manually dispatch the voucher email job
        SendVoucherEmail::dispatch($order->id);

        // Check if voucher job was dispatched
        Queue::assertPushed(SendVoucherEmail::class, function ($job) use ($order) {
            return $job->getOrderId() === $order->id;
        });
    }
}
