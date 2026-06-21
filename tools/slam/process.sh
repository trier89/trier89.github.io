#!/bin/bash
# 컨테이너 안에서 실행되는 처리 스크립트.
# 사용법: process.sh <영상파일> [--keep-res] [--frame-skip N]
#   --keep-res     원본 해상도 유지 (기본: 1920x960으로 축소해 속도 확보)
#   --frame-skip N N프레임마다 1장 처리 (기본 1 = 전체. 2~3이면 더 빠르고 덜 정밀)
set -euo pipefail

VIDEO="${1:?사용법: process.sh <video.mp4> [--keep-res] [--frame-skip N]}"
shift || true
KEEP_RES=0
FRAME_SKIP=1
while [ $# -gt 0 ]; do
  case "$1" in
    --keep-res) KEEP_RES=1 ;;
    --frame-skip) shift; FRAME_SKIP="${1:-1}" ;;
    *) echo "[slam360] 알 수 없는 옵션 무시: $1" ;;
  esac
  shift || true
done

[ -f "$VIDEO" ] || { echo "[slam360] 파일이 없습니다: $VIDEO"; exit 1; }

WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT
NAME=$(basename "$VIDEO"); NAME="${NAME%.*}"

# 해상도·fps 자동 감지
read -r W H FPS <<< "$(ffprobe -v error -select_streams v:0 \
  -show_entries stream=width,height,avg_frame_rate -of csv=p=0 "$VIDEO" \
  | awk -F, '{split($3,f,"/"); fps=(f[2]>0&&f[1]>0)?f[1]/f[2]:30; printf "%d %d %.2f", $1, $2, fps}')"
echo "[slam360] 입력: ${W}x${H} @ ${FPS}fps"

if [ "$W" -ne $((H * 2)) ]; then
  echo "[slam360] 경고: 가로:세로가 2:1이 아닙니다. equirectangular로 내보냈는지 확인하세요."
fi

INPUT="$VIDEO"
if [ "$KEEP_RES" -eq 0 ] && [ "$W" -gt 1920 ]; then
  echo "[slam360] 속도를 위해 1920x960으로 축소합니다 (원본 유지: --keep-res)"
  ffmpeg -y -v error -i "$VIDEO" -vf scale=1920:960 \
    -c:v libx264 -preset veryfast -crf 23 -an "$WORK/input.mp4"
  INPUT="$WORK/input.mp4"; W=1920; H=960
fi

cat > "$WORK/config.yaml" <<EOF
Camera:
  name: "360 camera"
  setup: "monocular"
  model: "equirectangular"
  fps: $FPS
  cols: $W
  rows: $H
  color_order: "RGB"
Preprocessing:
  min_size: 800
Feature:
  name: "default ORB feature extraction setting"
  scale_factor: 1.2
  num_levels: 8
  ini_fast_threshold: 20
  min_fast_threshold: 7
EOF

OUT="/data/${NAME}_slam"
mkdir -p "$OUT"
echo "[slam360] SLAM 시작 — 영상 길이의 0.5~2배 정도 걸립니다"
run_video_slam \
  -v /opt/vocab/orb_vocab.fbow \
  -m "$INPUT" \
  -c "$WORK/config.yaml" \
  --frame-skip "$FRAME_SKIP" \
  --no-sleep --auto-term \
  --eval-log-dir "$OUT" \
  --map-db-out "$OUT/map.msg"

if [ -f "$OUT/frame_trajectory.txt" ]; then
  cp "$OUT/frame_trajectory.txt" "/data/${NAME}_trajectory.txt"
  LINES=$(wc -l < "/data/${NAME}_trajectory.txt")
  echo "[slam360] 완료: ${NAME}_trajectory.txt (${LINES}개 지점)"
  echo "[slam360] 뷰어의 [SLAM 궤적 가져오기]로 이 파일을 불러온 뒤 정렬 기즈모로 모델에 맞추세요."
else
  echo "[slam360] 실패: 궤적이 생성되지 않았습니다. 추적이 끊겼을 수 있습니다."
  echo "[slam360] 대처: 조명이 밝고 구조물이 보이는 영상인지 확인, --frame-skip 1로 재시도."
  exit 1
fi
