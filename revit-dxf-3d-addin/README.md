# RevitDxfTo3D — DXF 평면도 → 3D 모델 자동 변환 Revit 애드인

DXF 평면도를 불러와 **벽 / 문 / 창 / 바닥 / 룸**을 자동 인식하고 Revit 3D 모델을 생성하는 애드인입니다.

핵심 설계 목표: **레이어 이름, 선 색상, 텍스트 위치가 도면마다 달라도 동작**하는 것.
레이어/색상으로 요소를 분류하는 대신, 사람이 도면을 읽을 때 쓰는 **기하학적 단서**로 해석합니다.

## 인식 원리

| 요소 | 사람이 보는 단서 | 구현 |
|------|----------------|------|
| 벽 | 일정 간격(50~500mm)의 평행선 쌍 | 모든 선분 쌍에서 평행+간격+중첩 조건 검사 → 점수순 채택 → 동일 직선 병합 → T자/L자 접합부 연장 |
| 문 | 벽에 힌지가 붙은 1/4원 스윙 호 | 반지름 450~1500mm, 중심각 45~200°의 호 중 중심이 벽 축 위에 있는 것 |
| 창 | 벽 선이 끊긴 갭 + 갭을 가로지르는 유리선 | 벽의 "선분 근거 커버리지" 갭 중 벽과 평행한 선이 있는 곳 |
| 개구부 | 벽 선이 끊겼는데 아무것도 없는 곳 | 유리선 없는 갭 → 문 높이의 개구부 |
| 바닥 | 건물 외곽선 | 벽 중심선 그래프에서 최하단 노드부터 외곽 면 추적 |
| 룸 | 방 안에 적힌 이름 텍스트 | 치수/표제 텍스트(숫자, SCALE 등) 제외 후 외곽 안쪽 텍스트 → Revit 룸 + 이름 |
| 단위 | 건물의 상식적인 크기 | DXF 헤더(INSUNITS) 우선, 없으면 "건물 ≈ 30m" 가정으로 mm/cm/m/inch/ft 자동 추정 (수동 지정 가능) |

레이어 이름은 **필터가 아니라 가중치 힌트**로만 사용합니다 (예: `WALL`·`벽` 포함 레이어는 신뢰도 ↑, `FURN`·`DIM` 포함은 ↓). 레이어 체계가 전혀 달라도 인식은 동작합니다.

블록(INSERT)은 월드 좌표로 전개해 처리하고, 폴리라인(bulge 호 포함)도 분해해 사용합니다.
가구·심볼 등의 노이즈는 벽 두께 조건과 중복 검사로 걸러집니다.

## 빌드

요구 사항: .NET SDK 8 이상 (Visual Studio 2022도 가능). Revit 설치 없이 빌드됩니다 (NuGet의 Revit API 참조 패키지 사용).

대상 Revit 버전은 `RevitVersion` 속성으로 전환합니다. 이 값에 따라 타깃 프레임워크(net48 ↔ net8.0-windows)와 Revit API 패키지 버전이 자동으로 맞춰집니다.

```bash
cd revit-dxf-3d-addin/src

# Revit 2021~2024 (net48) — 기본값
dotnet build -c Release
# → src/bin/Revit2024/Release/RevitDxfTo3D.dll (+ netDxf.dll)

# Revit 2025 (net8.0-windows)
dotnet build -c Release -p:RevitVersion=2025
# → src/bin/Revit2025/Release/RevitDxfTo3D.dll (+ netDxf.dll)
```

산출물은 버전별 폴더(`bin/Revit2024/`, `bin/Revit2025/`)로 분리되어 서로 덮어쓰지 않습니다.
다른 연도(예: `2026`)도 해당 Nice3point API 패키지가 출시되면 `-p:RevitVersion=2026`으로 동일하게 빌드됩니다.

> 참고: `net8.0-windows`(WinForms)는 Windows 데스크톱 타깃이 포함된 SDK가 필요합니다. Windows의 공식 .NET SDK / Visual Studio에서는 그대로 빌드됩니다. Linux/CI에서 빌드하려면 공식 Microsoft .NET SDK를 쓰세요(`EnableWindowsTargeting`은 프로젝트에 이미 설정돼 있습니다). 일부 배포판이 패키징한 source-built SDK에는 WindowsDesktop 타깃이 빠져 있어 net48(2024) 빌드만 가능합니다.

## 설치

1. 빌드 결과물을 복사:
   ```
   %AppData%\Autodesk\Revit\Addins\2024\RevitDxfTo3D\
       RevitDxfTo3D.dll
       netDxf.dll
   ```
2. `RevitDxfTo3D.addin` 파일을 `%AppData%\Autodesk\Revit\Addins\2024\`에 복사
   (매니페스트의 `<Assembly>` 경로는 위 폴더 구조 기준입니다)
3. Revit 실행 → **애드인 탭 → "DXF → 3D" 패널 → "DXF 도면 3D 변환"** 버튼

## 사용법

1. 버튼 클릭 → DXF 파일 선택
2. 옵션 설정: 기준 레벨, 벽 높이(기본 2800mm), 도면 단위(기본 자동 인식), 바닥/개구부/룸 생성 여부
3. 변환 → 완료 후 인식 리포트(벽/문/창/룸 개수, 단위 판단 근거, 경고) 표시

문/창은 프로젝트에 문/창 패밀리가 로드되어 있으면 패밀리 인스턴스로 배치하고,
없으면 벽에 사각 개구부를 절단합니다 (문: 바닥~2100mm, 창: 900~2400mm).

## 인식 품질 튜닝

도면 스타일에 따라 결과가 아쉬우면 `src/Recognition/RecognitionParams.cs`의 상수를 조정하세요.
주요 값: 벽 두께 범위, 문 호 반지름 범위, 병합 허용 갭, 끝점 스냅 반경 등 (모두 mm, 주석 포함).

### Revit 없이 인식 테스트

`tests/RecognitionTest`는 합성 평면도(단위/회전/작도 방식 4종)로 인식 파이프라인을 자가 검증하고,
실제 DXF 파일을 넘기면 인식 결과를 출력합니다:

```bash
cd revit-dxf-3d-addin/tests/RecognitionTest
dotnet run                  # 자가 테스트
dotnet run -- 내도면.dxf     # 실제 도면 인식 결과 미리보기
```

## 한계 (알려진 제약)

- **단선(1줄)으로 그린 벽**은 인식하지 못합니다 — 평행선 쌍이 벽의 정의이기 때문입니다.
- 해치(HATCH)로만 표현된 벽, 스플라인, 곡면 벽은 지원하지 않습니다.
- 기둥(원/사각 심볼), 계단, 가구는 모델로 생성하지 않습니다.
- 창의 폭/위치는 인식하지만 창대 높이(900mm)·헤드 높이(2400mm)는 평면도에 정보가 없어 기본값을 사용합니다.
- 층 1개(선택한 레벨)만 생성합니다. 다층은 층별 DXF를 각각 변환하세요.
