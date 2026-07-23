#!/bin/bash
# 시간당 GA4 방문자 통계 → static/stats.json → 커밋/푸시 (홈 배지 갱신)
export HOME=/Users/minim
export PATH="/Users/minim/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"
cd /Users/minim/projects/planfully-lazy || exit 1
/usr/bin/python3 scripts/ga/ga_stats.py >> scripts/ga/ga-stats.log 2>&1 || exit 0
git add static/stats.json >> scripts/ga/ga-stats.log 2>&1
if ! git diff --cached --quiet; then
  git commit -q -m "방문자 통계 갱신 $(date '+%m-%d %H:%M')" >> scripts/ga/ga-stats.log 2>&1
  git push origin main -q >> scripts/ga/ga-stats.log 2>&1
fi
