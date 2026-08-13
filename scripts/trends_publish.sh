#!/bin/bash
# 검색 트렌드 17:30 발행 (2026-07-21 사용자 "퇴근 직전에 올리는 게 좋겠어")
# 2026-08-13: 콘텐츠는 planfully-daily로 발행 → Cloudflare Pages 배포 (애드센스 분리)
cd "$(dirname "$0")/.." || exit 1
export PF_CONTENT_ROOT="/Users/minim/projects/planfully-daily"
LOG="scripts/trends-cron.log"
echo "=== $(date) ===" >> "$LOG"
/usr/bin/python3 scripts/daily_trends.py >> "$LOG" 2>&1
"$PF_CONTENT_ROOT/deploy.sh" >> "$LOG" 2>&1
