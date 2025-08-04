#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Base URL
BASE_URL="http://localhost:3000"

echo -e "${BLUE}=== Testing Sample Prompts API ===${NC}"
echo ""

# Test: Get all prompts
echo -e "${YELLOW}Testing GET /sample-prompts${NC}"
echo "Request: GET $BASE_URL/sample-prompts"
echo ""
curl -X GET "$BASE_URL/sample-prompts" \
  -H "Content-Type: application/json" \
  -w "\nStatus Code: %{http_code}\n" \
  -s | jq '.'
echo ""

echo -e "${GREEN}=== Sample Prompts API Testing Complete ===${NC}" 