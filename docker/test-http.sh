#!/bin/bash
# Simple script to test HTTP connectivity inside the container

echo "Testing HTTP connectivity to localhost..."
curl -v http://localhost:$PORT/health

echo -e "\n\nTesting Nginx configuration..."
nginx -t

echo -e "\n\nChecking listening ports..."
netstat -tulpn | grep LISTEN

echo -e "\n\nChecking PHP-FPM status..."
ps aux | grep php-fpm
