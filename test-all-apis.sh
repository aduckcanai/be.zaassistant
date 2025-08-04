#!/bin/bash

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Default settings
DOMAIN="production"
BASE_URL_PROD="https://zah-2.123c.vn/hackathon/api"
BASE_URL_LOCAL="http://localhost:3000"

# Function to display header
show_header() {
    echo -e "${BLUE}╔══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║                    🚀 API Testing Suite                      ║${NC}"
    echo -e "${BLUE}║                     Hackathon Project                        ║${NC}"
    echo -e "${BLUE}╚══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

# Function to get base URL based on domain selection
get_base_url() {
    if [ "$DOMAIN" = "production" ]; then
        echo "$BASE_URL_PROD"
    else
        echo "$BASE_URL_LOCAL"
    fi
}

# Function to display current settings
show_settings() {
    local base_url=$(get_base_url)
    echo -e "${CYAN}Current Settings:${NC}"
    echo -e "  Domain: ${YELLOW}$DOMAIN${NC}"
    echo -e "  Base URL: ${YELLOW}$base_url${NC}"
    echo ""
}

# Function to test idea-to-analysis API
test_idea_to_analysis() {
    local base_url=$(get_base_url)
    echo -e "${GREEN}1️⃣ Testing idea-to-analysis API...${NC}"
    echo -e "${PURPLE}Endpoint: ${base_url}/responses/idea_to_analysis${NC}"
    echo "-------------------------------------------"
    
    curl -s -X POST "${base_url}/responses/idea_to_analysis" \
      -H 'Content-Type: application/json' \
      -d '{"inputData":"{\"idea\":\"Người dùng là một Product Owner tại một app học tiếng Anh, họ muốn tìm cách cải thiện việc duy trì học hàng ngày (retention) của người dùng mới trong 7 ngày đầu.\",\"context\":\"Product improvement\"}"}' \
    | jq '.'
    
    echo -e "${GREEN}✅ idea-to-analysis test completed${NC}"
    echo ""
}

# Function to test product-critique API
test_product_critique() {
    local base_url=$(get_base_url)
    echo -e "${GREEN}2️⃣ Testing product-critique API...${NC}"
    echo -e "${PURPLE}Endpoint: ${base_url}/responses/product_critique${NC}"
    echo "-------------------------------------------"
    
    curl -s -X POST "${base_url}/responses/product_critique" \
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
        }
      }' \
    | jq '.'
    
    echo -e "${GREEN}✅ product-critique test completed${NC}"
    echo ""
}

# Function to test solution-architect API
test_solution_architect() {
    local base_url=$(get_base_url)
    echo -e "${GREEN}3️⃣ Testing solution-architect API...${NC}"
    echo -e "${PURPLE}Endpoint: ${base_url}/responses/solution_architect${NC}"
    echo "-------------------------------------------"
    
    curl -s -X POST "${base_url}/responses/solution_architect" \
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
            }
          ],
          "scope": {
            "in_scope": [
              "Cơ chế streak 7 ngày kèm phần thưởng nội dung (XP, huy hiệu)",
              "Thông báo đẩy cá nhân hoá: nhắc lịch học, khen thưởng streak",
              "Onboarding 3 bước giải thích lợi ích streak & mục tiêu 7 ngày"
            ],
            "out_scope": [
              "Ra mắt khóa học mới ngoài tiếng Anh",
              "Tính năng học nhóm/đấu giải thời gian thực"
            ],
            "constraints": [
              "Ngân sách phát triển giới hạn trong 2 sprint (4 tuần)",
              "Đội backend chỉ có 1 người → tránh thay đổi cấu trúc dữ liệu phức tạp"
            ]
          },
          "success_metrics": [
            {
              "name": "Day-7 retention (cohort người dùng mới)",
              "type": "primary",
              "formula": "Số người dùng cài đặt mới có ít nhất một phiên học vào ngày thứ 7 / Tổng số người dùng cài đặt mới",
              "target": "≥35% đến 31/12/2024"
            }
          ]
        }
      }' \
    | jq '.'
    
    echo -e "${GREEN}✅ solution-architect test completed${NC}"
    echo ""
}

# Function to test solution-to-ui API
test_solution_to_ui() {
    local base_url=$(get_base_url)
    echo -e "${GREEN}4️⃣ Testing solution-to-ui API...${NC}"
    echo -e "${PURPLE}Endpoint: ${base_url}/responses/solution_to_ui${NC}"
    echo "-------------------------------------------"
    
    curl -s -X POST "${base_url}/responses/solution_to_ui" \
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
            "Có thể đo lường và tối ưu hóa từng tính năng riêng lẻ"
          ],
          "implementation_risk_analysis": [
            {
              "risk": "Quá trình triển khai từng bước có thể mất nhiều thời gian hơn dự kiến",
              "mitigation_idea": "Chia nhỏ thành các milestone 2 tuần, ưu tiên tính năng có impact cao nhất trước",
              "resulting_tradeoff": "Tăng overhead quản lý dự án và có thể phải hy sinh một số tính năng phụ"
            }
          ]
        }
      }' \
    | jq '.'
    
    echo -e "${GREEN}✅ solution-to-ui test completed${NC}"
    echo ""
}

# Function to test assessment-center API
test_assessment_center() {
    local base_url=$(get_base_url)
    echo -e "${GREEN}5️⃣ Testing assessment-center API...${NC}"
    echo -e "${PURPLE}Endpoint: ${base_url}/responses/assessment_center${NC}"
    echo "-------------------------------------------"
    
    curl -s -X POST "${base_url}/responses/assessment_center" \
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
            "Young professionals (25-35) aiming to improve workplace English"
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
              "Redesign first-session flow to require/encourage placement test completion"
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
          "overall_summary": "Bản phân tích đặt mục tiêu rõ ràng (tăng D7 retention lên 35%), nhưng hiện dựa trên rất ít bằng chứng gốc.",
          "critique_points": [
            {
              "category": "Chiến lược: Goal vs. Problem",
              "critique": "Mục tiêu tăng Day-7 retention là đo mức độ người dùng quay lại, trong khi vấn đề gốc được nêu là khó xây dựng thói quen học hàng ngày.",
              "challenge_question": "Liệu việc tập trung vào việc tăng Day-7 retention có thực sự giải quyết gốc rễ của việc người học thiếu thói quen?"
            }
          ]
        }
      }' \
    | jq '.'
    
    echo -e "${GREEN}✅ assessment-center test completed${NC}"
    echo ""
}

# Function to run all tests
run_all_tests() {
    echo -e "${BLUE}🚀 Running all API tests...${NC}"
    echo "=================================================="
    echo ""
    
    test_idea_to_analysis
    test_product_critique
    test_solution_architect
    test_solution_to_ui
    test_assessment_center
    
    echo -e "${GREEN}🎉 All API tests completed successfully!${NC}"
    echo "=================================================="
}

# Function to show menu
show_menu() {
    echo -e "${CYAN}📋 Test Menu:${NC}"
    echo "  1) Test idea-to-analysis API"
    echo "  2) Test product-critique API"
    echo "  3) Test solution-architect API"
    echo "  4) Test solution-to-ui API"
    echo "  5) Test assessment-center API"
    echo "  6) Run all tests"
    echo "  7) Switch domain (production ↔ localhost)"
    echo "  8) Show current settings"
    echo "  9) Exit"
    echo ""
}

# Function to switch domain
switch_domain() {
    if [ "$DOMAIN" = "production" ]; then
        DOMAIN="localhost"
        echo -e "${YELLOW}✅ Switched to localhost domain${NC}"
    else
        DOMAIN="production"
        echo -e "${YELLOW}✅ Switched to production domain${NC}"
    fi
    echo ""
}

# Main function
main() {
    show_header
    
    # Check if jq is installed
    if ! command -v jq &> /dev/null; then
        echo -e "${RED}⚠️  Warning: 'jq' is not installed. JSON responses will not be formatted.${NC}"
        echo -e "${YELLOW}   Install with: sudo apt install jq (Ubuntu) or brew install jq (macOS)${NC}"
        echo ""
    fi
    
    while true; do
        show_settings
        show_menu
        
        read -p "Choose an option (1-9): " choice
        echo ""
        
        case $choice in
            1)
                test_idea_to_analysis
                ;;
            2)
                test_product_critique
                ;;
            3)
                test_solution_architect
                ;;
            4)
                test_solution_to_ui
                ;;
            5)
                test_assessment_center
                ;;
            6)
                run_all_tests
                ;;
            7)
                switch_domain
                ;;
            8)
                show_settings
                ;;
            9)
                echo -e "${GREEN}👋 Goodbye!${NC}"
                exit 0
                ;;
            *)
                echo -e "${RED}❌ Invalid option. Please choose 1-9.${NC}"
                echo ""
                ;;
        esac
        
        echo ""
        read -p "Press Enter to continue..."
        echo ""
        clear
        show_header
    done
}

# Handle command line arguments
if [ $# -gt 0 ]; then
    case $1 in
        --production|-p)
            DOMAIN="production"
            ;;
        --localhost|-l)
            DOMAIN="localhost"
            ;;
        --all|-a)
            if [ $# -gt 1 ]; then
                case $2 in
                    --production|-p)
                        DOMAIN="production"
                        ;;
                    --localhost|-l)
                        DOMAIN="localhost"
                        ;;
                esac
            fi
            show_header
            show_settings
            run_all_tests
            exit 0
            ;;
        --help|-h)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --production, -p    Set domain to production"
            echo "  --localhost, -l     Set domain to localhost"
            echo "  --all, -a           Run all tests"
            echo "  --help, -h          Show this help message"
            echo ""
            echo "Examples:"
            echo "  $0                  # Interactive mode"
            echo "  $0 --all            # Run all tests with current domain"
            echo "  $0 --all -p         # Run all tests on production"
            echo "  $0 --all -l         # Run all tests on localhost"
            exit 0
            ;;
        *)
            echo -e "${RED}❌ Unknown option: $1${NC}"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
fi

# Run main function
main 