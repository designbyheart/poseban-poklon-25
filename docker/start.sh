#!/bin/bash
set -e

echo "Starting Laravel application setup..."

# Install diagnostic tools if needed
if ! command -v curl &> /dev/null; then
  echo "Installing curl for diagnostics..."
  apt-get update && apt-get install -y curl net-tools
fi

# Create storage directories if they don't exist
mkdir -p /var/www/storage/app/public
mkdir -p /var/www/storage/framework/cache
mkdir -p /var/www/storage/framework/sessions
mkdir -p /var/www/storage/framework/testing
mkdir -p /var/www/storage/framework/views
mkdir -p /var/www/storage/logs

# Set proper permissions
echo "Setting proper permissions..."
chown -R www-data:www-data /var/www/storage
chmod -R 775 /var/www/storage

# Create symbolic link for storage
echo "Creating storage link..."
php artisan storage:link

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
echo "Optimizing Laravel cache..."
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Enable debug mode for troubleshooting
echo "APP_DEBUG=${APP_DEBUG:-true}" >> /var/www/.env
echo "LOG_LEVEL=${LOG_LEVEL:-debug}" >> /var/www/.env

# List routes for debugging
echo "Available routes:"
php artisan route:list

# Update Nginx configuration with the correct PORT
echo "Configuring Nginx with PORT=$PORT..."
envsubst '$PORT' < /etc/nginx/sites-available/railway.conf > /etc/nginx/sites-enabled/default

# Verify Nginx configuration
echo "Verifying Nginx configuration..."
nginx -t

# Start supervisor to manage both nginx and php-fpm
echo "Starting services..."
/usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf &

# Give services time to start
echo "Waiting for services to start..."
sleep 5

# Run HTTP test after services have started (in background to not block startup)
echo "Running HTTP test..."
(sleep 10 && /var/www/docker/test-http.sh) &

# Keep the container running
exec tail -f /var/log/supervisor/supervisord.log
