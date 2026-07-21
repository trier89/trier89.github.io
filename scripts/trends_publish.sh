#!/bin/bash
# 검색 트렌드 17:30 발행 (2026-07-21 사용자 "퇴근 직전에 올리는 게 좋겠어")
cd "$(dirname "$0")/.." || exit 1
LOG="scripts/trends-cron.log"
echo "=== $(date) ===" >> "$LOG"
/usr/bin/python3 scripts/daily_trends.py >> "$LOG" 2>&1
git add content/post/trends-* >> "$LOG" 2>&1 || true
git diff --cached --quiet || { git commit -m "Add search trends: $(date +%F)" >> "$LOG" 2>&1; git push >> "$LOG" 2>&1; }
