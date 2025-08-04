#!/bin/bash

# Railway deployment setup script
# Usage: ./scripts/deploy-railway.sh

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 Setting up deployment for Railway...${NC}"

# Create railway.toml configuration
echo -e "${YELLOW}📝 Creating railway.toml configuration...${NC}"
cat > railway.toml << 'EOF'
[build]
builder = "NIXPACKS"
buildCommand = "pnpm install && pnpm run build"

[deploy]
startCommand = "node dist/main.js"
healthcheckPath = "/health"
healthcheckTimeout = 30
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 3

[env]
NODE_ENV = "production"
PORT = { default = "3000" }
EOF

# Create Procfile for Railway
echo -e "${YELLOW}📝 Creating Procfile...${NC}"
cat > Procfile << 'EOF'
web: node dist/main.js
EOF

# Create nixpacks.toml for build configuration
echo -e "${YELLOW}📝 Creating nixpacks.toml...${NC}"
cat > nixpacks.toml << 'EOF'
[phases.setup]
nixPkgs = ["nodejs-18_x", "pnpm"]

[phases.install]
cmds = ["pnpm install"]

[phases.build]
cmds = ["pnpm run build"]

[start]
cmd = "node dist/main.js"
EOF

# Update package.json for Railway
echo -e "${YELLOW}📝 Updating package.json for Railway...${NC}"
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Add railway-specific scripts
pkg.scripts = {
  ...pkg.scripts,
  'railway:deploy': 'railway up',
  'railway:logs': 'railway logs',
  'railway:shell': 'railway shell'
};

// Add engines
pkg.engines = {
  node: '>=18.0.0',
  pnpm: '>=8.0.0'
};

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
console.log('✅ Updated package.json for Railway');
"

echo -e "${GREEN}✅ Railway setup completed!${NC}"
echo -e "${BLUE}📋 Next steps:${NC}"
echo -e "  1. Install Railway CLI: ${YELLOW}npm install -g @railway/cli${NC}"
echo -e "  2. Login: ${YELLOW}railway login${NC}"
echo -e "  3. Initialize project: ${YELLOW}railway init${NC}"
echo -e "  4. Set environment variables:"
echo -e "     ${YELLOW}railway variables set OPENAI_API_KEY=your_api_key${NC}"
echo -e "  5. Deploy: ${YELLOW}railway up${NC}"

echo -e "${BLUE}🔧 Alternative: Deploy via Git${NC}"
echo -e "  1. Push to GitHub"
echo -e "  2. Go to https://railway.app"
echo -e "  3. Create new project from GitHub repo"
echo -e "  4. Set OPENAI_API_KEY in environment variables"
echo -e "  5. Deploy automatically!"

echo -e "${BLUE}💰 Railway Pricing:${NC}"
echo -e "  • ${GREEN}$5 free credit per month${NC}"
echo -e "  • Pay-as-you-go after free tier"
echo -e "  • Estimated cost: ~$1-3/month for this app" 