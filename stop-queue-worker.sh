#!/bin/bash

# Find queue worker processes
WORKER_PROCESSES=$(ps aux | grep '[q]ueue:work' | awk '{print $2}')

if [ -z "$WORKER_PROCESSES" ]; then
    echo "No queue worker processes found."
else
    # Kill the processes
    echo "Stopping queue worker processes: $WORKER_PROCESSES"
    kill $WORKER_PROCESSES
    echo "Queue workers stopped."
fi