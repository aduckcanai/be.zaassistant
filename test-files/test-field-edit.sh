#!/bin/bash

# Test script for Field Edit API
echo "🧪 Testing Field Edit API..."
echo "=============================="

# Configuration
API_BASE_URL="http://localhost:3000"
ENDPOINT="/field-edit"

# Test 1: Update analysis board field
echo "📤 Test 1: Processing field update..."
RESPONSE=$(curl -s -X POST "$API_BASE_URL$ENDPOINT" \
  -H "Content-Type: application/json" \
  -d '{
    "analysis_board": {
      "product_goal": "Increase 7-day retention from 38% to 55% by Dec 2024",
      "user_problem_goal": {
        "problem": "New learners fail to form daily study habit",
        "user_goal": "Quick, bite-sized practice that fits daily routine"
      },
      "target_segments": ["Busy professionals", "University students"]
    },
    "field_name": "user_problem_goal",
    "updated_field": {
      "problem": "Users drop off after day 3 due to lack of engagement",
      "user_goal": "Build consistent daily learning habit within first week"
    }
  }')

echo "Response:"
echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"
echo ""

# Extract response ID for retrieval test
RESPONSE_ID=$(echo "$RESPONSE" | jq -r '.id' 2>/dev/null)

if [ "$RESPONSE_ID" != "null" ] && [ "$RESPONSE_ID" != "" ]; then
  echo "✅ Field update processed successfully!"
  echo "Response ID: $RESPONSE_ID"
  
  # Extract field_name and updated_value from response
  FIELD_NAME=$(echo "$RESPONSE" | jq -r '.field_name' 2>/dev/null)
  echo "Updated Field: $FIELD_NAME"
  echo ""
  
  # Test 2: Retrieve the response
  echo "📤 Test 2: Retrieving response by ID..."
  RETRIEVE_RESPONSE=$(curl -s -X GET "$API_BASE_URL$ENDPOINT/$RESPONSE_ID")
  
  echo "Retrieved Response:"
  echo "$RETRIEVE_RESPONSE" | jq '.' 2>/dev/null || echo "$RETRIEVE_RESPONSE"
  echo ""
  
  if echo "$RETRIEVE_RESPONSE" | jq -e '.id' > /dev/null 2>&1; then
    echo "✅ Response retrieved successfully!"
  else
    echo "❌ Failed to retrieve response"
  fi
else
  echo "❌ Failed to process field update"
fi

echo ""
echo "🎯 Test Summary:"
echo "- Field edit processing endpoint: $API_BASE_URL$ENDPOINT"
echo "- Method: POST"
echo "- Required fields: analysis_board, field_name, updated_field"
echo "- Retrieval endpoint: $API_BASE_URL$ENDPOINT/{response_id}"
echo "- Method: GET"
echo "- Prompt ID is hardcoded in service: pmpt_6891900364688195ba5b137631ff8cf609deaf0c90a8cf47"
echo ""
echo "📝 Usage Example:"
echo 'curl -X POST "http://localhost:3000/field-edit" \'
echo '  -H "Content-Type: application/json" \'
echo '  -d "{"analysis_board":{...},"field_name":"user_problem_goal","updated_field":{...}}"'
