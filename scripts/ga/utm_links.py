#!/usr/bin/env python3
"""planfully.ai.kr 공유용 UTM 링크 생성기.
카톡·인스타·SNS로 공유할 때 붙이면 GA에서 '소셜 유입'으로 정확히 분류된다.
usage: python3 utm_links.py [경로]   (경로 생략 시 주요 페이지 전체)
"""
import sys, urllib.parse

BASE = "https://planfully.ai.kr"

# 주요 허브 페이지 (경로, 이름)
PAGES = [
    ("/", "홈"),
    ("/tools/", "도구방"),
    ("/games/", "게임방"),
    ("/tests/", "테스트방"),
    ("/page/requests/", "요청방"),
]

# 공유 채널: utm_source (utm_medium은 전부 social)
CHANNELS = [
    ("kakao", "카카오톡"),
    ("instagram", "인스타"),
    ("threads", "스레드"),
    ("x", "X(트위터)"),
    ("band", "밴드"),
]


def utm(path, source, medium="social", campaign="share"):
    q = urllib.parse.urlencode({
        "utm_source": source, "utm_medium": medium, "utm_campaign": campaign})
    sep = "&" if "?" in path else "?"
    return f"{BASE}{path}{sep}{q}"


def main():
    if len(sys.argv) > 1:
        path = sys.argv[1]
        if not path.startswith("/"):
            path = "/" + path
        print(f"# {path}")
        for src, label in CHANNELS:
            print(f"  {label:8} {utm(path, src)}")
        return
    for path, name in PAGES:
        print(f"■ {name}  ({path})")
        for src, label in CHANNELS:
            print(f"  {label:8} {utm(path, src)}")
        print()


if __name__ == "__main__":
    main()
