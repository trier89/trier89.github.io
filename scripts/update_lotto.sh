#!/bin/bash
# 로또 당첨번호 주간 갱신 래퍼 (launchd: com.planfully.lotto)
# 매주 일요일 아침, 토요일 추첨분 최신 회차를 받아 static/data/lotto_history.json 갱신 → git push.
# 결정론적 추천이므로, 데이터가 갱신되면 지난주 "이번주 추천"이 실적표에 자동 편입된다.
cd "$(dirname "$0")/.." || exit 1
export TZ="Asia/Seoul"
export PATH="/Users/minim/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
LOG="scripts/lotto-cron.log"
# 로그 로테이션: 512KB 넘으면 마지막 400줄만 유지
[ -f "$LOG" ] && [ "$(wc -c < "$LOG")" -gt 524288 ] && tail -n 400 "$LOG" > "$LOG.tmp" && mv "$LOG.tmp" "$LOG"
echo "=== $(date) ===" >> "$LOG"

/usr/bin/python3 scripts/update_lotto.py >> "$LOG" 2>&1

# JSON이 실제로 바뀌었을 때만 커밋·푸시
git add static/data/lotto_history.json >> "$LOG" 2>&1 || true
git diff --cached --quiet || {
    git commit -m "로또 당첨번호 데이터 주간 갱신: $(date +%F)" >> "$LOG" 2>&1
    git push origin main >> "$LOG" 2>&1
    echo "pushed." >> "$LOG"
}
echo "done." >> "$LOG"
