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

# Copy only the essential files and directories that are guaranteed to exist
COPY composer.json ./
COPY app/ ./app/
COPY bootstrap/ ./bootstrap/
COPY config/ ./config/
COPY database/ ./database/
COPY public/ ./public/
COPY resources/ ./resources/
COPY routes/ ./routes/
COPY artisan ./

# Create .env from example if it exists, otherwise create a minimal one
RUN if [ -f "/var/www/.env.example" ]; then \
    cp /var/www/.env.example /var/www/.env; \
    else \
    echo "APP_NAME=Laravel\nAPP_ENV=production\nDB_CONNECTION=mysql\nDB_HOST=db\nDB_PORT=3306\nDB_DATABASE=poklon\nDB_USERNAME=localroot\nDB_PASSWORD=localroot" > /var/www/.env; \
    fi

# Install dependencies
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader
RUN composer dump-autoload --optimize

# Set proper permissions
RUN chown -R www-data:www-data /var/www/storage

# Copy Nginx and Supervisor configuration files
COPY docker/nginx/default.conf /etc/nginx/sites-available/default
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Remove default Nginx configuration
RUN rm -f /etc/nginx/sites-enabled/default

# Enable our Nginx site
RUN ln -sf /etc/nginx/sites-available/default /etc/nginx/sites-enabled/

# Expose port 80 for web traffic
EXPOSE 80

# Start supervisor to manage both nginx and php-fpm
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]


