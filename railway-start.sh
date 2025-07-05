#!/bin/bash
set -e

echo "Starting Laravel application on Railway..."

# Create storage directories if they don't exist
mkdir -p storage/app/public
mkdir -p storage/framework/cache
mkdir -p storage/framework/sessions
mkdir -p storage/framework/testing
mkdir -p storage/framework/views
mkdir -p storage/logs

# Set proper permissions
chmod -R 775 storage bootstrap/cache

# Create symbolic link for storage if it doesn't exist
php artisan storage:link || echo "Storage link already exists"

# Generate application key if not set
if [ -z "$APP_KEY" ]; then
  echo "No application key set. Generating one..."
  php artisan key:generate --force
fi

# Run migrations if DB is configured
if [ -n "$DB_HOST" ] && [ -n "$DB_DATABASE" ] && [ -n "$DB_USERNAME" ]; then
  echo "Running migrations..."
  php artisan migrate --force
fi

# Start the Laravel application using PHP's built-in server
echo "Starting Laravel server on port $PORT..."
exec php artisan serve --host=0.0.0.0 --port=$PORT
