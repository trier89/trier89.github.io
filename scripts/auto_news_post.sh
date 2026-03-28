#!/bin/bash
# Daily news auto-posting script for planfully-lazy blog
# Runs on Mac mini via crontab, uses Claude Max for analysis

BLOG_ROOT="/Users/minim/projects/planfully-lazy"
SCRIPTS_DIR="$BLOG_ROOT/scripts"
DATE=$(date +%Y-%m-%d)
DATE_DISPLAY=$(date '+%Y년 %m월 %d일')
POST_DIR="$BLOG_ROOT/content/post/news-$DATE"
PYTHON="/usr/bin/python3"
WEEKDAY=$($PYTHON -c "import datetime; wd=['월','화','수','목','금','토','일']; print(wd[datetime.date.today().weekday()])")

export TAVILY_API_KEY="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"
export PATH="/Users/minim/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"

LOG_FILE="$SCRIPTS_DIR/news-cron.log"
echo "=== $(date) ===" >> "$LOG_FILE"

# Skip if already posted today
if [ -f "$POST_DIR/index.md" ]; then
    echo "Already posted today, skipping." >> "$LOG_FILE"
    exit 0
fi

# Step 1: Fetch news via Tavily (Python)
echo "Fetching news..." >> "$LOG_FILE"
$PYTHON "$SCRIPTS_DIR/fetch_news.py" > "/tmp/news_raw_$DATE.json" 2>> "$LOG_FILE"

if [ ! -s "/tmp/news_raw_$DATE.json" ]; then
    echo "ERROR: News fetch failed or empty." >> "$LOG_FILE"
    exit 1
fi

# Step 2: Build prompt file
echo "Generating analysis with Claude..." >> "$LOG_FILE"

cat > "/tmp/news_prompt_$DATE.txt" << PROMPT_EOF
아래 뉴스 데이터를 기반으로 마크다운 텍스트를 생성해줘. 파일 저장이나 도구 사용 없이, 순수 텍스트만 출력해.

출력할 마크다운 전체 내용:

맨 처음에 이 프론트매터를 그대로 넣어:
---
title: "오늘의 뉴스 - ${DATE_DISPLAY} (${WEEKDAY})"
date: ${DATE}
description: "AI, 스마트건설, 세계/국내 주요 뉴스 브리핑"
categories:
  - 뉴스
tags:
  - AI
  - 스마트건설
  - 데일리뉴스
---

그 다음 본문 작성 규칙:
- 카테고리 순서: 🤖 AI → 🏗️ 스마트건설 → 🌍 세계 → 🇰🇷 국내(정치/사회/경제/사건사고를 소제목으로)
- 각 기사마다: 3~5문장 상세 요약 + 🔍 시각 A (긍정적 관점 2~3문장) + 🔎 시각 B (비판적 관점 2~3문장)
- 기사 제목에 원문 링크 포함: **번호. [제목](URL)**
- AI: 새로 출시된 언어모델이나 획기적인 AI 기술/방식에 관한 기사만 포함. 해당 기사가 없으면 섹션 생략
- 스마트건설: 한국 국내 기사만 포함 (BIM, 디지털트윈, 스마트건설 신기술, 주요 건설사 현황). 관련 기사 없으면 섹션 생략
- 세계뉴스: 중복 지양
- 국내: 정치/사회/경제/사건사고 소제목으로 구분. 사건사고는 국내 사건만 포함
- 마지막에 --- 후 *이 글은 자동으로 생성된 뉴스 브리핑입니다.*
- 한국어, 전문적이면서 읽기 쉽게
- 프론트매터와 본문만 출력할 것. 설명이나 코드블록 없이 순수 마크다운만.

뉴스 데이터:
$(cat /tmp/news_raw_$DATE.json)
PROMPT_EOF

mkdir -p "$POST_DIR"

claude --print -p "$(cat /tmp/news_prompt_$DATE.txt)" > "$POST_DIR/index.md" 2>> "$LOG_FILE"

if [ ! -s "$POST_DIR/index.md" ]; then
    echo "ERROR: Claude output empty." >> "$LOG_FILE"
    rm -rf "$POST_DIR"
    exit 1
fi

# Step 3: Git commit and push
echo "Pushing to GitHub..." >> "$LOG_FILE"
cd "$BLOG_ROOT"
git add "content/post/news-$DATE/" >> "$LOG_FILE" 2>&1
git commit -m "Add daily news: $DATE" >> "$LOG_FILE" 2>&1
git push >> "$LOG_FILE" 2>&1

echo "Done! Post published: news-$DATE" >> "$LOG_FILE"
rm -f "/tmp/news_raw_$DATE.json" "/tmp/news_prompt_$DATE.txt"
