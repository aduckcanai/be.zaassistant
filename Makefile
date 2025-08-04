# Makefile for ChatGPT Integration API

# Variables
SERVER_IP ?= your-server-ip
SERVER_USER ?= ubuntu
DOMAIN ?= your-domain.com

# Default target
.PHONY: help
help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# Development
.PHONY: dev
dev: ## Start development server
	pnpm run start:dev

.PHONY: build
build: ## Build the project
	pnpm run build

.PHONY: test
test: ## Run tests
	pnpm run test

# Deployment
.PHONY: setup-server
setup-server: ## Setup server environment (SERVER_IP required)
	@if [ "$(SERVER_IP)" = "your-server-ip" ]; then \
		echo "❌ Please provide SERVER_IP: make setup-server SERVER_IP=x.x.x.x"; \
		exit 1; \
	fi
	chmod +x scripts/setup-server.sh
	./scripts/setup-server.sh $(SERVER_IP) $(SERVER_USER)

.PHONY: deploy
deploy: ## Full deployment to server (SERVER_IP required)
	@if [ "$(SERVER_IP)" = "your-server-ip" ]; then \
		echo "❌ Please provide SERVER_IP: make deploy SERVER_IP=x.x.x.x"; \
		exit 1; \
	fi
	chmod +x scripts/deploy.sh
	./scripts/deploy.sh production $(SERVER_IP) $(SERVER_USER)

.PHONY: deploy-quick
deploy-quick: ## Quick deployment (code sync + restart)
	@if [ "$(SERVER_IP)" = "your-server-ip" ]; then \
		echo "❌ Please provide SERVER_IP: make deploy-quick SERVER_IP=x.x.x.x"; \
		exit 1; \
	fi
	chmod +x scripts/quick-deploy.sh
	./scripts/quick-deploy.sh $(SERVER_IP) $(SERVER_USER)

.PHONY: deploy-pm2
deploy-pm2: ## Deploy using PM2
	@if [ "$(SERVER_IP)" = "your-server-ip" ]; then \
		echo "❌ Please provide SERVER_IP: make deploy-pm2 SERVER_IP=x.x.x.x"; \
		exit 1; \
	fi
	chmod +x scripts/pm2-deploy.sh
	./scripts/pm2-deploy.sh $(SERVER_IP) $(SERVER_USER)

# Infrastructure
.PHONY: setup-nginx
setup-nginx: ## Setup nginx reverse proxy
	@if [ "$(SERVER_IP)" = "your-server-ip" ]; then \
		echo "❌ Please provide SERVER_IP and DOMAIN: make setup-nginx SERVER_IP=x.x.x.x DOMAIN=example.com"; \
		exit 1; \
	fi
	chmod +x scripts/nginx-setup.sh
	./scripts/nginx-setup.sh $(SERVER_IP) $(DOMAIN) $(SERVER_USER)

# Monitoring
.PHONY: status
status: ## Check service status
	@if [ "$(SERVER_IP)" = "your-server-ip" ]; then \
		echo "❌ Please provide SERVER_IP: make status SERVER_IP=x.x.x.x"; \
		exit 1; \
	fi
	chmod +x scripts/monitor.sh
	./scripts/monitor.sh $(SERVER_IP) status $(SERVER_USER)

.PHONY: logs
logs: ## View service logs
	@if [ "$(SERVER_IP)" = "your-server-ip" ]; then \
		echo "❌ Please provide SERVER_IP: make logs SERVER_IP=x.x.x.x"; \
		exit 1; \
	fi
	chmod +x scripts/monitor.sh
	./scripts/monitor.sh $(SERVER_IP) logs $(SERVER_USER)

.PHONY: health
health: ## Check API health
	@if [ "$(SERVER_IP)" = "your-server-ip" ]; then \
		echo "❌ Please provide SERVER_IP: make health SERVER_IP=x.x.x.x"; \
		exit 1; \
	fi
	chmod +x scripts/monitor.sh
	./scripts/monitor.sh $(SERVER_IP) health $(SERVER_USER)

.PHONY: restart
restart: ## Restart service
	@if [ "$(SERVER_IP)" = "your-server-ip" ]; then \
		echo "❌ Please provide SERVER_IP: make restart SERVER_IP=x.x.x.x"; \
		exit 1; \
	fi
	chmod +x scripts/monitor.sh
	./scripts/monitor.sh $(SERVER_IP) restart $(SERVER_USER)

# SSH helpers
.PHONY: ssh
ssh: ## SSH to server
	@if [ "$(SERVER_IP)" = "your-server-ip" ]; then \
		echo "❌ Please provide SERVER_IP: make ssh SERVER_IP=x.x.x.x"; \
		exit 1; \
	fi
	ssh $(SERVER_USER)@$(SERVER_IP)

.PHONY: ssh-logs
ssh-logs: ## SSH to server and view logs
	@if [ "$(SERVER_IP)" = "your-server-ip" ]; then \
		echo "❌ Please provide SERVER_IP: make ssh-logs SERVER_IP=x.x.x.x"; \
		exit 1; \
	fi
	ssh $(SERVER_USER)@$(SERVER_IP) "sudo journalctl -u chatgpt-api -f"

# Cleanup
.PHONY: clean
clean: ## Clean build artifacts
	rm -rf dist/
	rm -rf node_modules/
	rm -rf logs/

# Example commands
.PHONY: examples
examples: ## Show example commands
	@echo "Example commands:"
	@echo ""
	@echo "1. Setup a new server:"
	@echo "   make setup-server SERVER_IP=1.2.3.4"
	@echo ""
	@echo "2. Full deployment:"
	@echo "   make deploy SERVER_IP=1.2.3.4"
	@echo ""
	@echo "3. Quick deployment (code changes only):"
	@echo "   make deploy-quick SERVER_IP=1.2.3.4"
	@echo ""
	@echo "4. Setup nginx reverse proxy:"
	@echo "   make setup-nginx SERVER_IP=1.2.3.4 DOMAIN=api.example.com"
	@echo ""
	@echo "5. Monitor service:"
	@echo "   make status SERVER_IP=1.2.3.4"
	@echo "   make logs SERVER_IP=1.2.3.4"
	@echo "   make health SERVER_IP=1.2.3.4" 