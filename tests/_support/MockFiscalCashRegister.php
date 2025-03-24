<?php

namespace Tests\Support;

use App\Enums\InvoiceType;
use App\InvoiceItem;
use App\Order;
use App\Services\FiscalCashRegister as BaseFiscalCashRegister;

class MockFiscalCashRegister extends BaseFiscalCashRegister
{
    /**
     * Override sendInvoice method to use InvoiceType::TRAINING
     *
     * @param Order $order
     * @return bool
     */
    public function sendInvoice(Order $order)
    {
        // Create the invoice item with TRAINING type
        $invoiceItem = new InvoiceItem($order, InvoiceType::TRAINING);

        // Verify the invoice type is TRAINING
        if ($invoiceItem->invoiceType !== InvoiceType::TRAINING) {
            throw new \Exception('Invoice type is not set to TRAINING in test environment');
        }

        // Continue with mock implementation of sending invoice
        // Since this is a test, we just return success
        return true;
    }
}
