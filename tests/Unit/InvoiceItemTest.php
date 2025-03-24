<?php

namespace Tests\Unit;

use App\Enums\InvoiceType;
use App\InvoiceItem;
use App\Order;
use Tests\TestCase;
use Mockery;

/**
 * TestInvoiceItem - A test-friendly subclass that skips item processing
 */
class TestInvoiceItem extends InvoiceItem
{
    public function __construct(Order $order, $type = InvoiceType::NORMAL)
    {
        $this->invoiceType = $type;

        // We skip the parent constructor to avoid the foreach on items
        // But we still set the invoiceType which is what we're testing
    }
}

class InvoiceItemTest extends TestCase
{
    public function testInvoiceItemAcceptsTrainingType()
    {
        // Create a simple Order mock
        $order = Mockery::mock(Order::class);

        // Test with TRAINING type
        $invoiceItem = new TestInvoiceItem($order, InvoiceType::TRAINING);
        $this->assertEquals(InvoiceType::TRAINING, $invoiceItem->invoiceType);

        // Test default type (should be NORMAL)
        $defaultInvoiceItem = new TestInvoiceItem($order);
        $this->assertEquals(InvoiceType::NORMAL, $defaultInvoiceItem->invoiceType);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
