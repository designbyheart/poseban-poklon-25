# Use the PHP 7.4 FPM image as the base image
FROM php:7.4-fpm

# Add Composer to the PATH
ENV PATH="$PATH:/usr/local/bin"

# Install system dependencies including nginx
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    nginx \
    supervisor \
    gettext-base \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Configure and install PHP extensions (including zip)
RUN docker-php-ext-configure zip \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Install Composer v2
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Increase PHP memory limit
RUN echo "memory_limit=-1" > /usr/local/etc/php/conf.d/memory-limit.ini

# Set working directory
WORKDIR /var/www

# Create required directories
RUN mkdir -p app/ bootstrap/ config/ database/ public/ resources/ routes/ \
    storage/app/public/ \
    storage/framework/cache/ \
    storage/framework/sessions/ \
    storage/framework/views/ \
    storage/logs/ \
    tests/

# Copy all application files
COPY . .

# Create .env from example if it exists, otherwise create a minimal one
RUN if [ -f "/var/www/.env.example" ]; then \
    cp /var/www/.env.example /var/www/.env; \
    else \
    echo "APP_NAME=Laravel\nAPP_ENV=production\nDB_CONNECTION=mysql\nDB_HOST=\${DB_HOST}\nDB_PORT=\${DB_PORT}\nDB_DATABASE=\${DB_DATABASE}\nDB_USERNAME=\${DB_USERNAME}\nDB_PASSWORD=\${DB_PASSWORD}" > /var/www/.env; \
    fi

# Install dependencies
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader
RUN composer dump-autoload --optimize

# Set proper permissions for storage
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
RUN chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Copy Nginx and Supervisor configuration files
COPY docker/nginx/default.conf /etc/nginx/sites-available/default
COPY docker/nginx/railway.conf /etc/nginx/sites-available/railway.conf
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY docker/start.sh /usr/local/bin/start.sh

# Make the start script executable
RUN chmod +x /usr/local/bin/start.sh

# Remove default Nginx configuration
RUN rm -f /etc/nginx/sites-enabled/default

# Enable our Nginx site
RUN ln -sf /etc/nginx/sites-available/default /etc/nginx/sites-enabled/

# Expose port based on PORT environment variable (default to 80)
EXPOSE ${PORT:-80}

# Set Laravel environment variables
ENV APP_ENV=production
ENV LOG_CHANNEL=stderr
ENV APP_DEBUG=false
ENV CACHE_DRIVER=file
ENV SESSION_DRIVER=file
ENV QUEUE_CONNECTION=sync

# Use the start script to configure and start the application
ENTRYPOINT ["/usr/local/bin/start.sh"]

# Start supervisor to manage both nginx and php-fpm
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
