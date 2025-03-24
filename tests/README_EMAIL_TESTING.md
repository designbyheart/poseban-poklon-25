# Email Testing in the Application

This document explains how to test the email functionality in the application.

## Testing Strategy

We have implemented different approaches to email testing:

1. **PHPUnit Tests**: Tests for the EmailService and general Brevo integration
2. **Codeception Tests**: Functional tests for email job handling
3. **Command Line Testing**: Direct testing of email sending through Artisan commands

## Prerequisites

Before running any email tests, make sure:

1. Your `.env` file has the Brevo API key: `BREVO_API_KEY=your-api-key`
2. Verify the email templates exist:
   - `resources/views/emails/test/test_email.blade.php`
   - `resources/views/emails/order/new-order-admin.blade.php`
   - `resources/views/emails/order/new-order-user.blade.php`
   - `resources/views/emails/voucher/customer_email.blade.php`

> **Note:** For Codeception tests, if a Brevo API key is not found in the environment, a test placeholder key will be used automatically. This allows you to run the tests without a real API key, but actual emails won't be sent.

## Codeception Testing Options

We have two sets of Codeception tests for email functionality:

1. **Simple Queue Verification** (`SimpleEmailTestCest.php`): These tests don't require database access and only verify that jobs are properly queued. They're faster and more reliable for CI/CD environments.

2. **Full Integration Tests** (`EmailJobsCest.php`): These tests interact with the database and test the complete email generation flow. They require a properly set up test database and migrations.

## Model Factories

We've implemented model factories for the following models to support testing:

- `Order` - For creating test orders
- `PaymentMethod` - For payment methods associated with orders
- `ShippingMethod` - For shipping methods, including e-voucher (ID 9)
- `Product` - For creating products to add to orders
- `Voucher` - For creating vouchers for e-voucher orders

These factories are used by the Codeception tests to create test data automatically.

## Running Automated Tests

### PHPUnit Tests

```bash
# Run all PHPUnit email-related tests
php artisan test tests/Feature/BrevoEmailTest.php tests/Feature/EmailServiceTest.php

# Run specific test files
php artisan test tests/Feature/BrevoEmailTest.php
php artisan test tests/Feature/EmailServiceTest.php
```

### Codeception Tests

```bash
# Run simplified email tests (recommended)
php vendor/bin/codecept run functional SimpleEmailTestCest

# Run full integration tests (requires database setup)
php vendor/bin/codecept run functional EmailJobsCest

# Run a specific test method
php vendor/bin/codecept run functional SimpleEmailTestCest:emailJobsAreQueued
```

## Database Setup for Full Integration Tests

If you want to run the full integration tests, you need to:

1. Create a test database (e.g., `poklon_test`)
2. Configure `.env.testing` with the correct database credentials
3. Run migrations in the test environment: `php artisan migrate:fresh --env=testing`

## Running Command Line Tests

Use the custom Artisan command to directly test email sending:

```bash
# Test all email types
php artisan app:test-email all

# Test specific email types
php artisan app:test-email admin  # Test admin order notification
php artisan app:test-email user   # Test user order notification
php artisan app:test-email voucher  # Test voucher email
php artisan app:test-email direct  # Test direct email sending
```

## Debugging Email Issues

If emails are not sending correctly:

1. Check the Laravel logs: `storage/logs/laravel.log`
2. Verify the Brevo API key is correct
3. Ensure all required email templates exist
4. Check the `shipping_method_id` is properly converted to integer when compared with `9` for e-voucher orders
5. Use `php artisan app:test-email direct` to test basic email connectivity

## Email Types

1. **Order Admin Notification**: Sent to administrators when new order is placed
2. **Order User Notification**: Sent to customers when they place an order
3. **Voucher Emails**: Sent for e-voucher orders (shipping_method_id = 9)
4. **Direct Emails**: Any other email sent directly via the EmailService

## Technical Implementation

- Email service: `App\Services\EmailService`
- Email jobs:
  - `App\Jobs\SendNewOrderAdminEmail`
  - `App\Jobs\SendNewOrderUserEmail`
  - `App\Jobs\SendVoucherEmail`

## Troubleshooting

If you encounter database-related issues with the full integration tests:

1. Check your `.env.testing` file to ensure the database connection is correct
2. Make sure the test database exists and is accessible
3. Try running the simplified tests instead: `php vendor/bin/codecept run functional SimpleEmailTestCest`
4. Run migrations manually: `php artisan migrate:fresh --env=testing`
