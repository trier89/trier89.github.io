#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
로또 당첨번호 주간 갱신기 (launchd: com.planfully.lotto)
동행복권 공식 API(/lt645/selectPstLt645InfoNew.do)로 최신 회차를 받아
static/data/lotto_history.json 에 새 회차만 추가한다.
로또는 무작위 추첨이며, 이 데이터는 통계 재미·참고용이다.
"""
import json, os, sys, time, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "static", "data", "lotto_history.json")
API = "https://www.dhlottery.co.kr/lt645/selectPstLt645InfoNew.do?srchDir=center&srchLtEpsd={}&_={}"
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/126.0 Safari/537.36")


def fmt_date(ymd):
    return "%s-%s-%s" % (ymd[0:4], ymd[4:6], ymd[6:8]) if ymd and len(ymd) == 8 else ymd


def fetch(epsd):
    url = API.format(epsd, int(time.time() * 1000))
    req = urllib.request.Request(url, headers={
        "User-Agent": UA,
        "Referer": "https://www.dhlottery.co.kr/lt645/result",
        "Accept": "application/json",
    })
    with urllib.request.urlopen(req, timeout=20) as r:
        return json.loads(r.read().decode("utf-8"))


def to_row(x):
    return {
        "round": x["ltEpsd"],
        "date": fmt_date(str(x["ltRflYmd"])),
        "nums": [x["tm1WnNo"], x["tm2WnNo"], x["tm3WnNo"], x["tm4WnNo"], x["tm5WnNo"], x["tm6WnNo"]],
        "bonus": x["bnsWnNo"],
        # 당첨자수(1~5등) + 1등 1인 상금 (앱 '역대당첨' 표시용, 2026-08-20 추가)
        "w": [x.get("rnk1WnNope", 0), x.get("rnk2WnNope", 0), x.get("rnk3WnNope", 0),
              x.get("rnk4WnNope", 0), x.get("rnk5WnNope", 0)],
        "p1": x.get("rnk1WnAmt", 0),
    }


def main():
    with open(DATA, encoding="utf-8") as f:
        hist = json.load(f)
    by_round = {r["round"]: r for r in hist}
    cur_max = max(by_round)
    print("current max round: %d" % cur_max)

    added = 0
    # 최신 회차 발견: cur_max 부근을 조회하면 batch에 실제 최신까지 포함됨.
    # 새 회차가 여러 개 밀렸을 수도 있으니 몇 단계 위로 훑는다.
    # ⚠️ API는 srchLtEpsd가 최신회차보다 크면 빈 리스트를 준다(구 버그: probe+5로 조회해 신규 못 봄, 2026-08-13 수정).
    # 유효한 최근 회차로 조회하면 최신 10회차 배치를 돌려주므로 그대로 훑는다.
    probe = cur_max
    for _ in range(6):
        try:
            j = fetch(probe)
        except Exception as e:
            print("fetch error @%d: %s" % (probe, e))
            break
        lst = (j.get("data") or {}).get("list") or []
        news = [x for x in lst if x.get("ltEpsd") and x["ltEpsd"] > cur_max and x["ltEpsd"] not in by_round]
        for x in news:
            row = to_row(x)
            # 유효성: 6개 서로 다른 1..45, 보너스 1..45
            ns = row["nums"] + [row["bonus"]]
            if len(set(row["nums"])) == 6 and all(1 <= n <= 45 for n in ns):
                by_round[row["round"]] = row
                added += 1
        if not news:
            break
        probe = max(by_round)
        time.sleep(0.3)

    if added == 0:
        print("no new rounds. up to date at %d." % cur_max)
        return 0

    out = [by_round[k] for k in sorted(by_round)]
    with open(DATA, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, separators=(",", ":"))
    print("added %d new round(s). new max: %d" % (added, max(by_round)))
    return 0


if __name__ == "__main__":
    sys.exit(main())
