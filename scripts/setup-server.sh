#!/bin/bash

# Server setup script - Install Node.js, pnpm and other dependencies
# Usage: ./scripts/setup-server.sh [server_ip] [user]

set -e

SERVER_IP=${1:-"your-server-ip"}
SERVER_USER=${2:-"ubuntu"}

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🔧 Setting up server environment...${NC}"

# Check if server IP is provided
if [ "$SERVER_IP" = "your-server-ip" ]; then
    echo -e "${RED}❌ Please provide server IP: ./scripts/setup-server.sh <server-ip> [user]${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Installing Node.js and dependencies...${NC}"
ssh $SERVER_USER@$SERVER_IP << 'EOF'
    # Update system
    sudo apt update && sudo apt upgrade -y
    
    # Install curl and other essentials
    sudo apt install -y curl wget git build-essential
    
    # Install Node.js (using NodeSource repository)
    if ! command -v node &> /dev/null; then
        echo "Installing Node.js..."
        curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
        sudo apt-get install -y nodejs
    else
        echo "Node.js already installed: $(node --version)"
    fi
    
    # Install pnpm
    if ! command -v pnpm &> /dev/null; then
        echo "Installing pnpm..."
        curl -fsSL https://get.pnpm.io/install.sh | sh -
        
        # Add pnpm to PATH for current session
        export PNPM_HOME="$HOME/.local/share/pnpm"
        export PATH="$PNPM_HOME:$PATH"
        
        # Add to bashrc for future sessions
        echo 'export PNPM_HOME="$HOME/.local/share/pnpm"' >> ~/.bashrc
        echo 'export PATH="$PNPM_HOME:$PATH"' >> ~/.bashrc
    else
        echo "pnpm already installed: $(pnpm --version)"
    fi
    
    # Install PM2 globally (alternative process manager)
    if ! command -v pm2 &> /dev/null; then
        echo "Installing PM2..."
        npm install -g pm2
    else
        echo "PM2 already installed: $(pm2 --version)"
    fi
    
    # Configure firewall
    if command -v ufw &> /dev/null; then
        echo "Configuring firewall..."
        sudo ufw allow ssh
        sudo ufw allow 3000
        sudo ufw --force enable
    fi
    
    echo "✅ Server setup completed!"
    echo "Node.js version: $(node --version)"
    echo "npm version: $(npm --version)"
    echo "pnpm version: $(pnpm --version)"
EOF

echo -e "${GREEN}✅ Server setup completed successfully!${NC}"
echo -e "${BLUE}📋 Next steps:${NC}"
echo -e "  1. Run: ${YELLOW}./scripts/deploy.sh production $SERVER_IP${NC}"
echo -e "  2. SSH to server and update .env file with OpenAI API key"
echo -e "  3. Optional: Set up nginx reverse proxy" 