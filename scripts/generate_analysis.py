#!/usr/bin/env python3
"""Generate news analysis using OpenAI API (for cron job reliability)."""

import os
import sys
import json

try:
    import openai
except ImportError:
    print("openai not installed", file=sys.stderr)
    sys.exit(1)


def main():
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("OPENAI_API_KEY not set", file=sys.stderr)
        sys.exit(1)

    prompt_file = sys.argv[1] if len(sys.argv) > 1 else "/tmp/news_prompt.txt"
    with open(prompt_file, "r", encoding="utf-8") as f:
        prompt = f.read()

    client = openai.OpenAI(api_key=api_key)
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        max_tokens=4000,
        messages=[{"role": "user", "content": prompt}],
    )

    print(response.choices[0].message.content)


if __name__ == "__main__":
    main()
