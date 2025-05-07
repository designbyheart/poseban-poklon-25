#!/bin/bash
# Script to check Laravel queue status on production

echo "Checking Laravel Queue Workers Status..."
sudo supervisorctl status laravel-queue:*
