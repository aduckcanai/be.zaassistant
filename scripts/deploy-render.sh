#!/bin/bash

# Render.com deployment setup script
# Usage: ./scripts/deploy-render.sh

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 Setting up deployment for Render.com...${NC}"

# Create render.yaml for auto-deployment
echo -e "${YELLOW}📝 Creating render.yaml configuration...${NC}"
cat > render.yaml << 'EOF'
services:
  - type: web
    name: chatgpt-api
    env: node
    plan: free
    buildCommand: pnpm install && pnpm run build
    startCommand: node dist/main.js
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        sync: false
      - key: OPENAI_API_KEY
        sync: false
    healthCheckPath: /health
    autoDeploy: true
EOF

# Create start script for production
echo -e "${YELLOW}📝 Creating production start script...${NC}"
cat > scripts/start-production.js << 'EOF'
const { spawn } = require('child_process');
const path = require('path');

// Start the application
const app = spawn('node', [path.join(__dirname, '..', 'dist', 'main.js')], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'production'
  }
});

app.on('error', (error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});

app.on('close', (code) => {
  console.log(`Application exited with code ${code}`);
  process.exit(code);
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  app.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully...');
  app.kill('SIGINT');
});
EOF

# Update package.json with additional scripts
echo -e "${YELLOW}📝 Adding production scripts to package.json...${NC}"
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Add render-specific scripts
pkg.scripts = {
  ...pkg.scripts,
  'start:render': 'node scripts/start-production.js',
  'build:render': 'pnpm run build',
  'deploy:render': 'git push origin main'
};

// Add engines for Node.js version
pkg.engines = {
  node: '>=18.0.0',
  pnpm: '>=8.0.0'
};

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
console.log('✅ Updated package.json');
"

echo -e "${GREEN}✅ Render.com setup completed!${NC}"
echo -e "${BLUE}📋 Next steps:${NC}"
echo -e "  1. Push code to GitHub/GitLab"
echo -e "  2. Go to https://render.com and create account"
echo -e "  3. Connect your Git repository"
echo -e "  4. Create new Web Service"
echo -e "  5. Set environment variables:"
echo -e "     ${YELLOW}OPENAI_API_KEY=your_openai_api_key${NC}"
echo -e "  6. Deploy will start automatically!"

echo -e "${BLUE}🔧 Important settings for Render:${NC}"
echo -e "  • Build Command: ${YELLOW}pnpm install && pnpm run build${NC}"
echo -e "  • Start Command: ${YELLOW}node dist/main.js${NC}"
echo -e "  • Environment: ${YELLOW}Node${NC}"
echo -e "  • Plan: ${YELLOW}Free${NC}" 