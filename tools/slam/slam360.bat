@echo off
rem 호스트(윈도우)용 실행 래퍼. Docker Desktop 필요.
rem 사용법: slam360.bat <360영상.mp4> [--keep-res] [--frame-skip N]
if "%~1"=="" (
  echo 사용법: slam360.bat ^<360영상.mp4^> [--keep-res] [--frame-skip N]
  exit /b 1
)

docker image inspect slam360 >NUL 2>&1
if errorlevel 1 (
  echo [slam360] 최초 실행: Docker 이미지를 빌드합니다 (20~40분, 한 번만^)
  docker build -t slam360 "%~dp0"
  if errorlevel 1 exit /b 1
)

docker run --rm -v "%~dp1:/data" slam360 "%~nx1" %2 %3 %4 %5
