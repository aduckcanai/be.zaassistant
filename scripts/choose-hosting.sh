#!/bin/bash

# Interactive hosting platform selection and deployment
# Usage: ./scripts/choose-hosting.sh

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

echo -e "${BOLD}${BLUE}🚀 Welcome to ChatGPT API Deployment Helper!${NC}"
echo ""
echo -e "${CYAN}This script will help you deploy your ChatGPT Integration API to a free hosting platform.${NC}"
echo ""

echo -e "${BOLD}📋 Available Free Hosting Options:${NC}"
echo ""
echo -e "${GREEN}1. Render.com${NC} ${YELLOW}(Recommended)${NC}"
echo -e "   • ✅ 750 hours/month free"
echo -e "   • ✅ Auto-deploy from Git"
echo -e "   • ✅ Free SSL/HTTPS"
echo -e "   • ✅ No cold starts"
echo ""

echo -e "${GREEN}2. Railway${NC}"
echo -e "   • ✅ $5 free credit/month"
echo -e "   • ✅ Great developer experience"
echo -e "   • ✅ Fast deployments"
echo -e "   • 💰 Pay-as-you-go after free tier"
echo ""

echo -e "${GREEN}3. Vercel${NC} ${YELLOW}(Serverless)${NC}"
echo -e "   • ✅ Unlimited deployments"
echo -e "   • ✅ Global CDN"
echo -e "   • ⚠️  10s execution limit (hobby plan)"
echo -e "   • ⚠️  Serverless architecture"
echo ""

echo -e "${GREEN}4. Heroku${NC}"
echo -e "   • ⚠️  Limited free tier"
echo -e "   • ⚠️  App sleeps when inactive"
echo -e "   • 💰 $5/month for Eco dynos"
echo ""

echo -e "${GREEN}5. Exit${NC}"
echo ""

while true; do
    echo -e "${BOLD}Please choose a hosting platform (1-5):${NC} "
    read -r choice
    
    case $choice in
        1)
            echo -e "${BLUE}🎯 You selected Render.com!${NC}"
            echo ""
            echo -e "${YELLOW}Setting up Render deployment...${NC}"
            ./scripts/deploy-render.sh
            
            echo ""
            echo -e "${BOLD}${GREEN}🎉 Render setup completed!${NC}"
            echo -e "${CYAN}Next steps:${NC}"
            echo -e "1. Push your code to GitHub"
            echo -e "2. Go to https://render.com and sign up"
            echo -e "3. Connect your GitHub repository"
            echo -e "4. Create a new Web Service"
            echo -e "5. Set OPENAI_API_KEY in environment variables"
            echo -e "6. Your app will deploy automatically!"
            break
            ;;
        2)
            echo -e "${BLUE}🎯 You selected Railway!${NC}"
            echo ""
            echo -e "${YELLOW}Setting up Railway deployment...${NC}"
            ./scripts/deploy-railway.sh
            
            echo ""
            echo -e "${BOLD}${GREEN}🎉 Railway setup completed!${NC}"
            echo -e "${CYAN}Quick deploy via web:${NC}"
            echo -e "1. Push code to GitHub"
            echo -e "2. Go to https://railway.app"
            echo -e "3. 'Deploy from GitHub repo'"
            echo -e "4. Set OPENAI_API_KEY environment variable"
            echo -e "5. Deploy!"
            break
            ;;
        3)
            echo -e "${BLUE}🎯 You selected Vercel!${NC}"
            echo ""
            echo -e "${YELLOW}Setting up Vercel deployment...${NC}"
            ./scripts/deploy-vercel.sh
            
            echo ""
            echo -e "${BOLD}${GREEN}🎉 Vercel setup completed!${NC}"
            echo -e "${CYAN}Deploy options:${NC}"
            echo -e "A. Via CLI: npm i -g vercel && vercel"
            echo -e "B. Via Web: Push to GitHub → Import on vercel.com"
            break
            ;;
        4)
            echo -e "${BLUE}🎯 You selected Heroku!${NC}"
            echo ""
            echo -e "${YELLOW}Setting up Heroku deployment...${NC}"
            ./scripts/deploy-heroku.sh
            
            echo ""
            echo -e "${BOLD}${GREEN}🎉 Heroku setup completed!${NC}"
            echo -e "${CYAN}Deploy options:${NC}"
            echo -e "A. Via CLI: heroku create && git push heroku main"
            echo -e "B. Via GitHub: Enable auto-deploy on Heroku dashboard"
            break
            ;;
        5)
            echo -e "${YELLOW}👋 Goodbye! You can run this script anytime to set up deployment.${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}❌ Invalid choice. Please enter 1-5.${NC}"
            ;;
    esac
done

echo ""
echo -e "${BOLD}${BLUE}📚 Useful Resources:${NC}"
echo -e "• OpenAI API Keys: https://platform.openai.com/api-keys"
echo -e "• Git Tutorial: https://git-scm.com/docs/gittutorial"
echo -e "• GitHub: https://github.com"
echo ""

echo -e "${BOLD}${YELLOW}⚠️  Important Reminders:${NC}"
echo -e "1. 🔑 Keep your OpenAI API key secure"
echo -e "2. 💰 Monitor your OpenAI usage and billing"
echo -e "3. 🔒 Never commit .env files to Git"
echo -e "4. 📊 Check your app logs regularly"
echo ""

echo -e "${BOLD}${GREEN}✨ Your ChatGPT API is ready to deploy! Good luck! 🚀${NC}" 