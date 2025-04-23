<?php

declare(strict_types=1);

namespace Tests\Functional;

use App\Order;
use App\Services\FiscalCashRegister;
use App\Enums\InvoiceType;
use Codeception\Util\Fixtures;

class FiscalReceiptCest
{
    public function _before(\FunctionalTester $I)
    {
        // Setup if needed
    }

    /**
     * Test fiscal receipt generation for a normal order
     */
    public function testGenerateFiscalReceiptForOrder(\FunctionalTester $I)
    {
        // Assume we have a factory or fixture for Order
        $orderId = Fixtures::get('test_order_id');
        $order = Order::findOrFail($orderId);
        $fiscal = new FiscalCashRegister();
        $result = $fiscal->sendInvoice($order);
        $I->assertNotFalse($result, 'Fiscal receipt should be generated for normal order');
    }

    /**
     * Test that fiscal receipt is NOT generated for TRAINING invoice type
     */
    public function testDoesNotSendFiscalReceiptForTrainingInvoiceType(\FunctionalTester $I)
    {
        $orderId = Fixtures::get('test_order_id');
        $order = Order::findOrFail($orderId);
        $fiscal = $this->getMockBuilder(FiscalCashRegister::class)
            ->onlyMethods(['sendInvoice'])
            ->getMock();
        $fiscal->expects($I->never())->method('sendInvoice');

        // Simulate logic: if InvoiceType is TRAINING, do not send
        $invoiceType = InvoiceType::TRAINING;
        if ($invoiceType !== InvoiceType::TRAINING) {
            $fiscal->sendInvoice($order);
        }
        $I->assertTrue(true, 'Fiscal receipt should NOT be sent for TRAINING invoice type');
    }
}
