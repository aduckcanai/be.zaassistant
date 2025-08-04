#!/bin/bash

# Monitoring script for ChatGPT API service
# Usage: ./scripts/monitor.sh [server_ip] [action]

set -e

SERVER_IP=${1:-"your-server-ip"}
ACTION=${2:-"status"}
SERVER_USER=${3:-"ubuntu"}
SERVICE_NAME="chatgpt-api"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Check if server IP is provided
if [ "$SERVER_IP" = "your-server-ip" ]; then
    echo -e "${RED}❌ Please provide server IP: ./scripts/monitor.sh <server-ip> [action]${NC}"
    echo -e "${BLUE}Available actions: status, logs, health, restart, stop, start${NC}"
    exit 1
fi

case $ACTION in
    "status")
        echo -e "${BLUE}📊 Checking service status...${NC}"
        ssh $SERVER_USER@$SERVER_IP << EOF
            echo "=== System Info ==="
            echo "Uptime: \$(uptime)"
            echo "Memory: \$(free -h | grep Mem)"
            echo "Disk: \$(df -h / | tail -1)"
            echo ""
            
            echo "=== Service Status ==="
            if systemctl is-active --quiet $SERVICE_NAME; then
                echo -e "Service: ${GREEN}Active${NC}"
            else
                echo -e "Service: ${RED}Inactive${NC}"
            fi
            
            echo "=== Port Check ==="
            if netstat -tlnp | grep :3000 > /dev/null; then
                echo -e "Port 3000: ${GREEN}Open${NC}"
            else
                echo -e "Port 3000: ${RED}Closed${NC}"
            fi
            
            echo "=== Process Info ==="
            ps aux | grep -E "(node|chatgpt)" | grep -v grep || echo "No processes found"
EOF
        ;;
        
    "logs")
        echo -e "${BLUE}📋 Viewing logs...${NC}"
        ssh $SERVER_USER@$SERVER_IP "sudo journalctl -u $SERVICE_NAME -f --lines=50"
        ;;
        
    "health")
        echo -e "${BLUE}🏥 Health check...${NC}"
        echo "Testing API endpoints..."
        
        # Test health endpoint
        if curl -s -f "http://$SERVER_IP:3000/health" > /dev/null; then
            echo -e "Health endpoint: ${GREEN}✅ OK${NC}"
        else
            echo -e "Health endpoint: ${RED}❌ Failed${NC}"
        fi
        
        # Test main endpoint
        if curl -s -f "http://$SERVER_IP:3000/" > /dev/null; then
            echo -e "Main endpoint: ${GREEN}✅ OK${NC}"
        else
            echo -e "Main endpoint: ${RED}❌ Failed${NC}"
        fi
        
        # Test demo endpoint
        if curl -s -f "http://$SERVER_IP:3000/demo" > /dev/null; then
            echo -e "Demo endpoint: ${GREEN}✅ OK${NC}"
        else
            echo -e "Demo endpoint: ${RED}❌ Failed${NC}"
        fi
        ;;
        
    "restart")
        echo -e "${YELLOW}🔄 Restarting service...${NC}"
        ssh $SERVER_USER@$SERVER_IP << EOF
            sudo systemctl restart $SERVICE_NAME
            sleep 3
            sudo systemctl status $SERVICE_NAME --no-pager
EOF
        ;;
        
    "stop")
        echo -e "${YELLOW}⏹️  Stopping service...${NC}"
        ssh $SERVER_USER@$SERVER_IP "sudo systemctl stop $SERVICE_NAME"
        ;;
        
    "start")
        echo -e "${YELLOW}▶️  Starting service...${NC}"
        ssh $SERVER_USER@$SERVER_IP << EOF
            sudo systemctl start $SERVICE_NAME
            sleep 3
            sudo systemctl status $SERVICE_NAME --no-pager
EOF
        ;;
        
    "pm2")
        echo -e "${BLUE}📊 PM2 Status...${NC}"
        ssh $SERVER_USER@$SERVER_IP << EOF
            echo "=== PM2 Processes ==="
            pm2 status
            echo ""
            echo "=== PM2 Info ==="
            pm2 info chatgpt-api 2>/dev/null || echo "PM2 process not found"
EOF
        ;;
        
    *)
        echo -e "${RED}❌ Unknown action: $ACTION${NC}"
        echo -e "${BLUE}Available actions:${NC}"
        echo -e "  • status  - Show service and system status"
        echo -e "  • logs    - View service logs (real-time)"
        echo -e "  • health  - Test API endpoints"
        echo -e "  • restart - Restart the service"
        echo -e "  • stop    - Stop the service"
        echo -e "  • start   - Start the service"
        echo -e "  • pm2     - Show PM2 status (if using PM2)"
        exit 1
        ;;
esac 