#!/usr/bin/env python3
"""Fetch news from Tavily and output as JSON. Deduplicates against previous day's post."""

import json
import os
import sys
import glob
import re
from datetime import datetime, timedelta, timezone
from tavily import TavilyClient

KST = timezone(timedelta(hours=9))


def get_previous_urls(blog_root):
    """Extract URLs from previous news posts to avoid duplicates."""
    urls = set()
    news_dirs = sorted(glob.glob(os.path.join(blog_root, "content/post/news-*")))
    # Check last 3 days of posts
    for news_dir in news_dirs[-3:]:
        index_path = os.path.join(news_dir, "index.md")
        if os.path.exists(index_path):
            with open(index_path, "r", encoding="utf-8") as f:
                content = f.read()
                found = re.findall(r'\[.*?\]\((https?://[^\)]+)\)', content)
                urls.update(found)
    return urls


def main():
    api_key = os.environ.get("TAVILY_API_KEY")
    if not api_key:
        print("TAVILY_API_KEY not set", file=sys.stderr)
        sys.exit(1)

    blog_root = os.environ.get("BLOG_ROOT",
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

    client = TavilyClient(api_key=api_key)
    previous_urls = get_previous_urls(blog_root)

    if previous_urls:
        print(f"Found {len(previous_urls)} previous URLs to deduplicate", file=sys.stderr)

    topics = {
        "AI": "new AI model release LLM 새 언어모델 출시 breakthrough 2026",
        "스마트건설": "한국 스마트건설 BIM 디지털트윈 건설기술 신기술 국내 건설사 2026",
        "세계": "world news today major international breaking",
        "정치": "한국 정치 뉴스 오늘 국회 대통령",
        "경제": "경제 뉴스 오늘 증시 기업 글로벌",
        "사회": "한국 사회 뉴스 오늘",
        "사건사고": "한국 국내 사건 사고 뉴스 오늘",
    }

    results = {}
    for category, query in topics.items():
        try:
            response = client.search(
                query=query,
                topic="news",
                max_results=15,
                days=1,
            )
            articles = []
            for r in response.get("results", []):
                url = r.get("url", "")
                if url in previous_urls:
                    print(f"  Skipping duplicate: {r.get('title', '')[:50]}", file=sys.stderr)
                    continue
                articles.append({
                    "title": r.get("title", ""),
                    "url": url,
                    "content": r.get("content", r.get("snippet", ""))[:500],
                })
                if len(articles) >= 5:
                    break
            results[category] = articles
        except Exception as e:
            print(f"Error fetching {category}: {e}", file=sys.stderr)
            results[category] = []

    print(json.dumps(results, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
