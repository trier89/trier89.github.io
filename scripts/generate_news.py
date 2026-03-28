#!/usr/bin/env python3
"""Daily news post generator for planfully-lazy blog."""

import os
import sys
import json
from datetime import datetime, timezone, timedelta
from tavily import TavilyClient

try:
    import anthropic
    HAS_ANTHROPIC = True
except ImportError:
    HAS_ANTHROPIC = False

try:
    import openai
    HAS_OPENAI = True
except ImportError:
    HAS_OPENAI = False

KST = timezone(timedelta(hours=9))


def fetch_news(client):
    """Fetch news from multiple topics with extended content."""
    topics = {
        "AI": "AI artificial intelligence 인공지능 latest news 2026",
        "BIM/스마트건설": "BIM 스마트건설 smart construction 디지털트윈 건설기술 2026",
        "세계": "world news today major international",
        "한국": "한국 뉴스 오늘 주요 사건",
    }

    results = {}
    for category, query in topics.items():
        try:
            response = client.search(
                query=query,
                topic="news",
                max_results=5,
                days=1,
                include_raw_content=False,
            )
            results[category] = response.get("results", [])
        except Exception as e:
            print(f"Error fetching {category}: {e}", file=sys.stderr)
            results[category] = []

    return results


def analyze_with_claude(articles_summary):
    """Use Claude API to generate detailed analysis with two perspectives."""
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key or not HAS_ANTHROPIC:
        return None

    client = anthropic.Anthropic(api_key=api_key)

    prompt = f"""아래 뉴스 기사들을 분석해서 블로그 포스트를 작성해줘.

각 기사에 대해:
1. 기사 내용을 3~5문장으로 상세하게 요약
2. 🔍 시각 A: 긍정적/낙관적 관점에서의 분석 (2~3문장)
3. 🔎 시각 B: 비판적/우려하는 관점에서의 분석 (2~3문장)

반드시 한국어로 작성하고, 전문적이면서도 읽기 쉽게 써줘.
마크다운 형식으로, 각 기사는 **번호. [제목](URL)** 형식을 유지해줘.

카테고리별로 구분하고, BIM/스마트건설 카테고리에 기사가 없으면 "오늘은 관련 기사가 없습니다"라고 써줘.

---
{articles_summary}
---

출력 형식:
### 🤖 AI
**1. [제목](url)**
(상세 요약)
🔍 시각 A: ...
🔎 시각 B: ...

이런 형식으로 모든 카테고리 작성해줘."""

    try:
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=4000,
            messages=[{"role": "user", "content": prompt}],
        )
        return response.content[0].text
    except Exception as e:
        print(f"Claude API error: {e}", file=sys.stderr)
        return None


def analyze_with_openai(articles_summary):
    """Fallback: Use OpenAI API to generate analysis."""
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key or not HAS_OPENAI:
        return None

    client = openai.OpenAI(api_key=api_key)

    prompt = f"""아래 뉴스 기사들을 분석해서 블로그 포스트를 작성해줘.

각 기사에 대해:
1. 기사 내용을 3~5문장으로 상세하게 요약
2. 🔍 시각 A: 긍정적/낙관적 관점에서의 분석 (2~3문장)
3. 🔎 시각 B: 비판적/우려하는 관점에서의 분석 (2~3문장)

반드시 한국어로 작성하고, 전문적이면서도 읽기 쉽게 써줘.
마크다운 형식으로, 각 기사는 **번호. [제목](URL)** 형식을 유지해줘.

카테고리별로 구분하고, BIM/스마트건설 카테고리에 기사가 없으면 "오늘은 관련 기사가 없습니다"라고 써줘.

---
{articles_summary}
---

출력 형식:
### 🤖 AI
**1. [제목](url)**
(상세 요약)
🔍 시각 A: ...
🔎 시각 B: ...

이런 형식으로 모든 카테고리 작성해줘."""

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            max_tokens=4000,
            messages=[{"role": "user", "content": prompt}],
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"OpenAI API error: {e}", file=sys.stderr)
        return None


def prepare_articles_summary(news_data):
    """Prepare a text summary of articles for AI analysis."""
    summary = ""
    for category in ["AI", "BIM/스마트건설", "세계", "한국"]:
        articles = news_data.get(category, [])
        summary += f"\n## 카테고리: {category}\n"
        if not articles:
            summary += "(기사 없음)\n"
            continue
        for i, article in enumerate(articles[:3], 1):
            title = article.get("title", "제목 없음")
            content = article.get("content", article.get("snippet", "내용 없음"))
            url = article.get("url", "")
            summary += f"\n{i}. 제목: {title}\nURL: {url}\n내용: {content[:500]}\n"
    return summary


def build_post(news_data, ai_analysis=None):
    """Build a Hugo markdown post."""
    now = datetime.now(KST)
    date_str = now.strftime("%Y-%m-%d")
    date_display = now.strftime("%Y년 %m월 %d일")
    weekdays = ["월", "화", "수", "목", "금", "토", "일"]
    weekday = weekdays[now.weekday()]

    frontmatter = f"""---
title: "오늘의 뉴스 - {date_display} ({weekday})"
date: {date_str}
description: "AI, 스마트건설, 세계/한국 주요 뉴스 브리핑"
categories:
  - 뉴스
tags:
  - AI
  - 스마트건설
  - 데일리뉴스
---

"""

    body = f"## {date_display} ({weekday}) 뉴스 브리핑\n\n"

    if ai_analysis:
        body += ai_analysis
    else:
        # Fallback: simple format without AI analysis
        section_icons = {"AI": "🤖", "BIM/스마트건설": "🏗️", "세계": "🌍", "한국": "🇰🇷"}
        for category in ["AI", "BIM/스마트건설", "세계", "한국"]:
            articles = news_data.get(category, [])
            icon = section_icons.get(category, "📰")
            body += f"### {icon} {category}\n\n"
            if not articles:
                if category == "BIM/스마트건설":
                    body += "*오늘은 관련 기사가 없습니다.*\n\n"
                continue
            for i, article in enumerate(articles[:3], 1):
                title = article.get("title", "제목 없음")
                snippet = article.get("content", article.get("snippet", ""))
                url = article.get("url", "")
                if len(snippet) > 300:
                    snippet = snippet[:300].rsplit(" ", 1)[0] + "..."
                body += f"**{i}. [{title}]({url})**\n\n{snippet}\n\n"
            body += "---\n\n"

    body += "\n\n---\n\n*이 글은 자동으로 생성된 뉴스 브리핑입니다.*\n"

    return frontmatter + body, date_str


def main():
    tavily_key = os.environ.get("TAVILY_API_KEY")
    if not tavily_key:
        print("TAVILY_API_KEY not set", file=sys.stderr)
        sys.exit(1)

    tavily_client = TavilyClient(api_key=tavily_key)

    # Step 1: Fetch news
    print("Fetching news...", file=sys.stderr)
    news_data = fetch_news(tavily_client)

    # Step 2: Generate AI analysis
    print("Generating analysis...", file=sys.stderr)
    articles_summary = prepare_articles_summary(news_data)

    ai_analysis = analyze_with_claude(articles_summary)
    if not ai_analysis:
        print("Claude unavailable, trying OpenAI...", file=sys.stderr)
        ai_analysis = analyze_with_openai(articles_summary)
    if not ai_analysis:
        print("AI analysis unavailable, using simple format", file=sys.stderr)

    # Step 3: Build post
    post_content, date_str = build_post(news_data, ai_analysis)

    # Step 4: Write file
    blog_root = os.environ.get("BLOG_ROOT", os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    post_dir = os.path.join(blog_root, "content", "post", f"news-{date_str}")
    os.makedirs(post_dir, exist_ok=True)

    post_path = os.path.join(post_dir, "index.md")
    with open(post_path, "w", encoding="utf-8") as f:
        f.write(post_content)

    print(f"Post generated: {post_path}")
    return post_path


if __name__ == "__main__":
    main()
