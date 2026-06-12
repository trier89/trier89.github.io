#!/bin/bash
# 호스트(맥/리눅스)용 실행 래퍼.
# 사용법: ./slam360.sh <360영상.mp4> [--keep-res] [--frame-skip N]
set -euo pipefail
cd "$(dirname "$0")"

VIDEO="${1:?사용법: ./slam360.sh <360영상.mp4> [--keep-res] [--frame-skip N]}"
shift || true
[ -f "$VIDEO" ] || { echo "파일이 없습니다: $VIDEO"; exit 1; }

# 최초 1회만 이미지 빌드 (20~40분)
if ! docker image inspect slam360 >/dev/null 2>&1; then
  echo "[slam360] 최초 실행: Docker 이미지를 빌드합니다 (20~40분, 한 번만)"
  docker build -t slam360 .
fi

DIR=$(cd "$(dirname "$VIDEO")" && pwd)
docker run --rm -v "$DIR:/data" slam360 "$(basename "$VIDEO")" "$@"
