#!/usr/bin/env python3
"""요청방 새 댓글 감지 → 텔레그램 알림 (2026-07-21 사용자 "확인해서 컨펌받고 만들어").
giscus가 만드는 GitHub Discussion(제목=페이지 경로)에서 새 댓글을 찾아 사용자에게 전달.
제작은 에디슨 세션에서 사용자 컨펌 후 진행. 상태: data/requests_seen.json
launchd com.minim.blogrequests (매시 15분).
"""
import json, subprocess, sys
from pathlib import Path

BLOG = Path(__file__).resolve().parent.parent
STATE = BLOG / "data" / "requests_seen.json"
STATE.parent.mkdir(exist_ok=True)


def telegram_cfg():
    # orb_bot과 동일 소스(kis config) 재사용
    sys.path.insert(0, str(Path.home() / "projects" / "stock-bot"))
    from orb_bot import _telegram_cfg
    return _telegram_cfg()


def main():
    q = '''{repository(owner:"trier89",name:"trier89.github.io"){
      discussions(first:20,orderBy:{field:UPDATED_AT,direction:DESC}){nodes{
        title url comments(first:50){nodes{id author{login} body createdAt}}}}}}'''
    r = subprocess.run(["gh", "api", "graphql", "-f", f"query={q}"],
                       capture_output=True, text=True, timeout=60)
    if r.returncode:
        print("graphql fail:", r.stderr[:200]); return
    data = json.loads(r.stdout)
    seen = set(json.loads(STATE.read_text())) if STATE.exists() else set()
    new = []
    for d in data["data"]["repository"]["discussions"]["nodes"]:
        for c in d["comments"]["nodes"]:
            if c["id"] in seen:
                continue
            seen.add(c["id"])
            new.append({"page": d["title"], "url": d["url"],
                        "user": (c.get("author") or {}).get("login", "?"),
                        "body": c["body"][:400]})
    STATE.write_text(json.dumps(sorted(seen)))
    if not new:
        print("no new comments"); return
    token, chat = telegram_cfg()
    if not (token and chat):
        print("no telegram cfg"); return
    for n in new:
        msg = (f"💌 블로그 새 댓글/요청!\n"
               f"페이지: {n['page']}\n작성자: {n['user']}\n내용: {n['body']}\n\n"
               f"→ 만들지 말지 답 주시면 에디슨이 처리합니다. ({n['url']})")
        subprocess.run(["curl", "-s", f"https://api.telegram.org/bot{token}/sendMessage",
                        "-d", f"chat_id={chat}", "--data-urlencode", f"text={msg}"],
                       capture_output=True, timeout=30)
    print(f"notified {len(new)}")


if __name__ == "__main__":
    main()
