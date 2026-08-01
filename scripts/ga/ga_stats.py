#!/usr/bin/env python3
"""GA4 → static/stats.json (홈 방문자 배지 + 다락방컴퍼니 리아 리포트용).
오늘/총 방문자, 어제 요약, 인기·체류 페이지. ga_report.py의 인증/쿼리 재사용.
usage: python3 ga_stats.py   # stats.json 갱신
"""
import os, sys, json, datetime
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ga_report import get_creds, run_report  # noqa
from googleapiclient.discovery import build

KST = datetime.timezone(datetime.timedelta(hours=9))
SITE_START = "2026-03-01"
OUT = os.path.expanduser("~/projects/planfully-lazy/static/stats.json")

def _i(x):
    try: return int(x)
    except Exception: return 0

def build_stats():
    svc = build("analyticsdata", "v1beta", credentials=get_creds(), cache_discovery=False)
    today = run_report(svc, [], ["activeUsers", "screenPageViews"], "today", "today", 1)
    yday = run_report(svc, [], ["activeUsers", "newUsers", "screenPageViews", "sessions"], "yesterday", "yesterday", 1)
    total = run_report(svc, [], ["activeUsers"], SITE_START, "today", 1)
    total_sess = run_report(svc, [], ["sessions"], SITE_START, "today", 1)  # 누적 방문 횟수(재방문마다 증가)
    pages = run_report(svc, ["pageTitle"], ["screenPageViews", "userEngagementDuration"], "7daysAgo", "yesterday", 12)

    tv = today[0][1] if today else ["0", "0"]
    yv = yday[0][1] if yday else ["0", "0", "0", "0"]
    tot = _i(total[0][1][0]) if total else 0
    tot_visits = _i(total_sess[0][1][0]) if total_sess else 0

    plist = []
    for d, m in pages:
        views, eng = _i(m[0]), _i(m[1])
        plist.append({"title": d[0], "views": views, "eng": eng,
                      "avg_sec": round(eng / views) if views else 0})
    top_views = sorted(plist, key=lambda x: -x["views"])[:5]
    top_dwell = sorted([p for p in plist if p["views"] >= 3], key=lambda x: -x["avg_sec"])[:5]

    stats = {
        "today": _i(tv[0]), "today_pv": _i(tv[1]), "total": tot, "total_visits": tot_visits,
        "yesterday": {"users": _i(yv[0]), "new": _i(yv[1]), "pv": _i(yv[2]), "sessions": _i(yv[3])},
        "top_views": top_views, "top_dwell": top_dwell,
        "updated": datetime.datetime.now(KST).strftime("%Y-%m-%d %H:%M"),
    }
    return stats

if __name__ == "__main__":
    s = build_stats()
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    json.dump(s, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"[ga_stats] 오늘 {s['today']} · 총 {s['total']} · 체류1위 {s['top_dwell'][0]['title'][:20] if s['top_dwell'] else '-'}")
