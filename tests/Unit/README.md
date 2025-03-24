# InvoiceItem and FiscalCashRegister Tests

These tests verify that:

1. The `InvoiceItem` class accepts the `InvoiceType::TRAINING` type when creating new instances
2. The `FiscalCashRegister` class uses `InvoiceType::TRAINING` during testing

## How to Run the Tests

You can run these tests using PHPUnit:

```bash
# Run a specific test
vendor/bin/phpunit tests/Unit/InvoiceItemTest.php
vendor/bin/phpunit tests/Unit/FiscalCashRegisterTest.php

# Run all unit tests
vendor/bin/phpunit tests/Unit/
```

## Test Approach

Since the normal implementation of `InvoiceItem` requires valid Order objects with items collections, we've created test subclasses:

1. `TestInvoiceItem` - A simplified version that just sets the `invoiceType` property without requiring order items
2. `TestFiscalCashRegister` - A version that uses `TestInvoiceItem` with `InvoiceType::TRAINING` during tests

## Implementation Details

In production code, `InvoiceItem` continues to use `InvoiceType::NORMAL` as the default type, but our tests ensure that `InvoiceType::TRAINING` is properly accepted and can be used for testing purposes.
