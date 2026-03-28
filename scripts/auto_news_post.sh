#!/bin/bash
# Daily news auto-posting script for planfully-lazy blog
# Runs on Mac mini via crontab, uses Claude Max for analysis

set -e

BLOG_ROOT="/Users/minim/projects/planfully-lazy"
SCRIPTS_DIR="$BLOG_ROOT/scripts"
DATE=$(date +%Y-%m-%d)
DATE_DISPLAY=$(date '+%Y년 %m월 %d일')
POST_DIR="$BLOG_ROOT/content/post/news-$DATE"
WEEKDAY=$(python3 -c "import datetime; wd=['월','화','수','목','금','토','일']; print(wd[datetime.date.today().weekday()])")

export TAVILY_API_KEY="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"
export PATH="/Users/minim/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"

LOG_FILE="$SCRIPTS_DIR/news-cron.log"
exec >> "$LOG_FILE" 2>&1
echo "=== $(date) ==="

# Skip if already posted today
if [ -f "$POST_DIR/index.md" ]; then
    echo "Already posted today, skipping."
    exit 0
fi

# Step 1: Fetch news via Tavily (Python)
echo "Fetching news..."
python3 "$SCRIPTS_DIR/fetch_news.py" > "/tmp/news_raw_$DATE.json"

# Step 2: Use Claude CLI (Max) to generate blog post
echo "Generating analysis with Claude..."
NEWS_DATA=$(cat "/tmp/news_raw_$DATE.json")

mkdir -p "$POST_DIR"

claude --print -p "아래 뉴스 데이터를 블로그 포스트로 작성해줘. Hugo 마크다운 형식으로 출력해.

규칙:
1. 맨 처음에 Hugo 프론트매터:
---
title: \"오늘의 뉴스 - ${DATE_DISPLAY} (${WEEKDAY})\"
date: ${DATE}
description: \"AI, 스마트건설, 세계/한국 주요 뉴스 브리핑\"
categories:
  - 뉴스
tags:
  - AI
  - 스마트건설
  - 데일리뉴스
---

2. 카테고리 순서: 🤖 AI → 🏗️ BIM/스마트건설 → 🌍 세계 → 🇰🇷 한국(정치/사회/경제/사건사고를 소제목으로)
3. 각 기사마다:
   - 3~5문장으로 상세하게 요약
   - 🔍 시각 A: 긍정적/낙관적 관점 (2~3문장)
   - 🔎 시각 B: 비판적/우려하는 관점 (2~3문장)
4. 기사 제목은 원문 링크 포함: **번호. [제목](URL)**
5. BIM/스마트건설: 신기술, 국내 도입, 주요 건설사 현황 중심. 관련 기사가 없으면 해당 섹션 생략
6. 세계뉴스: 중복 뉴스 지양, 다양한 지역/주제
7. 한국 뉴스: 정치, 사회, 경제, 사건사고로 구분해서 소제목
8. 맨 마지막에 '---' 후 '*이 글은 자동으로 생성된 뉴스 브리핑입니다.*' 추가
9. 한국어로 작성, 전문적이면서도 읽기 쉽게
10. 프론트매터와 본문만 출력. 다른 설명 없이.

뉴스 데이터:
${NEWS_DATA}" > "$POST_DIR/index.md"

# Step 3: Git commit and push
echo "Pushing to GitHub..."
cd "$BLOG_ROOT"
git add "content/post/news-$DATE/"
git commit -m "Add daily news: $DATE"
git push

echo "Done! Post published: news-$DATE"
rm -f "/tmp/news_raw_$DATE.json"
