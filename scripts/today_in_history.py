#!/usr/bin/env python3
"""오늘의 역사 자동 포스트 (2026-07-21 사용자 "오늘 무슨 일이 있었을까? 매일 올려줘").
한국어 위키백과 날짜 문서(사건/탄생)를 파싱, 탄생인물은 최근 60일 문서 조회수로 유명한 순 랭킹.
/tools/my-birthday/ 와 같은 데이터 소스 — 포스트 하단에 도구 링크로 상호 유입.
출력: content/post/today-YYYYMMDD/index.md (이미 있으면 skip, 재실행 안전)
"""
import re, json, datetime, urllib.request, urllib.parse
from pathlib import Path

BLOG = Path(__file__).resolve().parent.parent
API = "https://ko.wikipedia.org/w/api.php"
UA = {"User-Agent": "planfully-lazy-blog/1.0 (daily history post)"}


def api(params):
    q = urllib.parse.urlencode({**params, "format": "json"})
    req = urllib.request.Request(f"{API}?{q}", headers=UA)
    return json.loads(urllib.request.urlopen(req, timeout=30).read())


def clean_wiki(t):
    t = re.sub(r"<ref[^>]*/>", "", t)
    t = re.sub(r"<ref[\s\S]*?</ref>", "", t)
    t = re.sub(r"\{\{[\s\S]*?\}\}", "", t)
    t = re.sub(r"\[\[(?:[^\]|]*\|)?([^\]]+)\]\]", r"\1", t)
    t = re.sub(r"'''?", "", t)
    t = re.sub(r"<[^>]+>", "", t)
    return t.strip()


def parse_section(wt, name):
    m = re.search(rf"==\s*{name}\s*==\n([\s\S]*?)(?:\n==|$)", wt)
    if not m:
        return []
    out, cur = [], None
    for line in m.group(1).split("\n"):
        one = re.match(r"^\*\s*\[\[(\d{3,4})년\]\]\s*[-–—]\s*(.+)", line)
        yr_only = re.match(r"^\*\s*\[\[(\d{3,4})년\]\]\s*$", line)
        sub = re.match(r"^\*\*\s*(.+)", line)
        body = None
        if one:
            cur = int(one.group(1)); body = one.group(2); year = cur
        elif yr_only:
            cur = int(yr_only.group(1)); continue
        elif sub and cur:
            body = sub.group(1); year = cur
        else:
            continue
        title = None
        for lm in re.finditer(r"\[\[([^\]|]+)(?:\|[^\]]*)?\]\]", body):
            if not re.match(r"^\d+년|^\d+월|^\d+일", lm.group(1)):
                title = lm.group(1); break
        txt = re.sub(r"[.。]\s*$", "", clean_wiki(body))
        if txt:
            out.append({"year": year, "text": txt, "title": title})
    return out


def fetch_views(titles):
    views = {}
    for i in range(0, len(titles), 50):
        chunk = titles[i:i+50]
        cont, n = {}, 0
        while n < 7:
            j = api({"action": "query", "origin": "*", "prop": "pageviews",
                     "redirects": 1, "titles": "|".join(chunk), **cont})
            q = j.get("query", {})
            rd = {r["from"]: r["to"] for r in q.get("redirects", [])}
            for pg in q.get("pages", {}).values():
                tot = sum(v for v in (pg.get("pageviews") or {}).values() if v)
                views[pg["title"]] = max(views.get(pg["title"], 0), tot)
            for f, to in rd.items():
                views[f] = max(views.get(f, 0), views.get(to, 0))
            if "continue" in j:
                cont, n = j["continue"], n + 1
            else:
                break
    return views


def main():
    now = datetime.date.today()
    slug = f"today-{now:%Y%m%d}"
    post_dir = BLOG / "content" / "post" / slug
    if (post_dir / "index.md").exists():
        print(f"skip: {slug} exists"); return
    page = f"{now.month}월_{now.day}일"
    wt = api({"action": "parse", "origin": "*", "prop": "wikitext",
              "page": page})["parse"]["wikitext"]["*"]

    events = [e for e in parse_section(wt, "사건") if e["year"] >= 1900]
    # 사건: 시대가 고르게 섞이도록 연대순 샘플 (최대 7)
    events.sort(key=lambda e: e["year"])
    if len(events) > 7:
        step = len(events) / 7
        events = [events[int(i * step)] for i in range(7)]

    births = [b for b in parse_section(wt, "탄생") if b["year"] >= 1930]
    # 생일 '축하' 포스트이므로 사망 표기("(~1992년)") 인물은 제외
    births = [b for b in births if not re.search(r"[(（]~", b["text"])]
    titles = [b["title"] for b in births if b["title"]]
    views = fetch_views(titles) if titles else {}
    for b in births:
        b["v"] = views.get(b["title"], 0) if b["title"] else 0
    births.sort(key=lambda b: -b["v"])
    top_births = births[:8]

    md = [f"""---
title: "오늘 무슨 일이 있었을까? — {now.month}월 {now.day}일"
date: {now:%Y-%m-%d}T07:30:00+09:00
categories: ["오늘의 역사"]
tags: ["오늘의 역사", "역사 속 오늘", "{now.month}월 {now.day}일", "유명인 생일"]
---

{now.month}월 {now.day}일, 역사 속 오늘 일어난 일들과 오늘 생일을 맞은 유명인들을 모았습니다.

## 📰 역사 속 오늘
"""]
    for e in events:
        md.append(f"- **{e['year']}년** — {e['text']}")
    md.append("\n## 🎂 오늘 생일인 유명인\n")
    md.append("생일 축하합니다! 🎉\n")
    for b in top_births:
        age = now.year - b["year"]
        md.append(f"- **{b['year']}년생** ({age}세) — {b['text']}")
    md.append(f"""
---

📌 **내 생일엔 무슨 일이 있었을까?** 궁금하다면 → [내 생일엔 무슨 일이?](/tools/my-birthday/)
🔢 만 나이·정년·국민연금 D-day 계산은 → [만나이 계산기](/tools/age-calculator/)

<sub>출처: 한국어 위키백과 · 유명인은 최근 60일 문서 조회수 기준 유명한 순</sub>
""")
    post_dir.mkdir(parents=True, exist_ok=True)
    (post_dir / "index.md").write_text("\n".join(md))
    print(f"created: {slug} (사건 {len(events)}·생일 {len(top_births)})")


if __name__ == "__main__":
    main()
