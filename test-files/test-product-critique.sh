#!/bin/bash

# Test product-critique API
echo "Testing product-critique API..."
curl -s -X POST https://zah-2.123c.vn/hackathon/api/responses/product_critique \
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