#!/usr/bin/env python3
"""요청방/댓글 새 글 감지 → 텔레그램 알림 (2026-07-21 Firestore 익명 댓글로 전환).
Firestore REST(공개 읽기 규칙)로 comments 컬렉션을 폴링, 새 글을 사용자에게 전달.
제작·모더레이션은 에디슨 세션에서 처리. 상태: data/requests_seen.json (문서ID)
launchd com.minim.blogrequests (매시 15분).
"""
import json, subprocess, sys, urllib.request
from pathlib import Path

BLOG = Path(__file__).resolve().parent.parent
STATE = BLOG / "data" / "requests_seen.json"
STATE.parent.mkdir(exist_ok=True)
PROJECT = "planfully-b373d"
URL = f"https://firestore.googleapis.com/v1/projects/{PROJECT}/databases/(default)/documents/comments?pageSize=300"


def telegram_cfg():
    sys.path.insert(0, str(Path.home() / "projects" / "stock-bot"))
    from orb_bot import _telegram_cfg
    return _telegram_cfg()


def val(f):
    if "stringValue" in f: return f["stringValue"]
    if "timestampValue" in f: return f["timestampValue"]
    return ""


def main():
    try:
        req = urllib.request.Request(URL, headers={"User-Agent": "planfully-bot"})
        data = json.loads(urllib.request.urlopen(req, timeout=30).read())
    except Exception as e:
        print("firestore fail:", str(e)[:150]); return
    docs = data.get("documents", [])
    seen = set(json.loads(STATE.read_text())) if STATE.exists() else set()
    new = []
    for d in docs:
        did = d["name"].split("/")[-1]
        if did in seen:
            continue
        seen.add(did)
        f = d.get("fields", {})
        new.append({"page": val(f.get("page", {})), "nick": val(f.get("nick", {})),
                    "text": val(f.get("text", {}))[:400]})
    STATE.write_text(json.dumps(sorted(seen)))
    # 첫 실행(상태 없던 경우)은 기존 글 폭탄 방지: 알림 생략하고 baseline만 저장
    if not new or (not STATE.exists() and len(new) > 20):
        print(f"baseline/{len(new)} new"); return
    token, chat = telegram_cfg()
    if not (token and chat):
        print("no telegram cfg"); return
    for n in new:
        req_flag = "💌 요청" if "/requests" in n["page"] else "💬 댓글"
        msg = (f"{req_flag} 새 글!\n페이지: {n['page']}\n{n['nick']}: {n['text']}\n\n"
               f"→ 요청이면 만들지 답 주세요. 스팸/욕설이면 삭제 지시.")
        subprocess.run(["curl", "-s", f"https://api.telegram.org/bot{token}/sendMessage",
                        "-d", f"chat_id={chat}", "--data-urlencode", f"text={msg}"],
                       capture_output=True, timeout=30)
    print(f"notified {len(new)}")


if __name__ == "__main__":
    main()
