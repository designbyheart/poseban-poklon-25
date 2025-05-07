<?php

namespace Tests\Functional;

use App\Order;
use App\Invoice;
use App\Services\FiscalCashRegister;
use App\Enums\InvoiceType;
use Mockery;
use Tests\Support\FunctionalTester;
use Illuminate\Support\Facades\Log;

class FiscalReceiptGenerationCest
{
    public function _before()
    {
        // Setup runs before each test
    }

    /**
     * Test fiscal receipt generation with valid order ID
     */
    public function testGenerateFiscalReceiptWithOrderId(FunctionalTester $I)
    {
        // Arrange
        $orderId = null; //2012; // Replace with a valid test order ID
        $order = Order::findOrFail($orderId);

        // Act
        $fiscalRegister = new FiscalCashRegister();
        $result = $fiscalRegister->sendInvoice($order);

        // Assert
        $I->assertTrue($result, 'Fiscal receipt should be generated successfully');

        // Verify invoice was created in database
        $invoice = Invoice::where('order_id', $orderId)->latest()->first();
        $I->assertNotNull($invoice, 'Invoice should be created in database');
        $I->assertEquals($order->id, $invoice->order_id);
    }

    /**
     * Test fiscal receipt generation fails with invalid URL
     */
    public function testFiscalReceiptFailsWithInvalidUrl(FunctionalTester $I)
    {
        // Arrange
        $orderId = null; //2012; // Replace with a valid test order ID
        $order = Order::findOrFail($orderId);

        // Clear the FISCAL_URL env variable temporarily
        $originalUrl = env('FISCAL_URL');
        putenv('FISCAL_URL=');

        // Act
        $fiscalRegister = new FiscalCashRegister();
        $result = $fiscalRegister->sendInvoice($order);

        // Assert
        $I->assertFalse($result, 'Fiscal receipt generation should fail with invalid URL');

        // Restore the original URL
        putenv("FISCAL_URL={$originalUrl}");
    }

    /**
     * Test fiscal receipt is not generated with InvoiceType::TRAINING
     */
    public function testFiscalReceiptNotGeneratedForTrainingType(FunctionalTester $I)
    {
        // Arrange
        $orderId = null; //2012; // Replace with a valid test order ID
        $order = Order::findOrFail($orderId);

        // Create a mock FiscalCashRegister using Mockery
        $mockFiscalRegister = Mockery::mock(FiscalCashRegister::class);
        $mockFiscalRegister->shouldReceive('sendInvoice')
            ->never()
            ->with($order);

        // Bind the mock to the container
        $I->getApplication()->instance(FiscalCashRegister::class, $mockFiscalRegister);

        // Act & Assert
        $invoiceItem = new \App\InvoiceItem($order);
        $I->assertNotEquals(
            InvoiceType::TRAINING,
            $invoiceItem->invoiceType,
            'Invoice type should not be TRAINING in production'
        );

        // Clean up
        Mockery::close();
    }

    /**
     * Test proper error logging when fiscal service fails
     */
    public function testErrorLoggingOnFiscalServiceFailure(FunctionalTester $I)
    {
        // Arrange
        $orderId = null;//2012; // Replace with a valid test order ID
        $order = Order::findOrFail($orderId);

        // Mock Log facade
        $mock = Mockery::mock('alias:' . Log::class);
        $mock->shouldReceive('error')
            ->withAnyArgs()
            ->andReturn(null);

        // Force an error by setting invalid auth token
        $originalToken = env('FISCAL_AUTH_TOKEN');
        putenv('FISCAL_AUTH_TOKEN=invalid_token');

        // Act
        $fiscalRegister = new FiscalCashRegister();
        $result = $fiscalRegister->sendInvoice($order);

        // Assert
        $mock->shouldHaveReceived('error')
            ->with('error with fiscal invoice:', Mockery::any());

        // Restore valid auth token
        putenv("FISCAL_AUTH_TOKEN={$originalToken}");

        // Clean up
        Mockery::close();
    }

    public function _after(FunctionalTester $I)
    {
        // Clean up after each test
        Mockery::close();
    }
}
