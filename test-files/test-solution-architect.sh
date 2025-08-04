#!/bin/bash

# Test solution-architect API
echo "Testing solution-architect API..."
curl -s -X POST https://zah-2.123c.vn/hackathon/api/responses/solution_architect \
  -H 'Content-Type: application/json' \
  -d '{
    "analysis_board": {
      "product_goal": "Đến 31/12/2024, tăng tỉ lệ người dùng mới còn hoạt động hằng ngày (Day-7 retention) của ứng dụng học tiếng Anh từ 22% lên 35%, được đo trên cohort người dùng cài đặt trong 7 ngày đầu tiên của mỗi tháng.",
      "user_problem_goal": {
        "problem": "Người học tiếng Anh thường khó duy trì thói quen học hàng ngày trong tuần đầu vì quên, thiếu động lực hoặc chưa thấy tiến bộ rõ ràng, dẫn đến bỏ cuộc sớm.",
        "user_goal": "Hoàn thành bài học ngắn mỗi ngày trong 7 ngày đầu để cảm nhận sự tiến bộ rõ rệt và hình thành thói quen học tiếng Anh lâu dài."
      },
      "target_segments": [
        "Người dùng mới (0-7 ngày tuổi) cài đặt lần đầu",
        "Sinh viên & nhân viên văn phòng bận rộn (18-35 tuổi) cần cải thiện tiếng Anh giao tiếp",
        "Người dùng học lại (returning learners) sau ≥30 ngày không hoạt động"
      ],
      "user_insights_data": [
        {
          "insight": "Mốc rủi ro lớn nhất là ngày 2: ~40% người dùng không quay lại sau khi hoàn thành bài học đầu tiên.",
          "evidence": "source_type: ASSUMPTION; source_detail: Nội suy từ đường cong retention điển hình của app giáo dục (Day-2 ≈ 60%, Day-7 ≈ 22%); phù hợp với benchmark ngành."
        },
        {
          "insight": "Gamification (chuỗi ngày học liên tiếp, huy hiệu) có thể tăng Day-7 retention thêm 20-30%.",
          "evidence": "source_type: WEB_SEARCH; source_detail: https://www.sciencedirect.com/science/article/pii/S0360131522002301 (Journal of Educational Technology, 2022) – nghiên cứu về tác động của streak & badge lên sự bám dính người học."
        },
        {
          "insight": "Thông báo đẩy được cá nhân hoá theo giờ học ưa thích cải thiện tỷ lệ mở 1.7× so với thông báo chung.",
          "evidence": "source_type: WEB_SEARCH; source_detail: https://www.localytics.com/blog/personalized-push-study-2023 (Localytics push notification study, 2023)."
        },
        {
          "insight": "Trên các ứng dụng học ngôn ngữ, Day-7 retention trung bình chỉ 17%, xác nhận mức 22% hiện tại của app là khá nhưng vẫn còn nhiều dư địa.",
          "evidence": "source_type: WEB_SEARCH; source_detail: https://www.businessofapps.com/data/app-retention (Business of Apps – App Retention Benchmarks 2023)."
        }
      ],
      "scope": {
        "in_scope": [
          "Cơ chế streak 7 ngày kèm phần thưởng nội dung (XP, huy hiệu)",
          "Thông báo đẩy cá nhân hoá: nhắc lịch học, khen thưởng streak",
          "Onboarding 3 bước giải thích lợi ích streak & mục tiêu 7 ngày",
          "Dashboard tiến độ hiển thị % hoàn thành mục tiêu tuần đầu"
        ],
        "out_scope": [
          "Ra mắt khóa học mới ngoài tiếng Anh",
          "Tính năng học nhóm/đấu giải thời gian thực",
          "Tích hợp thanh toán / gói thuê bao mới",
          "Phát triển nền tảng web song song"
        ],
        "constraints": [
          "Ngân sách phát triển giới hạn trong 2 sprint (4 tuần)",
          "Đội backend chỉ có 1 người → tránh thay đổi cấu trúc dữ liệu phức tạp",
          "Tuân thủ GDPR đối với xử lý dữ liệu hành vi & thông báo đẩy",
          "Hệ thống push hiện tại giới hạn 1 triệu thông báo/ngày"
        ]
      },
      "success_metrics": [
        {
          "name": "Day-7 retention (cohort người dùng mới)",
          "type": "primary",
          "formula": "Số người dùng cài đặt mới có ít nhất một phiên học vào ngày thứ 7 / Tổng số người dùng cài đặt mới",
          "target": "≥35% đến 31/12/2024"
        },
        {
          "name": "Chuỗi ngày học liên tiếp trung bình của người dùng mới",
          "type": "engagement",
          "formula": "Tổng số ngày liên tiếp lớn nhất đạt được của từng người dùng trong 7 ngày đầu / Số người dùng mới",
          "target": "≥4 ngày"
        },
        {
          "name": "Tỉ lệ mở thông báo đẩy (D0-D7)",
          "type": "secondary",
          "formula": "Số lần thông báo được mở / Số thông báo gửi thành công",
          "target": "≥25%"
        },
        {
          "name": "Tỉ lệ hủy nhận thông báo trong 7 ngày đầu",
          "type": "counter",
          "formula": "Số người dùng tắt push / Tổng số người dùng mới",
          "target": "≤5%"
        },
        {
          "name": "Độ trễ gửi thông báo đẩy",
          "type": "ops",
          "formula": "Thời gian trung bình giữa thời điểm lịch gửi dự kiến và thời điểm thông báo tới thiết bị",
          "target": "≤60 giây"
        }
      ]
    }
  }' \
| jq '.' 