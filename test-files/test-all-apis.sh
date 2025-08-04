#!/bin/bash

echo "🚀 Testing all APIs on https://zah-2.123c.vn/hackathon/api/"
echo "=================================================="
echo ""

echo "1️⃣ Testing idea-to-analysis API..."
echo "-----------------------------------"
./test-idea-to-analysis.sh
echo ""
echo ""

echo "2️⃣ Testing product-critique API..."
echo "----------------------------------"
./test-product-critique.sh
echo ""
echo ""

echo "3️⃣ Testing solution-architect API..."
echo "------------------------------------"
./test-solution-architect.sh
echo ""
echo ""

echo "4️⃣ Testing solution-to-ui API..."
echo "--------------------------------"
./test-solution-to-ui.sh
echo ""
echo ""

echo "5️⃣ Testing assessment-center API..."
echo "-----------------------------------"
./test-assessment-center.sh
echo ""
echo ""

echo "✅ All API tests completed!"
echo "==========================" 