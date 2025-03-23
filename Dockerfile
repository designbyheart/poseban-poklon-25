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

# Install Node.js and npm
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get update && apt-get install -y nodejs \
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

# Create necessary directories with proper permissions first
RUN mkdir -p ./storage && chmod -R 777 storage \
    && mkdir -p ./bootstrap/cache && chmod -R 777 bootstrap/cache

# Copy the entire application
COPY . .

# Configure Composer to avoid timeout issues
RUN composer config --global process-timeout 2000

# Install PHP dependencies properly before running autoload
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader --verbose

# Run autoload only after dependencies are installed
RUN composer dump-autoload --optimize

# Install npm dependencies
RUN npm install

# Build the frontend
RUN npm run dev

# Set proper permissions
RUN chown -R www-data:www-data /var/www



# Expose PHP-FPM port
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]
