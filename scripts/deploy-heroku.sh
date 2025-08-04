#!/bin/bash

# Heroku deployment setup script
# Usage: ./scripts/deploy-heroku.sh

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 Setting up deployment for Heroku...${NC}"

# Create Procfile
echo -e "${YELLOW}📝 Creating Procfile...${NC}"
cat > Procfile << 'EOF'
web: node dist/main.js
EOF

# Create app.json for Heroku app configuration
echo -e "${YELLOW}📝 Creating app.json...${NC}"
cat > app.json << 'EOF'
{
  "name": "ChatGPT Integration API",
  "description": "NestJS API that integrates with ChatGPT",
  "repository": "https://github.com/your-username/hackathon-cmp",
  "logo": "https://nestjs.com/img/logo-small.svg",
  "keywords": ["node", "nestjs", "chatgpt", "openai", "api"],
  "image": "heroku/nodejs",
  "env": {
    "NODE_ENV": {
      "description": "Node environment",
      "value": "production"
    },
    "OPENAI_API_KEY": {
      "description": "Your OpenAI API key",
      "required": true
    }
  },
  "formation": {
    "web": {
      "quantity": 1,
      "size": "basic"
    }
  },
  "buildpacks": [
    {
      "url": "heroku/nodejs"
    }
  ],
  "scripts": {
    "postdeploy": "echo 'Deployment completed successfully!'"
  }
}
EOF

# Update package.json for Heroku
echo -e "${YELLOW}📝 Updating package.json for Heroku...${NC}"
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Add heroku-specific scripts
pkg.scripts = {
  ...pkg.scripts,
  'heroku-postbuild': 'pnpm run build',
  'heroku:logs': 'heroku logs --tail',
  'heroku:restart': 'heroku restart',
  'heroku:deploy': 'git push heroku main'
};

// Add engines (required by Heroku)
pkg.engines = {
  node: '>=18.0.0',
  npm: '>=9.0.0'
};

// Heroku requires npm, so we need to add this
pkg.scripts['preinstall'] = 'npm install -g pnpm';

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
console.log('✅ Updated package.json for Heroku');
"

# Create .slugignore for Heroku
echo -e "${YELLOW}📝 Creating .slugignore...${NC}"
cat > .slugignore << 'EOF'
*.md
.github/
test/
src/
scripts/
public/index.html
*.log
.env.example
EOF

# Update main.ts to use Heroku's PORT
echo -e "${YELLOW}📝 Updating main.ts for Heroku PORT...${NC}"
sed -i 's/process\.env\.PORT ?? 3000/process.env.PORT || 3000/g' src/main.ts

echo -e "${GREEN}✅ Heroku setup completed!${NC}"
echo -e "${BLUE}📋 Next steps:${NC}"
echo -e "  1. Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli"
echo -e "  2. Login: ${YELLOW}heroku login${NC}"
echo -e "  3. Create app: ${YELLOW}heroku create your-app-name${NC}"
echo -e "  4. Set environment variables:"
echo -e "     ${YELLOW}heroku config:set OPENAI_API_KEY=your_api_key${NC}"
echo -e "  5. Deploy: ${YELLOW}git push heroku main${NC}"

echo -e "${BLUE}🔧 Alternative: One-click Deploy${NC}"
echo -e "  1. Push to GitHub"
echo -e "  2. Click this button in your README:"
echo -e "     [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)"

echo -e "${BLUE}💰 Heroku Pricing:${NC}"
echo -e "  • ${YELLOW}Eco dynos: $5/month${NC}"
echo -e "  • 1000 hours free with credit card verification"
echo -e "  • App sleeps after 30 mins of inactivity"

echo -e "${RED}⚠️  Note: Free tier has limitations${NC}"
echo -e "  • App sleeps when inactive"
echo -e "  • Cold start delays"
echo -e "  • Consider paid tier for production" 