# OrderController Payment Success Test

This test ensures that the `paymentSuccess` method in `OrderController` works correctly and uses `InvoiceType::TRAINING` when creating an `InvoiceItem` during testing.

## What's being tested

1. The `paymentSuccess` method in `OrderController` handles payment success callbacks correctly
2. The `InvoiceItem` uses `InvoiceType::TRAINING` during testing instead of `InvoiceType::NORMAL`
3. The fiscal cash register integration works as expected
4. Proper transaction handling and error logging

## How to run the test

Run the following command from your project root:

```bash
vendor/bin/codecept run functional OrderControllerCest
```

## Test Implementation Details

The test uses a mock implementation of `FiscalCashRegister` that explicitly creates `InvoiceItem` with `InvoiceType::TRAINING` and verifies this value is set correctly.

In the production environment, `InvoiceItem` will continue to use `InvoiceType::NORMAL` as the default. 