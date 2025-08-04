#!/bin/bash

# Environment setup script
# Usage: ./scripts/env-template.sh [server_ip] [openai_key]

set -e

SERVER_IP=${1:-"your-server-ip"}
OPENAI_KEY=${2:-""}
SERVER_USER=${3:-"ubuntu"}
PROJECT_NAME="hackathon-cmp"
REMOTE_PATH="/home/$SERVER_USER/$PROJECT_NAME"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🔧 Setting up environment variables...${NC}"

# Check if server IP is provided
if [ "$SERVER_IP" = "your-server-ip" ]; then
    echo -e "${RED}❌ Please provide server IP: ./scripts/env-template.sh <server-ip> [openai-key]${NC}"
    exit 1
fi

# If OpenAI key is not provided, prompt for it
if [ -z "$OPENAI_KEY" ]; then
    echo -e "${YELLOW}🔑 Please enter your OpenAI API key:${NC}"
    read -s OPENAI_KEY
    echo ""
fi

echo -e "${YELLOW}📝 Creating .env file on server...${NC}"
ssh $SERVER_USER@$SERVER_IP << EOF
    cd $REMOTE_PATH
    
    # Backup existing .env if it exists
    if [ -f .env ]; then
        cp .env .env.backup.\$(date +%Y%m%d_%H%M%S)
        echo "Backed up existing .env file"
    fi
    
    # Create new .env file
    cat > .env << EOL
# OpenAI Configuration
OPENAI_API_KEY=$OPENAI_KEY

# Server Configuration
PORT=3000
NODE_ENV=production

# Application Configuration
APP_NAME=ChatGPT Integration API
APP_VERSION=1.0.0

# Logging
LOG_LEVEL=info

# Security (optional - uncomment if needed)
# JWT_SECRET=your-jwt-secret-here
# CORS_ORIGIN=https://yourdomain.com

# Database (optional - uncomment if needed)
# DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Monitoring (optional)
# SENTRY_DSN=your-sentry-dsn-here
EOL
    
    # Set proper permissions
    chmod 600 .env
    
    echo "✅ .env file created successfully!"
    echo "📋 Environment variables configured:"
    echo "   • OpenAI API Key: $(echo $OPENAI_KEY | cut -c1-8)..."
    echo "   • Port: 3000"
    echo "   • Environment: production"
EOF

echo -e "${GREEN}✅ Environment setup completed!${NC}"
echo -e "${BLUE}📋 Next steps:${NC}"
echo -e "  1. Deploy the application: make deploy SERVER_IP=$SERVER_IP"
echo -e "  2. Check service status: make status SERVER_IP=$SERVER_IP"
echo -e "  3. Test API: curl http://$SERVER_IP:3000/health"

echo -e "${YELLOW}💡 Tips:${NC}"
echo -e "  • Keep your OpenAI API key secure"
echo -e "  • Monitor your OpenAI usage and billing"
echo -e "  • Consider setting up SSL with nginx" 