#!/usr/bin/env python3
"""오늘의 검색 트렌드 자동 포스트 (2026-07-21 사용자 "구글 검색 내용 주기적으로 긁어서 올리자").
구글 트렌드 KR RSS(무료·무키)에서 실시간 인기 검색어 + 동봉된 관련 기사를 수집.
가드레일(무날조 원칙): 해설은 RSS 동봉 기사 제목/출처만 사용 — 자체 추측·서사 금지.
사람 이름 단독 키워드(연예인·사건 인물 가능성)는 기사 제목만 붙이고 코멘트 없음.
출력: content/post/trends-YYYYMMDD/index.md (있으면 skip)
"""
import re, datetime, urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

BLOG = Path(__file__).resolve().parent.parent
RSS = "https://trends.google.com/trending/rss?geo=KR"
NS = {"ht": "https://trends.google.com/trending/rss"}
UA = {"User-Agent": "Mozilla/5.0 (planfully-lazy blog)"}


def main():
    now = datetime.date.today()
    slug = f"trends-{now:%Y%m%d}"
    post_dir = BLOG / "content" / "post" / slug
    if (post_dir / "index.md").exists():
        print(f"skip: {slug} exists"); return

    req = urllib.request.Request(RSS, headers=UA)
    xml = urllib.request.urlopen(req, timeout=30).read()
    root = ET.fromstring(xml)
    items = []
    for it in root.iter("item"):
        kw = (it.findtext("title") or "").strip()
        if not kw:
            continue
        traffic = (it.findtext("ht:approx_traffic", namespaces=NS) or "").strip()
        news = []
        for n in it.findall("ht:news_item", NS):
            t = (n.findtext("ht:news_item_title", namespaces=NS) or "").strip()
            u = (n.findtext("ht:news_item_url", namespaces=NS) or "").strip()
            src = (n.findtext("ht:news_item_source", namespaces=NS) or "").strip()
            if t and u:
                news.append({"title": t, "url": u, "src": src})
        items.append({"kw": kw, "traffic": traffic, "news": news[:2]})
    if len(items) < 3:
        print("트렌드 항목 부족 — 발행 스킵"); return
    items = items[:10]

    md = [f"""---
title: "오늘 사람들이 검색한 것 — {now.month}월 {now.day}일 검색 트렌드"
date: {now:%Y-%m-%d}T17:30:00+09:00
categories: ["뉴스"]
tags: ["검색 트렌드", "실시간 검색어", "구글 트렌드", "{now.month}월 {now.day}일"]
---

{now.month}월 {now.day}일, 오늘 구글에서 검색량이 급상승한 키워드들입니다. 무엇이 화제인지 관련 기사와 함께 정리했어요.
"""]
    for i, e in enumerate(items, 1):
        tr = f" `검색 {e['traffic']}`" if e["traffic"] else ""
        md.append(f"### {i}. {e['kw']}{tr}\n")
        if e["news"]:
            for n in e["news"]:
                src = f" — {n['src']}" if n["src"] else ""
                md.append(f"- [{n['title']}]({n['url']}){src}")
        else:
            md.append("- 관련 기사가 아직 잡히지 않은 키워드예요.")
        md.append("")
    md.append("""---

📌 검색 트렌드는 구글 트렌드(대한민국) 기준이며, 관련 기사는 구글이 매칭한 언론사 링크입니다.

🎂 오늘의 역사와 생일 유명인은 → [오늘 무슨 일이 있었을까?](/categories/오늘의-역사/)
🔢 만 나이·정년 계산은 → [만나이 계산기](/tools/age-calculator/)
""")
    post_dir.mkdir(parents=True, exist_ok=True)
    (post_dir / "index.md").write_text("\n".join(md))
    print(f"created: {slug} ({len(items)} keywords)")


if __name__ == "__main__":
    main()
