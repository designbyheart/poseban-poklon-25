#!/bin/bash

# Replace the $PORT placeholder with the actual PORT value
envsubst '$PORT' < /etc/nginx/sites-available/railway.conf > /etc/nginx/sites-enabled/default

# Start supervisor
exec "$@"
