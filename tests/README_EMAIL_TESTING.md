# Email Testing Guide for Poseban Poklon

This guide explains how to test email functionality in the Poseban Poklon application using Codeception.

## Overview

We've migrated email testing from PHPUnit to Codeception. The primary benefits include:
- Better integration with the Laravel application during tests
- More readable test syntax
- Consistent testing approach with the rest of the application
- Improved test reporting

## Email Testing Files

1. **Codeception Test**: `tests/functional/BrevoEmailCest.php`
   - Tests email service functionality
   - Tests email job creation and queuing
   - Contains a skipped test for direct API connection verification

2. **Artisan Command**: `app/Console/Commands/TestBrevoEmailCodecept.php`
   - Command to manually test email sending via Brevo
   - Use when you need to verify the actual email delivery outside of tests

## Running Email Tests

### Run All Brevo Email Tests

```bash
vendor/bin/codecept run functional BrevoEmailCest
```

### Run Specific Test Method

```bash
vendor/bin/codecept run functional BrevoEmailCest:canSendDirectEmailViaBrevo
```

### Run Tests with Groups

```bash
vendor/bin/codecept run functional --group email-jobs
vendor/bin/codecept run functional --group brevo-api
```

## Manual Testing of Brevo Integration

To verify actual email delivery using the Brevo service, use the Artisan command:

```bash
php artisan codecept:test-brevo
# Or specify an email address
php artisan codecept:test-brevo your.email@example.com
```

This command will:
1. Create a real connection to Brevo API
2. Send an actual test email
3. Report success or failure with detailed error info

## Test Design

The tests are designed to verify:

1. **Email Service**: Ensures the EmailService can create and send emails
2. **Job Creation**: Tests that email jobs can be created
3. **Queue Integration**: Verifies that jobs are properly queued

The tests avoid making actual API calls during automated test runs to prevent unnecessary email sending. The skipped test `verifyRealBrevoApiConnection` can be enabled manually when needed for direct API verification.

## Common Issues

1. **Factory Issues**: If you're getting database errors related to factories, ensure your factories match the actual database schema.

2. **API Connection**: If emails aren't being sent, verify the Brevo API key in `.env` and run the manual command to test the connection.

3. **Missing Email Template**: Ensure `emails/test/test_email.blade.php` exists.

## How PHPUnit Tests Were Migrated

The original PHPUnit tests in `tests/Feature/BrevoEmailTest.php` were migrated to Codeception by:

1. Creating equivalent test methods with Codeception syntax
2. Adapting assertions to use Codeception's `$I->assert*` format
3. Using mock objects instead of database interactions when possible
4. Leveraging Codeception's built-in transaction handling

This approach maintains test coverage while providing the benefits of Codeception's testing framework.

## For Developers

When adding new email functionality:

1. Add appropriate tests to `BrevoEmailCest.php`
2. Use the existing pattern of separating creation and execution
3. Group tests appropriately with `@group` annotations
