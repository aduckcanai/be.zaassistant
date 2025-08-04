#!/bin/bash

# Test assessment-center API with complex analysis_board and product_critique data
echo "Testing assessment-center API with complex data..."
curl -s -X POST https://zah-2.123c.vn/hackathon/api/responses/assessment_center \
  -H 'Content-Type: application/json' \
  -d '{
    "analysis_board": {
      "product_goal": "Increase Day-7 retention of new users of the English-learning app from 22% to 35% by 31 Dec 2024 through improvements in onboarding, gamification and personalized reminders.",
      "user_problem_goal": {
        "problem": "Learners struggle to build a consistent daily study habit during their first week, leading to early drop-off and loss of motivation.",
        "user_goal": "I want an easy, motivating way to practice English every day so that I can improve my skills without breaking my routine."
      },
      "target_segments": [
        "University students (18-24) preparing for TOEIC/IELTS",
        "Young professionals (25-35) aiming to improve workplace English",
        "Busy parents (30-45) who have limited study time and prefer micro-learning sessions"
      ],
      "user_insights_data": [
        {
          "insight": "Completing a placement test in the very first session correlates with ~30% higher Day-7 retention.",
          "evidence": "Duolingo 2022 Impact Report showed 33% D7 retention for users who finished the test versus 25% for those who skipped.",
          "source_type": "WEB_SEARCH",
          "source_detail": "https://s22.q4cdn.com/176942736/files/doc_financials/2022/ar/Duolingo-2022-Impact-Report.pdf"
        }
      ],
      "scope": {
        "in_scope": [
          "Redesign first-session flow to require/encourage placement test completion",
          "Introduce or enhance daily streak and badge system with streak-freeze reward"
        ],
        "out_scope": [
          "Overhaul of core curriculum or lesson content depth"
        ],
        "constraints": [
          "Mobile engineering capacity limited to two sprints per quarter"
        ]
      },
      "success_metrics": [
        {
          "name": "Day-7 new-user retention rate",
          "type": "primary",
          "formula": "Percentage of users who installed the app on Day 0 and launch at least one learning session on Day 7",
          "target": "≥35%"
        }
      ]
    },
    "product_critique": {
      "overall_summary": "Bản phân tích đặt mục tiêu rõ ràng (tăng D7 retention lên 35%), nhưng hiện dựa trên rất ít bằng chứng gốc, một chỉ số thành công duy nhất và một phạm vi thực thi khá hạn chế. Nhiều luận điểm then chốt (ví dụ: ép hoàn thành placement test, gamification) chỉ mới chứng minh tính tương quan, chưa chứng minh tính nhân-quả.",
      "critique_points": [
        {
          "category": "Chiến lược: Goal vs. Problem",
          "critique": "Mục tiêu tăng Day-7 retention là đo mức độ người dùng quay lại, trong khi vấn đề gốc được nêu là khó xây dựng thói quen học hàng ngày.",
          "challenge_question": "Liệu việc tập trung vào việc tăng Day-7 retention có thực sự giải quyết gốc rễ của việc người học thiếu thói quen?"
        },
        {
          "category": "Chiến lược: Goal vs. Metrics",
          "critique": "Chỉ có duy nhất chỉ số Day-7 retention. Nếu đẩy mạnh thông báo hoặc tặng thưởng để kéo người dùng mở app 1 lần vào ngày 7, chỉ số sẽ xanh nhưng người dùng có thể không học hoặc cảm thấy bị làm phiền.",
          "challenge_question": "Giả sử Day-7 retention đạt 35% nhờ thông báo liên tục, nhưng NPS và lượng bài học hoàn thành lại giảm thì sao?"
        }
      ]
    }
  }' \
| jq '.' 