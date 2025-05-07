#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Print header
echo -e "${GREEN}Starting Laravel Development Environment${NC}"
echo "======================================"

# Function to cleanup processes on exit
cleanup() {
    echo -e "\n${YELLOW}Shutting down services...${NC}"
    
    # Kill any running processes
    if [ ! -z "$SERVER_PID" ]; then
        echo "Stopping Laravel server..."
        kill $SERVER_PID 2>/dev/null
    fi
    
    if [ ! -z "$QUEUE_PID" ]; then
        echo "Stopping Queue worker..."
        kill $QUEUE_PID 2>/dev/null
    fi
    
    echo -e "${GREEN}All services stopped. Goodbye!${NC}"
    exit 0
}

# Set up trap to catch SIGINT (Ctrl+C) and other termination signals
trap cleanup SIGINT SIGTERM EXIT

# Start Laravel server in background
echo -e "${GREEN}Starting Laravel development server...${NC}"
php artisan serve --port=8001 > server.log 2>&1 &
SERVER_PID=$!
echo "Server running with PID: $SERVER_PID"

# Check if server started successfully
sleep 2
if ! ps -p $SERVER_PID > /dev/null; then
    echo -e "${YELLOW}Server failed to start. Check server.log for details.${NC}"
    cat server.log
    exit 1
fi

echo -e "${GREEN}Server started successfully!${NC}"

# Start Queue worker in background
echo -e "${GREEN}Starting Queue worker...${NC}"
php artisan queue:work > queue.log 2>&1 &
QUEUE_PID=$!
echo "Queue worker running with PID: $QUEUE_PID"

# Check if queue worker started successfully
sleep 2
if ! ps -p $QUEUE_PID > /dev/null; then
    echo -e "${YELLOW}Queue worker failed to start. Check queue.log for details.${NC}"
    cat queue.log
    # Continue even if queue fails, as server might be useful on its own
fi

echo -e "${GREEN}Queue worker started successfully!${NC}"

# Display information about the running services
echo -e "\n${GREEN}Services running:${NC}"
echo "- Laravel Server (PID: $SERVER_PID)"
echo "- Queue Worker (PID: $QUEUE_PID)"
echo -e "\n${YELLOW}Logs:${NC}"
echo "- Server log: server.log"
echo "- Queue log: queue.log"
echo -e "\n${YELLOW}Press Ctrl+C to stop all services${NC}"

# Keep script running
while true; do
    # Check if server is still running
    if ! ps -p $SERVER_PID > /dev/null; then
        echo -e "${YELLOW}Server stopped unexpectedly. Check server.log for details.${NC}"
        tail -n 20 server.log
        break
    fi
    
    # Check if queue worker is still running
    if ! ps -p $QUEUE_PID > /dev/null; then
        echo -e "${YELLOW}Queue worker stopped unexpectedly. Check queue.log for details.${NC}"
        tail -n 20 queue.log
        # Restart queue worker if it fails
        echo -e "${GREEN}Restarting Queue worker...${NC}"
        php artisan queue:work >> queue.log 2>&1 &
        QUEUE_PID=$!
        echo "Queue worker restarted with PID: $QUEUE_PID"
    fi
    
    sleep 5
done

# If we reach here, something went wrong
echo -e "${YELLOW}One or more services stopped unexpectedly. Shutting down...${NC}"
cleanup
