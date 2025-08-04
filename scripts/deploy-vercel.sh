#!/bin/bash

# Vercel deployment setup script
# Usage: ./scripts/deploy-vercel.sh

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 Setting up deployment for Vercel...${NC}"

# Create vercel.json configuration
echo -e "${YELLOW}📝 Creating vercel.json configuration...${NC}"
cat > vercel.json << 'EOF'
{
  "version": 2,
  "name": "chatgpt-integration-api",
  "builds": [
    {
      "src": "dist/main.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/main.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  },
  "functions": {
    "dist/main.js": {
      "maxDuration": 30
    }
  }
}
EOF

# Create API directory structure for Vercel
echo -e "${YELLOW}📁 Creating Vercel API structure...${NC}"
mkdir -p api

# Create serverless function wrapper
cat > api/index.js << 'EOF'
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/app.module');
const { ValidationPipe } = require('@nestjs/common');

let app;

async function createApp() {
  if (!app) {
    app = await NestFactory.create(AppModule);
    
    // Enable CORS
    app.enableCors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });

    // Enable global validation pipe
    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }));

    await app.init();
  }
  return app;
}

module.exports = async (req, res) => {
  const app = await createApp();
  const expressApp = app.getHttpAdapter().getInstance();
  return expressApp(req, res);
};
EOF

# Update package.json for Vercel
echo -e "${YELLOW}📝 Updating package.json for Vercel...${NC}"
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Add vercel-specific scripts
pkg.scripts = {
  ...pkg.scripts,
  'build:vercel': 'nest build',
  'deploy:vercel': 'vercel --prod',
  'vercel-build': 'pnpm run build'
};

// Add engines
pkg.engines = {
  node: '>=18.0.0'
};

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
console.log('✅ Updated package.json for Vercel');
"

# Create .vercelignore
echo -e "${YELLOW}📝 Creating .vercelignore...${NC}"
cat > .vercelignore << 'EOF'
node_modules
.git
.env.local
.env.development
src
test
*.md
.github
scripts
public
*.log
EOF

echo -e "${GREEN}✅ Vercel setup completed!${NC}"
echo -e "${BLUE}📋 Next steps:${NC}"
echo -e "  1. Install Vercel CLI: ${YELLOW}npm i -g vercel${NC}"
echo -e "  2. Login to Vercel: ${YELLOW}vercel login${NC}"
echo -e "  3. Deploy: ${YELLOW}vercel${NC}"
echo -e "  4. Set environment variables:"
echo -e "     ${YELLOW}vercel env add OPENAI_API_KEY${NC}"
echo -e "  5. Deploy to production: ${YELLOW}vercel --prod${NC}"

echo -e "${BLUE}🔧 Alternative: Deploy via Git${NC}"
echo -e "  1. Push to GitHub"
echo -e "  2. Go to https://vercel.com"
echo -e "  3. Import Git repository"
echo -e "  4. Set OPENAI_API_KEY in environment variables"
echo -e "  5. Deploy automatically!" 