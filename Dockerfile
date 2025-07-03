# Use the PHP 7.4 FPM image as the base image
FROM php:7.4-fpm AS base

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

# Create required directories
RUN mkdir -p app/ bootstrap/ config/ database/ public/ resources/ routes/ \
    storage/app/public/ \
    storage/framework/cache/ \
    storage/framework/sessions/ \
    storage/framework/views/ \
    storage/logs/

# Create empty files to avoid errors if they don't exist in build context
RUN touch composer.lock .env .env.example package.json package-lock.json .editorconfig

# Copy composer.json (required)
COPY composer.json ./

# Copy essential directories and files if they exist
COPY app/ ./app/
COPY bootstrap/ ./bootstrap/
COPY config/ ./config/
COPY database/ ./database/
COPY public/ ./public/
COPY resources/ ./resources/
COPY routes/ ./routes/
COPY storage/ ./storage/
COPY tests/ ./tests/
COPY artisan ./
COPY composer.lock ./
COPY .env.example ./
COPY .env ./
COPY package.json ./
COPY package-lock.json ./
COPY .editorconfig ./

# Configure Composer to avoid timeout issues
RUN composer config --global process-timeout 2000

# Create .env from example if needed
RUN if [ -f ".env.example" ] && [ ! -s ".env" ]; then cp .env.example .env; fi

# Install dependencies
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader
RUN composer dump-autoload --optimize

# Set proper permissions
RUN chown -R www-data:www-data /var/www/storage

# Expose PHP-FPM port
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]
