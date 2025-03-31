# CLAUDE.md - Laravel Project Guidelines

## Build & Test Commands
```bash
# Development build
npm run dev

# Production build
npm run prod

# Watch for changes
npm run watch

# Run all PHP tests
php vendor/bin/phpunit

# Run specific test class
php vendor/bin/codecept run functional VoucherGenerationCest

# Run specific test method
php vendor/bin/codecept run functional BrevoEmailCest:canSendDirectEmailViaBrevo
```

## Code Style Guidelines
- PSR-12 coding standards, with 4-space indentation
- Always use strict typing: `declare(strict_types=1);`
- Laravel conventions: singular models, plural controllers
- Naming: PascalCase (classes), camelCase (methods), snake_case (DB columns)
- Follow SOLID principles for object-oriented programming
- Use Laravel's validation, middleware, and exception handling
- Keep controllers thin with business logic in services
- Handle errors gracefully and use proper logging
- Follow Vue.js style guide for frontend components

## Repository Structure
This Laravel project uses both PHPUnit and Codeception for testing.
See `.cursor/rules/laravel-cursor-rules.mdc` for detailed coding guidelines.