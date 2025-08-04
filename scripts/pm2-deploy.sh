#!/bin/bash

# PM2 deployment script
# Usage: ./scripts/pm2-deploy.sh [server_ip] [user]

set -e

SERVER_IP=${1:-"your-server-ip"}
SERVER_USER=${2:-"ubuntu"}
PROJECT_NAME="hackathon-cmp"
REMOTE_PATH="/home/$SERVER_USER/$PROJECT_NAME"
APP_NAME="chatgpt-api"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 PM2 Deployment starting...${NC}"

# Check if server IP is provided
if [ "$SERVER_IP" = "your-server-ip" ]; then
    echo -e "${RED}❌ Please provide server IP: ./scripts/pm2-deploy.sh <server-ip> [user]${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Building project...${NC}"
pnpm run build

echo -e "${YELLOW}🔄 Syncing code to server...${NC}"
# Create remote directory
ssh $SERVER_USER@$SERVER_IP "mkdir -p $REMOTE_PATH"

# Sync code
rsync -avz --delete \
    --exclude 'node_modules' \
    --exclude '.git' \
    --exclude '.env' \
    --exclude '*.log' \
    --exclude '.pnpm-cache' \
    ./ $SERVER_USER@$SERVER_IP:$REMOTE_PATH/

echo -e "${YELLOW}⚙️  Installing dependencies...${NC}"
ssh $SERVER_USER@$SERVER_IP << EOF
    cd $REMOTE_PATH
    
    # Install dependencies
    pnpm install --production
    
    # Create .env if doesn't exist
    if [ ! -f .env ]; then
        cat > .env << EOL
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
NODE_ENV=production
EOL
        echo "⚠️  Created .env file - please update with your OpenAI API key"
    fi
    
    # Create ecosystem file for PM2
    cat > ecosystem.config.js << EOL
module.exports = {
  apps: [{
    name: '$APP_NAME',
    script: 'dist/main.js',
    instances: 1,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    log_file: './logs/combined.log',
    out_file: './logs/out.log',
    error_file: './logs/error.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    max_memory_restart: '1G',
    restart_delay: 4000
  }]
};
EOL
    
    # Create logs directory
    mkdir -p logs
    
    # Stop existing PM2 process if running
    pm2 stop $APP_NAME 2>/dev/null || true
    pm2 delete $APP_NAME 2>/dev/null || true
    
    # Start with PM2
    pm2 start ecosystem.config.js
    
    # Save PM2 configuration
    pm2 save
    
    # Setup PM2 startup
    pm2 startup | grep -E '^sudo' | bash || true
    
    # Show status
    pm2 status
EOF

echo -e "${GREEN}✅ PM2 deployment completed successfully!${NC}"
echo -e "${BLUE}📋 Service Information:${NC}"
echo -e "  • App name: $APP_NAME"
echo -e "  • Server: $SERVER_USER@$SERVER_IP"
echo -e "  • URL: http://$SERVER_IP:3000"
echo -e "  • Demo: http://$SERVER_IP:3000/demo"

echo -e "${BLUE}🛠️  PM2 Commands:${NC}"
echo -e "  • Status: ssh $SERVER_USER@$SERVER_IP 'pm2 status'"
echo -e "  • Logs: ssh $SERVER_USER@$SERVER_IP 'pm2 logs $APP_NAME'"
echo -e "  • Restart: ssh $SERVER_USER@$SERVER_IP 'pm2 restart $APP_NAME'"
echo -e "  • Stop: ssh $SERVER_USER@$SERVER_IP 'pm2 stop $APP_NAME'"
echo -e "  • Monitor: ssh $SERVER_USER@$SERVER_IP 'pm2 monit'" 