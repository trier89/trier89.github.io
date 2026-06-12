using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using netDxf;
using netDxf.Entities;
using RevitDxfTo3D.Dxf;
using RevitDxfTo3D.Recognition;

namespace RevitDxfTo3D.Tests
{
    /// <summary>
    /// 합성 평면도 DXF를 만들어 인식 파이프라인을 검증하는 콘솔 하니스.
    /// Revit 없이 벽/문/창/바닥/룸 인식 품질을 확인하고 튜닝할 때 사용한다.
    ///
    ///   dotnet run                  → 내장 합성 도면으로 자가 테스트
    ///   dotnet run -- plan.dxf      → 실제 도면 파일 인식 결과 출력
    /// </summary>
    internal static class Program
    {
        private static int Main(string[] args)
        {
            if (args.Length > 0)
            {
                Report(PlanAnalyzer.Analyze(DxfReader.Load(args[0]), null));
                return 0;
            }

            // 같은 평면을 단위/회전/작도 방식을 바꿔가며 검증한다 —
            // "도면마다 스타일이 달라도 동작"이 목표이므로.
            var scenarios = new (string Name, double Scale, double RotDeg, bool Polylines)[]
            {
                ("기본 (mm, 회전 없음, 개별 선)", 1.0, 0, false),
                ("미터 단위", 0.001, 0, false),
                ("30도 회전", 1.0, 30, false),
                ("폴리라인 작도 + 인치 단위", 1.0 / 25.4, 0, true),
            };

            bool allPass = true;
            foreach (var sc in scenarios)
            {
                Console.WriteLine($"════ 시나리오: {sc.Name} ════");
                string path = Path.Combine(Path.GetTempPath(), "synthetic_plan.dxf");
                BuildSyntheticPlan(path, sc.Scale, sc.RotDeg, sc.Polylines);

                var plan = PlanAnalyzer.Analyze(DxfReader.Load(path), null);
                Report(plan);
                allPass &= Verify(plan);
                Console.WriteLine();
            }
            return allPass ? 0 : 1;
        }

        // ── 합성 도면: 12m×8m 외벽(두께 200) + 내벽(두께 100) + 문 + 창 + 노이즈 ──
        //
        //  (0,8000)────────────────────────(12000,8000)
        //   │   거실            │ 침실          │
        //   │                  내벽(x=6000)     │
        //   │                   │ ←문(900)      │
        //  (0,0)──── 창(3000~4500) ────────(12000,0)
        //
        // 일부러 "벽" 레이어를 쓰지 않고 임의의 레이어 이름과 색을 섞는다.
        private static void BuildSyntheticPlan(string path, double scale, double rotDeg, bool usePolylines)
        {
            var doc = new DxfDocument();
            var layRandom = new netDxf.Tables.Layer("0-MISC-7") { Color = AciColor.Yellow };
            var layStuff = new netDxf.Tables.Layer("XX_STUFF") { Color = AciColor.Cyan };
            var layFurn = new netDxf.Tables.Layer("FURN-01") { Color = AciColor.Green };

            double cos = Math.Cos(rotDeg * Math.PI / 180), sin = Math.Sin(rotDeg * Math.PI / 180);
            Vector2 T(double x, double y) =>
                new Vector2((x * cos - y * sin) * scale, (x * sin + y * cos) * scale);

            void L(double x1, double y1, double x2, double y2, netDxf.Tables.Layer layer = null)
            {
                var a = T(x1, y1);
                var b = T(x2, y2);
                if (usePolylines)
                {
                    var pl = new Polyline2D(new[]
                    {
                        new Polyline2DVertex(a.X, a.Y),
                        new Polyline2DVertex(b.X, b.Y),
                    });
                    pl.Layer = layer ?? layRandom;
                    doc.Entities.Add(pl);
                }
                else
                {
                    doc.Entities.Add(new Line(a, b) { Layer = layer ?? layRandom });
                }
            }

            // 외벽 (두께 200): 바깥 면과 안쪽 면. 남쪽 벽에는 창(3000~4500) 갭.
            // 바깥 면
            L(0, 0, 3000, 0); L(4500, 0, 12000, 0);          // 남 (창 갭)
            L(12000, 0, 12000, 8000);                         // 동
            L(12000, 8000, 0, 8000);                          // 북
            L(0, 8000, 0, 0);                                 // 서
            // 안쪽 면
            L(200, 200, 3000, 200); L(4500, 200, 5950, 200);  // 남 (창 갭 + 내벽 접합)
            L(6050, 200, 11800, 200, layStuff);
            L(11800, 200, 11800, 7800);                       // 동
            L(11800, 7800, 200, 7800, layStuff);              // 북
            L(200, 7800, 200, 200);                           // 서
            // 창: 갭을 가로지르는 유리선 (벽 중앙 1줄 + 면 2줄)
            L(3000, 100, 4500, 100); L(3000, 60, 4500, 60); L(3000, 140, 4500, 140);
            // 창틀 마구리
            L(3000, 0, 3000, 200); L(4500, 0, 4500, 200);

            // 내벽 (두께 100, x=6000): 남쪽 접합부~문(3000~3900)~북쪽 접합부
            L(5950, 200, 5950, 3000); L(6050, 200, 6050, 3000);
            L(5950, 3900, 5950, 7800); L(6050, 3900, 6050, 7800);
            // 문 마구리
            L(5950, 3000, 6050, 3000); L(5950, 3900, 6050, 3900);
            // 문 스윙 호 (힌지 (6000,3900), 반지름 900, 270°→360°: 닫힌 문짝이 (6000,3000) 방향)
            doc.Entities.Add(new Arc(T(6000, 3900), 900 * scale, 270 + rotDeg, 360 + rotDeg)
            {
                Layer = layRandom,
            });

            // 룸 라벨 + 치수 텍스트(제외 대상)
            doc.Entities.Add(new Text("거실", T(2800, 4000), 300 * scale) { Layer = layRandom });
            doc.Entities.Add(new Text("침실", T(8800, 4000), 300 * scale) { Layer = layRandom });
            doc.Entities.Add(new Text("3,600", T(3000, -800), 250 * scale) { Layer = layRandom });
            doc.Entities.Add(new Text("A-101 SCALE 1:100", T(0, -2000), 400 * scale) { Layer = layRandom });

            // 가구 노이즈: 침대(평행선 간격이 벽 두께 범위 밖), 테이블
            L(7000, 5500, 9000, 5500, layFurn); L(7000, 7300, 9000, 7300, layFurn);
            L(7000, 5500, 7000, 7300, layFurn); L(9000, 5500, 9000, 7300, layFurn);
            L(1000, 1000, 2200, 1000, layFurn); L(1000, 1700, 2200, 1700, layFurn);
            L(1000, 1000, 1000, 1700, layFurn); L(2200, 1000, 2200, 1700, layFurn);

            // 블록(심볼) 테스트: 화장실 심볼 같은 임의 블록
            var block = new netDxf.Blocks.Block("SYM1");
            block.Entities.Add(new Line(new Vector2(0, 0), new Vector2(400, 0)));
            block.Entities.Add(new Line(new Vector2(400, 0), new Vector2(400, 300)));
            var pos = T(1500, 6500);
            doc.Entities.Add(new Insert(block)
            {
                Position = new Vector3(pos.X, pos.Y, 0),
                Scale = new Vector3(scale),
                Rotation = rotDeg,
            });

            doc.Save(path);
        }

        private static void Report(RecognizedPlan plan)
        {
            Console.WriteLine($"단위: {plan.UnitSource} (×{plan.UnitFactor})");
            foreach (var n in plan.Notes) Console.WriteLine("· " + n);
            Console.WriteLine();

            Console.WriteLine($"[벽 {plan.Walls.Count}개]");
            foreach (var w in plan.Walls)
                Console.WriteLine($"  {w.Start} → {w.End}  두께 {w.Thickness:0}  길이 {w.Length:0}");

            Console.WriteLine($"[개구부 {plan.Openings.Count}개]");
            foreach (var o in plan.Openings)
            {
                var w = plan.Walls[o.WallIndex];
                Console.WriteLine($"  {o.Kind}  벽#{o.WallIndex}  {w.PointAt(o.T0)}~{w.PointAt(o.T1)}  폭 {o.Width:0}");
            }

            Console.WriteLine($"[룸 라벨 {plan.RoomLabels.Count}개]");
            foreach (var r in plan.RoomLabels)
                Console.WriteLine($"  \"{r.Value}\" @ {r.Position}");

            Console.WriteLine(plan.FloorLoop != null
                ? $"[바닥] {plan.FloorLoop.Count}개 꼭짓점"
                : "[바닥] 인식 실패");
            Console.WriteLine();
        }

        private static bool Verify(RecognizedPlan plan)
        {
            var failures = new List<string>();

            // 외벽 4 + 내벽 1 = 5 (분할 허용 범위 5~7)
            if (plan.Walls.Count < 5 || plan.Walls.Count > 7)
                failures.Add($"벽 개수 기대 5~7, 실제 {plan.Walls.Count}");

            if (!plan.Openings.Any(o => o.Kind == OpeningKind.Door))
                failures.Add("문 미검출");
            if (!plan.Openings.Any(o => o.Kind == OpeningKind.Window))
                failures.Add("창 미검출");

            var names = plan.RoomLabels.Select(r => r.Value).ToList();
            if (!names.Contains("거실") || !names.Contains("침실"))
                failures.Add($"룸 라벨 기대 [거실, 침실], 실제 [{string.Join(", ", names)}]");
            if (names.Any(n => n.Contains("3,600") || n.Contains("SCALE")))
                failures.Add("치수/표제 텍스트가 룸 라벨로 오인됨");

            if (plan.FloorLoop == null)
                failures.Add("바닥 외곽 미검출");

            // 가구(침대 2000×1800)가 벽으로 오인되지 않았는지: 두께 500 초과 쌍은 애초에
            // 제외되지만, 침대 짧은 변(1800 간격) 등이 벽이 되면 개수 검사에서 걸린다.

            if (failures.Count == 0)
            {
                Console.WriteLine("✔ 자가 테스트 통과");
                return true;
            }
            Console.WriteLine("✘ 자가 테스트 실패:");
            foreach (var f in failures) Console.WriteLine("  - " + f);
            return false;
        }
    }
}
