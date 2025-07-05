#!/bin/bash
set -e

echo "Starting Laravel build process..."

# Install PHP dependencies
composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev

# Generate application key if not set
if [ -z "$APP_KEY" ]; then
  echo "No application key set. Generating one..."
  php artisan key:generate --force
fi

# Create storage link
php artisan storage:link || echo "Storage link already exists"

# Set proper permissions
chmod -R 775 storage bootstrap/cache

# Clear and optimize Laravel cache
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "Build process completed successfully!"
