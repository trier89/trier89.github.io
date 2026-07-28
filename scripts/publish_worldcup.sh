#!/bin/bash
# 상황 선택 월드컵 — 매일 07:00 KST 자동 발행 래퍼 (launchd: com.planfully.worldcup)
# publish_worldcup.py 로 오늘의 1개 주제 생성 → 기존 데일리 방식대로 git commit+push.
cd "$(dirname "$0")/.." || exit 1
export TZ="Asia/Seoul"
export PATH="/Users/minim/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
LOG="scripts/worldcup-cron.log"
# 로그 로테이션: 512KB 넘으면 마지막 400줄만 유지
[ -f "$LOG" ] && [ "$(wc -c < "$LOG")" -gt 524288 ] && tail -n 400 "$LOG" > "$LOG.tmp" && mv "$LOG.tmp" "$LOG"
echo "=== $(date) ===" >> "$LOG"

/usr/bin/python3 scripts/publish_worldcup.py >> "$LOG" 2>&1

# 새로 생성된 월드컵 페이지만 스테이징 후 커밋·푸시 (변경 없으면 skip)
git add content/tests/ >> "$LOG" 2>&1 || true
git diff --cached --quiet || {
    git commit -m "Add situation worldcup test: $(date +%F)" >> "$LOG" 2>&1
    git push origin main >> "$LOG" 2>&1
}
echo "done." >> "$LOG"
