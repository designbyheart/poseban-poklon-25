# Use the PHP 7.4 FPM image
FROM php:7.4-fpm

# Add Composer to the PATH
ENV PATH="$PATH:/usr/local/bin"

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Configure and install PHP extensions (including zip)
RUN docker-php-ext-configure zip \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Install Composer v1 (compatible with PHP 7.1)
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer --1

# Increase PHP memory limit
RUN echo "memory_limit=-1" > /usr/local/etc/php/conf.d/memory-limit.ini

# Set working directory
WORKDIR /var/www

# Copy composer files first for better caching
COPY composer.json composer.lock ./

# Configure Composer to avoid timeout issues
RUN composer config --global process-timeout 2000

# Copy the rest of the application
COPY app ./app
COPY bootstrap ./bootstrap
COPY config ./config
COPY database ./database
COPY public ./public
COPY resources ./resources
COPY routes ./routes
COPY storage ./storage
COPY tests ./tests
COPY vendor ./vendor
COPY artisan .
COPY package.json .
COPY ./.env .
COPY .editorconfig .
COPY package-lock.json .

RUN ls database/seeds

# Install PHP dependencies
# Uncomment one of these lines when ready to run composer install
# RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader --verbose
# RUN composer install --no-interaction --optimize-autoloader --no-scripts --verbose
RUN composer dump-autoload --verbose

# Set proper permissions if needed
# RUN chown -R www-data:www-data /var/www

# Expose PHP-FPM port
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]
