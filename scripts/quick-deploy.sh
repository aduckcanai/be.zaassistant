#!/bin/bash

# Quick deploy script - only sync code and restart service
# Usage: ./scripts/quick-deploy.sh [server_ip]

set -e

# Configuration
SERVER_IP=${1:-"118.102.2.102"}
SERVER_USER=${2:-"zah18-team2"}
SSH_PORT=2222
PROJECT_NAME="hackathon-cmp"
REMOTE_PATH="/home/$SERVER_USER/$PROJECT_NAME"
SERVICE_NAME="chatgpt-api"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Load password from .env.deploy (not committed)
if [ -f "$(dirname "$0")/../.env.deploy" ]; then
  source "$(dirname "$0")/../.env.deploy"
fi

# If SSH_PASS is set, prefix commands with sshpass
[ -n "$SSH_PASS" ] && SSHPASS_PREFIX="sshpass -p $SSH_PASS" || SSHPASS_PREFIX=""

echo -e "${BLUE}⚡ Quick deployment starting...${NC}"

# Check if server IP is provided
if [ "$SERVER_IP" = "your-server-ip" ]; then
    echo -e "${RED}❌ Please provide server IP: ./scripts/quick-deploy.sh <server-ip>${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Building project...${NC}"
pnpm run build

echo -e "${YELLOW}🚀 Syncing code...${NC}"
# Ensure rsync exists on remote
${SSHPASS_PREFIX} ssh -p $SSH_PORT $SERVER_USER@$SERVER_IP "command -v rsync >/dev/null 2>&1 || (echo '🔧 Installing rsync...' && (command -v apt-get >/dev/null 2>&1 && sudo apt-get update -qq && sudo apt-get install -y -qq rsync) || (command -v dnf >/dev/null 2>&1 && sudo dnf install -y -q rsync) || (command -v yum >/dev/null 2>&1 && sudo yum install -y -q rsync) || (command -v apk >/dev/null 2>&1 && sudo apk add --no-cache rsync))"

# Path to project root (directory containing script/..)
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

${SSHPASS_PREFIX} rsync -e "ssh -p $SSH_PORT" -avz --delete \
  --exclude 'node_modules' --exclude '.git' --exclude '.env' \
  --exclude '*.log' --exclude '.pnpm-cache' \
  "$PROJECT_ROOT/" \
  "$SERVER_USER@$SERVER_IP:$REMOTE_PATH/"

echo -e "${YELLOW}🔄 Restarting service...${NC}"
${SSHPASS_PREFIX} ssh -p $SSH_PORT $SERVER_USER@$SERVER_IP << EOF
    cd $REMOTE_PATH
    
    # Check if service exists
    if systemctl list-units --full -all | grep -Fq "$SERVICE_NAME.service"; then
        sudo systemctl restart $SERVICE_NAME
        sleep 2
        sudo systemctl status $SERVICE_NAME --no-pager
    else
        echo "⚠️  Service $SERVICE_NAME not found. Running with PM2..."
        
        # Install PM2 if not available
        if ! command -v pm2 >/dev/null 2>&1; then
            echo "📦 Installing PM2..."
            npm install -g pm2
            
            # Update PATH to include global npm binaries
            export PATH="$PATH:$(npm config get prefix)/bin"
            
            # Also try common npm global paths
            if [ -d "$HOME/.npm-global/bin" ]; then
                export PATH="$PATH:$HOME/.npm-global/bin"
            fi
            if [ -d "/usr/local/lib/node_modules/.bin" ]; then
                export PATH="$PATH:/usr/local/lib/node_modules/.bin"
            fi
            
            # Verify PM2 is now available
            if ! command -v pm2 >/dev/null 2>&1; then
                echo "❌ Failed to install PM2. Falling back to nohup..."
                # Fallback to nohup
                pkill -f "node.*main.js" || true
                mkdir -p logs
                nohup node dist/main.js > logs/app.log 2>&1 &
                echo "Started with nohup. PID: $!"
                exit 0
            fi
        fi
        
        # Kill any existing process
        pkill -f "node.*main.js" || true
        pm2 delete $PROJECT_NAME 2>/dev/null || true
        
        # Create logs directory if it doesn't exist
        mkdir -p logs
        
        # Start with PM2
        echo "🚀 Starting with PM2..."
        pm2 start dist/main.js --name $PROJECT_NAME
        
        # Wait a moment for startup
        sleep 3
        
        # Check PM2 status
        pm2 list
        
        # Check if the process is running
        if pm2 show $PROJECT_NAME >/dev/null 2>&1; then
            echo "✅ Service is running successfully with PM2"
            echo "📊 PM2 Status:"
            pm2 show $PROJECT_NAME
            echo "📝 Recent logs:"
            pm2 logs $PROJECT_NAME --lines 10 --nostream || echo "No logs available yet"
        else
            echo "❌ Service failed to start with PM2"
            echo "📝 PM2 logs:"
            pm2 logs $PROJECT_NAME --lines 20 --nostream || echo "No PM2 logs available"
        fi
        
        # Save PM2 configuration for auto-restart on reboot
        pm2 save
        if pm2 startup 2>/dev/null | grep -E '^sudo' >/dev/null; then
            echo "📝 To enable PM2 auto-start on reboot, run the sudo command shown above"
        fi
    fi
EOF

echo -e "${GREEN}✅ Quick deployment completed!${NC}"
echo -e "${BLUE}🌐 Service is running at: http://$SERVER_IP:3000${NC}" 