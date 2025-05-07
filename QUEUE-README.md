# Laravel Queue Management Cheatsheet

This document provides a comprehensive guide to managing Laravel queues both in development and production environments.

## Table of Contents

- [Local Development](#local-development)
- [Production Environment](#production-environment)
- [Laravel Artisan Queue Commands](#laravel-artisan-queue-commands)
- [Supervisor Commands](#supervisor-commands)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

## Local Development

### Starting Queue Worker and Server Together

We've created a custom script that runs both the Laravel server and queue worker simultaneously:

```bash
# Using composer script
composer start

# Or directly
./start.sh
```

This script:
- Starts the Laravel development server on port 8001
- Starts a queue worker in the background
- Logs output from both processes to separate files
- Automatically restarts the queue worker if it fails

### Manual Queue Commands for Development

```bash
# Process jobs synchronously (in the same request)
php artisan queue:work --once

# Run a queue worker in the foreground
php artisan queue:work

# Run a queue worker for a specific queue
php artisan queue:work --queue=emails

# Run a queue worker that stops after processing one job
php artisan queue:work --once
```

## Production Environment

### Supervisor Configuration

We use Supervisor to ensure queue workers stay running in production. The configuration file is located at:
```
/etc/supervisor/conf.d/laravel-queue.conf
```

Example configuration:
```ini
[program:laravel-queue]
process_name=%(program_name)s_%(process_num)02d
command=php /path/to/your/project/artisan queue:work --sleep=3 --tries=3
directory=/path/to/your/project
autostart=true
autorestart=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/path/to/your/project/storage/logs/queue-worker.log
stopwaitsecs=3600
```

### Utility Scripts

We've created utility scripts to simplify queue management:

```bash
# Check status of all queue workers
./scripts/queue-status.sh

# Restart all queue workers
./scripts/queue-restart.sh

# Stop a specific queue worker
./scripts/queue-stop.sh laravel-queue_00
```

## Laravel Artisan Queue Commands

### Basic Commands

```bash
# List all available queue commands
php artisan list queue

# Start a queue worker
php artisan queue:work

# Process a single job and then exit
php artisan queue:work --once

# Start a queue worker that will process jobs and then sleep for x seconds
php artisan queue:work --sleep=3

# Restart queue workers (after deployment)
php artisan queue:restart
```

### Advanced Options

```bash
# Specify connection and queue
php artisan queue:work redis --queue=high,default

# Set number of tries before job is marked as failed
php artisan queue:work --tries=3

# Set timeout in seconds
php artisan queue:work --timeout=60

# Set memory limit in megabytes
php artisan queue:work --memory=256

# Process jobs from the failed_jobs table
php artisan queue:retry all
php artisan queue:retry 5,6,7,8

# Delete a failed job
php artisan queue:forget 5

# Delete all failed jobs
php artisan queue:flush
```

### Queue Monitoring

```bash
# Show current queue status
php artisan queue:status

# List failed jobs
php artisan queue:failed

# Create failed_jobs table if it doesn't exist
php artisan queue:failed-table
```

## Supervisor Commands

### Basic Management

```bash
# Read the configuration files
sudo supervisorctl reread

# Activate any changes in configuration
sudo supervisorctl update

# Show status of all processes
sudo supervisorctl status

# Show status of a specific group
sudo supervisorctl status laravel-queue:*
```

### Process Control

```bash
# Start all processes in a group
sudo supervisorctl start laravel-queue:*

# Start a specific process
sudo supervisorctl start laravel-queue:laravel-queue_00

# Stop all processes in a group
sudo supervisorctl stop laravel-queue:*

# Stop a specific process
sudo supervisorctl stop laravel-queue:laravel-queue_00

# Restart all processes in a group
sudo supervisorctl restart laravel-queue:*

# Restart a specific process
sudo supervisorctl restart laravel-queue:laravel-queue_00
```

## Troubleshooting

### Common Issues

1. **Queue worker stops processing jobs**
   - Check memory limits with `--memory=256`
   - Ensure timeout is sufficient with `--timeout=60`
   - Use `--tries=3` to retry failed jobs

2. **Jobs not being processed**
   - Verify queue connection in `.env` file
   - Check if queue worker is running
   - Ensure the correct queue name is being processed

3. **Failed jobs piling up**
   - Examine specific errors with `php artisan queue:failed`
   - Retry jobs with `php artisan queue:retry all`
   - Fix the underlying issue and then retry

### Debugging

```bash
# View the queue worker logs
tail -f storage/logs/queue-worker.log

# View Laravel logs
tail -f storage/logs/laravel.log

# Check failed jobs
php artisan queue:failed
```

## Best Practices

1. **Always use Supervisor in production**
   - Ensures workers stay running
   - Automatically restarts crashed workers

2. **Use multiple queue workers**
   - Set `numprocs=2` or higher in Supervisor config
   - Increases throughput for job processing

3. **Use different queues for different job types**
   - High priority: `php artisan queue:work --queue=high,default`
   - Ensures critical jobs are processed first

4. **Restart queue workers after deployment**
   - `php artisan queue:restart` (graceful restart)
   - Ensures workers use the latest code

5. **Set appropriate timeouts**
   - Prevents jobs from running indefinitely
   - `--timeout=60` (seconds)

6. **Monitor failed jobs**
   - Regular checks with `php artisan queue:failed`
   - Set up notifications for failed jobs

7. **Use job batches for related jobs**
   - `php artisan queue:batches-table`
   - Track progress of related jobs

---

For more information, refer to the [Laravel Queue Documentation](https://laravel.com/docs/queues).
