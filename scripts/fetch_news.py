#!/usr/bin/env python3
"""Fetch news from Tavily + Google News RSS. Deduplicates against previous posts."""

import json
import os
import sys
import glob
import re
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
from tavily import TavilyClient

KST = timezone(timedelta(hours=9))


def get_previous_urls(blog_root):
    """Extract URLs from previous news posts to avoid duplicates."""
    urls = set()
    news_dirs = sorted(glob.glob(os.path.join(blog_root, "content/post/news-*")))
    for news_dir in news_dirs[-3:]:
        index_path = os.path.join(news_dir, "index.md")
        if os.path.exists(index_path):
            with open(index_path, "r", encoding="utf-8") as f:
                content = f.read()
                found = re.findall(r'\[.*?\]\((https?://[^\)]+)\)', content)
                urls.update(found)
    return urls


def fetch_google_news_rss(query, num=5):
    """Fetch news from Google News RSS feed."""
    articles = []
    try:
        encoded = urllib.parse.quote(query)
        url = f"https://news.google.com/rss/search?q={encoded}&hl=ko&gl=KR&ceid=KR:ko"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            tree = ET.parse(resp)
            root = tree.getroot()
            for item in root.iter("item"):
                title = item.find("title")
                link = item.find("link")
                desc = item.find("description")
                if title is not None and link is not None:
                    articles.append({
                        "title": title.text or "",
                        "url": link.text or "",
                        "content": (desc.text or "")[:500] if desc is not None else "",
                    })
                if len(articles) >= num:
                    break
    except Exception as e:
        print(f"  Google News RSS error for '{query}': {e}", file=sys.stderr)
    return articles


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

    kr_domains = ["정치", "사회", "사건사고", "스마트건설"]

    # Tavily queries
    tavily_topics = {
        "AI": "new AI model release LLM 새 언어모델 출시 breakthrough 2026",
        "스마트건설": "한국 스마트건설 BIM 디지털트윈 건설기술 신기술 국내 건설사 2026",
        "세계": "top headlines world news today breaking major",
        "정치": "South Korea politics news today 한국 정치",
        "경제": "economy stock market news today global 경제 증시",
        "사회": "South Korea society news today 한국 사회",
        "사건사고": "South Korea accident crime incident news 한국 사건사고",
    }

    # Google News RSS queries (한국어 — 국내 뉴스 보강용)
    google_topics = {
        "정치": "한국 정치 오늘",
        "경제": "경제 증시 오늘",
        "사회": "한국 사회 이슈 오늘",
        "사건사고": "한국 사건 사고 오늘",
        "세계": "국제 뉴스 오늘 속보",
    }

    results = {}

    # 1. Tavily로 기본 수집
    for category, query in tavily_topics.items():
        try:
            response = client.search(
                query=query,
                topic="news",
                max_results=15,
                days=2 if category in kr_domains else 1,
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
            print(f"Error fetching {category} from Tavily: {e}", file=sys.stderr)
            results[category] = []

    # 2. Google News RSS로 보강 (국내 뉴스 커버리지 강화)
    for category, query in google_topics.items():
        print(f"  Fetching Google News for '{category}'...", file=sys.stderr)
        google_articles = fetch_google_news_rss(query, num=5)

        existing_titles = {a["title"] for a in results.get(category, [])}
        existing_urls = {a["url"] for a in results.get(category, [])}

        for article in google_articles:
            url = article["url"]
            title = article["title"]
            if url in previous_urls or url in existing_urls:
                continue
            # 제목 유사도 간단 체크 (똑같은 제목 방지)
            if title in existing_titles:
                continue
            results.setdefault(category, []).append(article)

        # 각 카테고리 최대 8개로 제한
        results[category] = results.get(category, [])[:8]

    print(json.dumps(results, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
