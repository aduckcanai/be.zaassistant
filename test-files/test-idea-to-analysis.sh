#!/bin/bash

# Test idea-to-analysis API
echo "Testing idea-to-analysis API..."
curl -s -X POST https://zah-2.123c.vn/hackathon/api/responses/idea_to_analysis \
  -H 'Content-Type: application/json' \
  -d '{"inputData":"{\"idea\":\"Người dùng là một Product Owner tại một app học tiếng Anh, họ muốn tìm cách cải thiện việc duy trì học hàng ngày (retention) của người dùng mới trong 7 ngày đầu.\",\"context\":\"Product improvement\"}"}' \
| jq '.' 