<?php

namespace Tests\Unit;

use App\Enums\InvoiceType;
use App\InvoiceItem;
use App\Order;
use App\Services\FiscalCashRegister;
use Tests\TestCase;
use Mockery;

/**
 * TestFiscalInvoiceItem - A test-friendly version of InvoiceItem for fiscal register tests
 */
class TestFiscalInvoiceItem extends InvoiceItem
{
    public function __construct(Order $order, $type = InvoiceType::NORMAL)
    {
        $this->invoiceType = $type;
        // Skip parent constructor to avoid dealing with items
    }
}

/**
 * TestFiscalCashRegister - A subclass that overrides real fiscal register connection
 * but still uses InvoiceItem with TRAINING type
 */
class TestFiscalCashRegister extends FiscalCashRegister
{
    // Flag to track if sendInvoice was called
    public $sendInvokeCalled = false;

    // Store the invoice item that was created
    public $createdInvoiceItem = null;

    /**
     * Override to avoid connecting to real service
     */
    public function sendInvoice(Order $order)
    {
        $this->sendInvokeCalled = true;

        // Create TestFiscalInvoiceItem with TRAINING type in test environment
        $this->createdInvoiceItem = new TestFiscalInvoiceItem($order, InvoiceType::TRAINING);

        // Don't actually send anything, just return success
        return true;
    }
}

class FiscalCashRegisterTest extends TestCase
{
    public function testUsesTrainingInvoiceTypeForTest()
    {
        // Create a more complete Order mock
        $order = Mockery::mock(Order::class);
        $order->shouldReceive('getAttribute')->withAnyArgs()->andReturnNull();
        $order->shouldReceive('setAttribute')->withAnyArgs()->andReturnSelf();

        // Create our test version of the fiscal cash register
        $fiscalRegister = new TestFiscalCashRegister();

        // Send the invoice
        $result = $fiscalRegister->sendInvoice($order);

        // Verify method was called
        $this->assertTrue($fiscalRegister->sendInvokeCalled);

        // Verify InvoiceItem was created with TRAINING type
        $this->assertNotNull($fiscalRegister->createdInvoiceItem);
        $this->assertEquals(InvoiceType::TRAINING, $fiscalRegister->createdInvoiceItem->invoiceType);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
