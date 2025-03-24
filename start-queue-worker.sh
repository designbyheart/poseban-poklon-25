#!/bin/bash

# Clear any cached configurations
php artisan config:clear

# Start the queue worker
nohup php artisan queue:work --tries=3 --sleep=3 > storage/logs/queue-worker.log 2>&1 &

# Display the process ID
echo "Queue worker started. Process ID: $!"
echo "Logs are being written to storage/logs/queue-worker.log"