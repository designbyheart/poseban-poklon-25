# Functional Tests

This directory contains functional tests for the application. These tests focus on testing the functionality of the application, including controllers, services, and models.

## Running Tests

You can run all the functional tests with the following command:

```bash
php vendor/bin/codecept run functional
```

To run a specific test:

```bash
php vendor/bin/codecept run functional VoucherGenerationCest
```

## Available Tests

### OrderControllerCest

Tests for the Order Controller functionality.

### VoucherGenerationCest

Tests for voucher generation process. These tests verify that:

1. Vouchers are properly generated when an order with e-voucher shipping method is completed
2. PDFs are correctly generated for each voucher
3. Email is sent with the voucher PDFs attached

The tests use mocking to isolate components and avoid database interactions, making them faster and more reliable. They are organized into four key test cases:

1. **testVoucherGeneration** - Tests basic voucher generation functionality
2. **testEmailWithVouchers** - Tests that email service is properly called with vouchers
3. **testVoucherIntegration** - Tests the complete flow from order to voucher to PDF
4. **testPdfGeneration** - Tests PDF generation specifically

These tests ensure that the voucher generation process works as expected, even after code changes.

## Running Voucher Tests

To run just the voucher tests:

```bash
php vendor/bin/codecept run functional VoucherGenerationCest
```

This will verify the entire voucher generation flow without requiring database access or actual PDF generation.

## Test Implementation Details

The tests use Mockery to create test doubles for the Order, Voucher, and related classes. This allows testing the logic without hitting the database or external services.

For example, when testing the `handleVoucherGeneration` method of the OrderController, we mock:
- The Order model 
- The EmailService
- The VoucherUtility
- PDF generation

This approach ensures tests remain fast and stable.

## Adding New Tests

To add a new test, create a new file with the following naming pattern:

```
{FeatureName}Cest.php
```

Inside the file, create a class with the same name as the file. Each method in the class that starts with 'test' will be run as a separate test.

Example:

```php
<?php

class ExampleCest
{
    public function testSomething(FunctionalTester $I)
    {
        // Test code here
    }
}
```

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