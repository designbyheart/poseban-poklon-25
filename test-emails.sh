#!/bin/bash

# Clear caches
php artisan config:clear

# Test emails using the command-line tool
echo "Testing all email types..."
php artisan app:test-email all

echo "Completed email tests."
echo "Check the logs to see if emails were sent successfully:"
echo "tail -f storage/logs/laravel.log"