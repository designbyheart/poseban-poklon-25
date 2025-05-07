#!/bin/bash
# Script to stop a specific Laravel queue worker on production

if [ -z "$1" ]; then
  echo "Error: Please provide a worker ID (e.g. laravel-queue_00)"
  echo "Usage: $0 <worker_id>"
  echo "To see available workers, run: sudo supervisorctl status laravel-queue:*"
  exit 1
fi

echo "Stopping Laravel Queue Worker: $1"
sudo supervisorctl stop laravel-queue:$1
echo "Done! Checking current status:"
sudo supervisorctl status laravel-queue:*
