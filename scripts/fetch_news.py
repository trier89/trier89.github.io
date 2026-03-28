#!/usr/bin/env python3
"""Fetch news from Tavily and output as JSON."""

import json
import os
import sys
from tavily import TavilyClient


def main():
    api_key = os.environ.get("TAVILY_API_KEY")
    if not api_key:
        print("TAVILY_API_KEY not set", file=sys.stderr)
        sys.exit(1)

    client = TavilyClient(api_key=api_key)

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
                max_results=5,
                days=1,
            )
            articles = []
            for r in response.get("results", [])[:3]:
                articles.append({
                    "title": r.get("title", ""),
                    "url": r.get("url", ""),
                    "content": r.get("content", r.get("snippet", ""))[:500],
                })
            results[category] = articles
        except Exception as e:
            print(f"Error fetching {category}: {e}", file=sys.stderr)
            results[category] = []

    print(json.dumps(results, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
