#!/bin/bash

# Nginx setup script for reverse proxy
# Usage: ./scripts/nginx-setup.sh [server_ip] [domain] [user]

set -e

SERVER_IP=${1:-"your-server-ip"}
DOMAIN=${2:-"your-domain.com"}
SERVER_USER=${3:-"ubuntu"}

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🌐 Setting up Nginx reverse proxy...${NC}"

# Check if server IP is provided
if [ "$SERVER_IP" = "your-server-ip" ]; then
    echo -e "${RED}❌ Please provide server IP: ./scripts/nginx-setup.sh <server-ip> [domain] [user]${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Installing and configuring Nginx...${NC}"
ssh $SERVER_USER@$SERVER_IP << EOF
    # Install nginx
    sudo apt update
    sudo apt install -y nginx
    
    # Create nginx configuration
    sudo tee /etc/nginx/sites-available/chatgpt-api << 'EOL'
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN $SERVER_IP;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # Rate limiting
    limit_req_zone \$binary_remote_addr zone=api:10m rate=10r/s;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # Timeout settings
        proxy_connect_timeout       60s;
        proxy_send_timeout          60s;
        proxy_read_timeout          60s;
    }
    
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
    
    # Static files caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        proxy_pass http://localhost:3000;
    }
}
EOL
    
    # Enable the site
    sudo ln -sf /etc/nginx/sites-available/chatgpt-api /etc/nginx/sites-enabled/
    
    # Remove default site
    sudo rm -f /etc/nginx/sites-enabled/default
    
    # Test nginx configuration
    sudo nginx -t
    
    # Restart nginx
    sudo systemctl restart nginx
    sudo systemctl enable nginx
    
    # Configure firewall
    sudo ufw allow 'Nginx Full'
    
    echo "✅ Nginx setup completed!"
EOF

echo -e "${GREEN}✅ Nginx reverse proxy setup completed!${NC}"
echo -e "${BLUE}📋 Information:${NC}"
echo -e "  • Domain: $DOMAIN"
echo -e "  • Server IP: $SERVER_IP"
echo -e "  • HTTP URL: http://$DOMAIN"

echo -e "${BLUE}🔧 Next steps:${NC}"
echo -e "  1. Point your domain DNS to server IP: $SERVER_IP"
echo -e "  2. Install SSL certificate:"
echo -e "     ${YELLOW}ssh $SERVER_USER@$SERVER_IP 'sudo apt install certbot python3-certbot-nginx'${NC}"
echo -e "     ${YELLOW}ssh $SERVER_USER@$SERVER_IP 'sudo certbot --nginx -d $DOMAIN'${NC}"
echo -e "  3. Test SSL: https://www.ssllabs.com/ssltest/"

echo -e "${BLUE}🛠️  Nginx Commands:${NC}"
echo -e "  • Test config: ssh $SERVER_USER@$SERVER_IP 'sudo nginx -t'"
echo -e "  • Reload: ssh $SERVER_USER@$SERVER_IP 'sudo systemctl reload nginx'"
echo -e "  • Status: ssh $SERVER_USER@$SERVER_IP 'sudo systemctl status nginx'"
echo -e "  • Logs: ssh $SERVER_USER@$SERVER_IP 'sudo tail -f /var/log/nginx/error.log'" 