#!/bin/bash

# Test solution-to-ui API
echo "Testing solution-to-ui API..."
curl -s -X POST https://zah-2.123c.vn/hackathon/api/responses/solution_to_ui \
  -H 'Content-Type: application/json' \
  -d '{
    "problem_statement": "Làm thế nào để tăng tỷ lệ giữ chân người dùng mới trong 7 ngày đầu từ 22% lên 35%?",
    "selected_approach": {
      "approach_name": "The Safe Bet",
      "description": "Triển khai từng bước với các tính năng cốt lõi trước, tập trung vào gamification và thông báo cá nhân hóa để tăng engagement trong tuần đầu tiên.",
      "core_tradeoff": "Đánh đổi tốc độ triển khai để đạt được độ ổn định cao và giảm thiểu rủi ro kỹ thuật",
      "key_benefits": [
        "Giảm rủi ro kỹ thuật trong quá trình phát triển",
        "Dễ dàng bảo trì và mở rộng trong tương lai",
        "Có thể đo lường và tối ưu hóa từng tính năng riêng lẻ",
        "Phù hợp với constraint về nhân lực backend hạn chế"
      ],
      "implementation_risk_analysis": [
        {
          "risk": "Quá trình triển khai từng bước có thể mất nhiều thời gian hơn dự kiến, ảnh hưởng đến deadline 31/12/2024",
          "mitigation_idea": "Chia nhỏ thành các milestone 2 tuần, ưu tiên tính năng có impact cao nhất trước (streak system)",
          "resulting_tradeoff": "Tăng overhead quản lý dự án và có thể phải hy sinh một số tính năng phụ để đảm bảo timeline"
        },
        {
          "risk": "Gamification có thể không hiệu quả với tất cả user segments, đặc biệt là nhóm tuổi 30-45",
          "mitigation_idea": "A/B test các phiên bản gamification khác nhau cho từng segment, có option tắt gamification",
          "resulting_tradeoff": "Tăng độ phức tạp của code và cần thêm thời gian để phân tích dữ liệu A/B test"
        }
      ]
    }
  }' \
| jq '.' 