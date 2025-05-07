#!/bin/bash
# Script to restart Laravel queue workers on production

echo "Restarting Laravel Queue Workers..."
sudo supervisorctl restart laravel-queue:*
echo "Done! Checking current status:"
sudo supervisorctl status laravel-queue:*
