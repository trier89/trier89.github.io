<#
.SYNOPSIS
  RevitDxfTo3D 애드인을 빌드(선택)하고 Revit Addins 폴더에 설치한다.

.DESCRIPTION
  설치 실패의 흔한 원인 3가지를 자동으로 처리한다:
    1) 다운로드 파일 차단(Mark-of-the-Web) → Unblock-File 로 해제
    2) 폴더/연도 불일치          → 올바른 %AppData% 경로에 정확히 배치
    3) Revit 버전 ↔ 빌드 타깃    → -RevitVersion 에 맞춰 빌드/복사

.PARAMETER RevitVersion
  대상 Revit 연도 (예: 2024, 2025). 기본 2024.

.PARAMETER Build
  지정하면 설치 전에 dotnet build 를 수행한다. (.NET SDK 필요)
  미지정 시 이미 빌드된 bin\Revit<버전>\Release 산출물을 사용한다.

.PARAMETER AllUsers
  지정하면 모든 사용자용 위치(ProgramData)에 설치한다. 관리자 권한 필요.

.EXAMPLE
  # Revit 2025용으로 빌드 후 설치
  powershell -ExecutionPolicy Bypass -File install.ps1 -RevitVersion 2025 -Build

.EXAMPLE
  # 이미 빌드돼 있으면 복사만
  powershell -ExecutionPolicy Bypass -File install.ps1 -RevitVersion 2024
#>
[CmdletBinding()]
param(
    [string]$RevitVersion = "2024",
    [switch]$Build,
    [switch]$AllUsers
)

$ErrorActionPreference = "Stop"
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$srcDir    = Join-Path $scriptDir "src"
$addinSrc  = Join-Path $scriptDir "RevitDxfTo3D.addin"

Write-Host "RevitDxfTo3D 설치 — Revit $RevitVersion" -ForegroundColor Cyan

# 1) (선택) 빌드 ---------------------------------------------------------------
if ($Build) {
    Write-Host "빌드 중 (dotnet build -p:RevitVersion=$RevitVersion)..." -ForegroundColor Yellow
    & dotnet build (Join-Path $srcDir "RevitDxfTo3D.csproj") -c Release -p:RevitVersion=$RevitVersion
    if ($LASTEXITCODE -ne 0) { throw "빌드 실패. .NET SDK가 설치되어 있는지 확인하세요." }
}

# 2) 산출물 위치 확인 ----------------------------------------------------------
$buildOut = Join-Path $srcDir "bin\Revit$RevitVersion\Release"
$dll      = Join-Path $buildOut "RevitDxfTo3D.dll"
if (-not (Test-Path $dll)) {
    throw "빌드 산출물이 없습니다: $dll`n먼저 -Build 옵션으로 실행하거나 Visual Studio에서 빌드하세요."
}

# 3) 설치 대상 경로 ------------------------------------------------------------
if ($AllUsers) {
    $addinsRoot = Join-Path $env:ProgramData "Autodesk\Revit\Addins\$RevitVersion"
} else {
    $addinsRoot = Join-Path $env:APPDATA "Autodesk\Revit\Addins\$RevitVersion"
}
$targetDir = Join-Path $addinsRoot "RevitDxfTo3D"
New-Item -ItemType Directory -Force -Path $targetDir | Out-Null

# 4) 파일 복사 (manifest는 Addins 폴더 루트, DLL은 하위 폴더) -------------------
Copy-Item $addinSrc -Destination (Join-Path $addinsRoot "RevitDxfTo3D.addin") -Force
Get-ChildItem $buildOut -Filter *.dll | ForEach-Object {
    Copy-Item $_.FullName -Destination $targetDir -Force
}
# deps.json (net8.0-windows에서 의존성 해석에 필요)
Get-ChildItem $buildOut -Filter *.deps.json -ErrorAction SilentlyContinue | ForEach-Object {
    Copy-Item $_.FullName -Destination $targetDir -Force
}

# 5) 차단 해제 (Mark-of-the-Web) — 설치 실패의 1순위 원인 ----------------------
Get-ChildItem $addinsRoot -Recurse -Include *.dll, *.addin | Unblock-File -ErrorAction SilentlyContinue
Write-Host "다운로드 차단(Mark-of-the-Web) 해제 완료" -ForegroundColor DarkGray

# 6) 결과 보고 -----------------------------------------------------------------
Write-Host "`n설치 완료:" -ForegroundColor Green
Write-Host "  매니페스트: $(Join-Path $addinsRoot 'RevitDxfTo3D.addin')"
Write-Host "  어셈블리  : $targetDir"
Get-ChildItem $targetDir | ForEach-Object { Write-Host "    - $($_.Name)" }
Write-Host "`nRevit $RevitVersion 을(를) 재시작하면 [애드인] 탭에 'DXF → 3D' 패널이 나타납니다." -ForegroundColor Cyan
