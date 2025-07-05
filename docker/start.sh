#!/bin/bash
set -e

# Create storage directories if they don't exist
mkdir -p /var/www/storage/app/public
mkdir -p /var/www/storage/framework/cache
mkdir -p /var/www/storage/framework/sessions
mkdir -p /var/www/storage/framework/testing
mkdir -p /var/www/storage/framework/views
mkdir -p /var/www/storage/logs

# Set proper permissions
chown -R www-data:www-data /var/www/storage
chmod -R 775 /var/www/storage

# Create symbolic link for storage
php artisan storage:link --force

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

# Clear and optimize Laravel cache
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Update Nginx configuration with the correct PORT
envsubst '$PORT' < /etc/nginx/sites-available/railway.conf > /etc/nginx/sites-enabled/default

# Start supervisor to manage both nginx and php-fpm
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
