#!/bin/bash
GA_LOG=/Users/minim/projects/planfully-lazy/scripts/ga/ga-stats.log  # 로그 로테이션(1MB↑ → 마지막 500줄)
[ -f "$GA_LOG" ] && [ "$(wc -c < "$GA_LOG")" -gt 1048576 ] && tail -n 500 "$GA_LOG" > "$GA_LOG.tmp" && mv "$GA_LOG.tmp" "$GA_LOG"

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
