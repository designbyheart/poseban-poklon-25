# Use the PHP 7.1 FPM image
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

# Set working directory
WORKDIR /var/www

# Increase PHP memory limit
RUN echo "memory_limit=-1" > /usr/local/etc/php/conf.d/memory-limit.ini

# Copy the rest of the application
# Copy application files in smaller chunks to avoid space issues
COPY composer.json composer.lock ./
COPY app ./app
COPY bootstrap ./bootstrap
COPY config ./config
COPY database ./database
COPY public ./public
COPY resources ./resources
COPY routes ./routes
COPY storage ./storage
COPY tests ./tests
COPY artisan .
COPY package.json .

# # Copy only composer files for dependency caching
COPY composer.json ./

# Configure Composer to avoid timeout issues
RUN composer config --global process-timeout 2000

RUN ls database/seeds

# Install PHP dependencies (you can temporarily add --no-scripts for debugging)
#RUN #composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader --verbose
# Alternatively, if debugging the post scripts, try:
# RUN #composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader --no-scripts --verbose
RUN #composer install --no-interaction --optimize-autoloader --no-scripts --verbose
# # Regenerate autoloader (if needed)
RUN composer dump-autoload --verbose

# Set file permissions for the web server
# Clean up any temporary files before changing ownership to free up space
# RUN find /var/www -type f -name "*.log" -delete && \
#     find /var/www -type d -name "node_modules" -exec rm -rf {} + && \
#     find /var/www -type d -name "vendor" -exec rm -rf {} + && \
#     chown -R www-data:www-data /var/www

# RUN npm install && npm run build

# Expose PHP-FPM port
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]
