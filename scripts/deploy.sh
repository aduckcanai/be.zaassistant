#!/bin/bash

# Deploy script for ChatGPT Integration API
# Usage: ./scripts/deploy.sh [environment] [server_ip]

set -e  # Exit on any error

# Configuration
ENVIRONMENT=${1:-production}
SERVER_IP=${2:-"your-server-ip"}
SERVER_USER=${3:-"ubuntu"}
PROJECT_NAME="hackathon-cmp"
REMOTE_PATH="/home/$SERVER_USER/$PROJECT_NAME"
SERVICE_NAME="chatgpt-api"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting deployment to $ENVIRONMENT environment...${NC}"

# Check if server IP is provided
if [ "$SERVER_IP" = "your-server-ip" ]; then
    echo -e "${RED}❌ Please provide server IP: ./scripts/deploy.sh production <server-ip>${NC}"
    exit 1
fi

# Check if SSH key exists
if [ ! -f ~/.ssh/id_rsa ]; then
    echo -e "${YELLOW}⚠️  SSH key not found. Make sure you have SSH access to the server.${NC}"
fi

echo -e "${YELLOW}📦 Building project...${NC}"
# Build the project
pnpm run build

echo -e "${YELLOW}🔄 Syncing code to server...${NC}"
# Create remote directory if it doesn't exist
ssh $SERVER_USER@$SERVER_IP "mkdir -p $REMOTE_PATH"

# Sync code to server (excluding node_modules and other unnecessary files)
rsync -avz --delete \
    --exclude 'node_modules' \
    --exclude '.git' \
    --exclude '.env' \
    --exclude 'dist' \
    --exclude '*.log' \
    --exclude '.pnpm-cache' \
    ./ $SERVER_USER@$SERVER_IP:$REMOTE_PATH/

# Copy package files
scp package.json pnpm-lock.yaml $SERVER_USER@$SERVER_IP:$REMOTE_PATH/

echo -e "${YELLOW}⚙️  Installing dependencies on server...${NC}"
# Install dependencies and build on server
ssh $SERVER_USER@$SERVER_IP << EOF
    cd $REMOTE_PATH
    
    # Install pnpm if not exists
    if ! command -v pnpm &> /dev/null; then
        echo "Installing pnpm..."
        curl -fsSL https://get.pnpm.io/install.sh | sh -
        source ~/.bashrc
    fi
    
    # Install dependencies
    pnpm install --production=false
    
    # Build project
    pnpm run build
    
    # Create .env file if it doesn't exist
    if [ ! -f .env ]; then
        echo "Creating .env file..."
        cat > .env << EOL
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
NODE_ENV=production
EOL
        echo "⚠️  Please update .env file with your OpenAI API key"
    fi
    
    # Create logs directory
    mkdir -p logs
EOF

echo -e "${YELLOW}🔧 Setting up systemd service...${NC}"
# Create systemd service file
ssh $SERVER_USER@$SERVER_IP << EOF
    sudo tee /etc/systemd/system/$SERVICE_NAME.service > /dev/null << EOL
[Unit]
Description=ChatGPT Integration API
After=network.target

[Service]
Type=simple
User=$SERVER_USER
WorkingDirectory=$REMOTE_PATH
Environment=NODE_ENV=production
ExecStart=/usr/bin/node dist/main.js
Restart=always
RestartSec=10
StandardOutput=append:$REMOTE_PATH/logs/app.log
StandardError=append:$REMOTE_PATH/logs/error.log

[Install]
WantedBy=multi-user.target
EOL

    # Reload systemd and enable service
    sudo systemctl daemon-reload
    sudo systemctl enable $SERVICE_NAME
EOF

echo -e "${YELLOW}🔄 Starting service...${NC}"
# Start the service
ssh $SERVER_USER@$SERVER_IP << EOF
    sudo systemctl restart $SERVICE_NAME
    sleep 3
    sudo systemctl status $SERVICE_NAME --no-pager
EOF

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${BLUE}📋 Service Information:${NC}"
echo -e "  • Service name: $SERVICE_NAME"
echo -e "  • Server: $SERVER_USER@$SERVER_IP"
echo -e "  • Path: $REMOTE_PATH"
echo -e "  • URL: http://$SERVER_IP:3000"
echo -e "  • Demo: http://$SERVER_IP:3000/demo"
echo -e "  • Health: http://$SERVER_IP:3000/health"

echo -e "${BLUE}🛠️  Useful commands:${NC}"
echo -e "  • Check status: ssh $SERVER_USER@$SERVER_IP 'sudo systemctl status $SERVICE_NAME'"
echo -e "  • View logs: ssh $SERVER_USER@$SERVER_IP 'sudo journalctl -u $SERVICE_NAME -f'"
echo -e "  • Restart service: ssh $SERVER_USER@$SERVER_IP 'sudo systemctl restart $SERVICE_NAME'"
echo -e "  • Stop service: ssh $SERVER_USER@$SERVER_IP 'sudo systemctl stop $SERVICE_NAME'"

echo -e "${YELLOW}⚠️  Don't forget to:${NC}"
echo -e "  1. Update .env file with your OpenAI API key"
echo -e "  2. Configure firewall to allow port 3000"
echo -e "  3. Set up nginx reverse proxy (optional)" 