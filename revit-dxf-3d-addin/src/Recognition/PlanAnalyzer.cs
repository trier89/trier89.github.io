using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using RevitDxfTo3D.Core;
using RevitDxfTo3D.Dxf;

namespace RevitDxfTo3D.Recognition
{
    /// <summary>인식 결과. 좌표는 mm, 도면 중심이 원점 부근으로 이동된 상태.</summary>
    public sealed class RecognizedPlan
    {
        public List<WallAxis> Walls = new List<WallAxis>();
        public List<Opening> Openings = new List<Opening>();
        public List<Vec2> FloorLoop;            // null이면 바닥 생성 불가
        public List<TextLabel> RoomLabels = new List<TextLabel>();
        public double UnitFactor;               // DXF 단위 → mm
        public string UnitSource;
        public List<string> Notes = new List<string>();
    }

    /// <summary>
    /// DXF 기하 → 단위 정규화 → 벽/개구부/바닥/룸 인식의 전체 파이프라인.
    /// </summary>
    public static class PlanAnalyzer
    {
        /// <param name="unitOverride">사용자가 지정한 mm 환산 계수 (null이면 자동).</param>
        public static RecognizedPlan Analyze(DxfGeometry dxf, double? unitOverride)
        {
            var plan = new RecognizedPlan();

            // 1) 단위 결정 및 mm 정규화
            double factor = ResolveUnitFactor(dxf, unitOverride, plan);
            plan.UnitFactor = factor;

            var segments = dxf.Segments
                .Select(s => new Seg2(s.A * factor, s.B * factor) { Weight = s.Weight })
                .ToList();
            var arcs = dxf.Arcs.Select(a => new ArcGeo
            {
                Center = a.Center * factor,
                Radius = a.Radius * factor,
                StartAngleDeg = a.StartAngleDeg,
                EndAngleDeg = a.EndAngleDeg,
                Weight = a.Weight,
            }).ToList();
            var texts = dxf.Texts.Select(t => new TextLabel
            {
                Position = t.Position * factor,
                Value = t.Value,
                Height = t.Height * factor,
            }).ToList();

            plan.Notes.Add($"선분 {segments.Count}개, 호 {arcs.Count}개, 텍스트 {texts.Count}개 수집");

            // 2) 벽 검출
            plan.Walls = WallDetector.Detect(segments, plan.Notes);
            plan.Notes.Add($"벽 {plan.Walls.Count}개 인식");
            if (plan.Walls.Count == 0) return plan;

            // 3) Revit이 원점에서 먼 기하를 싫어하므로 도면을 원점 근처로 이동
            Recenter(plan.Walls, segments, arcs, texts, plan);

            // 4) 문/창
            plan.Openings = OpeningDetector.Detect(plan.Walls, arcs, segments, plan.Notes);

            // 5) 바닥 외곽
            plan.FloorLoop = FloorOutline.Find(plan.Walls, plan.Notes);

            // 6) 룸 라벨
            plan.RoomLabels = PickRoomLabels(texts, plan);
            plan.Notes.Add($"룸 라벨 {plan.RoomLabels.Count}개 인식");

            return plan;
        }

        // ── 단위 추정 ───────────────────────────────────────────

        private static double ResolveUnitFactor(DxfGeometry dxf, double? unitOverride, RecognizedPlan plan)
        {
            if (unitOverride.HasValue)
            {
                plan.UnitSource = "사용자 지정";
                return unitOverride.Value;
            }

            if (dxf.HeaderUnitFactor.HasValue)
            {
                plan.UnitSource = $"DXF 헤더 ({dxf.HeaderUnitName})";
                return dxf.HeaderUnitFactor.Value;
            }

            // 헤더에 단위가 없으면 도면 크기로 추정: 후보 배율 중
            // "건물 크기 ≈ 30m" 가정에 가장 가까운 것을 고른다.
            double maxDim = BoundingSize(dxf.Segments);
            if (maxDim <= 0)
            {
                plan.UnitSource = "추정 실패 → mm 가정";
                return 1.0;
            }

            double[] factors = { 1.0, 10.0, 25.4, 304.8, 1000.0 };
            string[] names = { "mm", "cm", "inch", "ft", "m" };
            int best = 0;
            double bestErr = double.MaxValue;
            for (int i = 0; i < factors.Length; i++)
            {
                double err = Math.Abs(Math.Log(maxDim * factors[i] / RecognitionParams.AssumedBuildingSize));
                if (err < bestErr) { bestErr = err; best = i; }
            }
            plan.UnitSource = $"도면 크기로 추정 ({names[best]})";
            return factors[best];
        }

        private static double BoundingSize(List<Seg2> segs)
        {
            if (segs.Count == 0) return 0;
            double minX = double.MaxValue, minY = double.MaxValue;
            double maxX = double.MinValue, maxY = double.MinValue;
            foreach (var s in segs)
            {
                minX = Math.Min(minX, Math.Min(s.A.X, s.B.X));
                maxX = Math.Max(maxX, Math.Max(s.A.X, s.B.X));
                minY = Math.Min(minY, Math.Min(s.A.Y, s.B.Y));
                maxY = Math.Max(maxY, Math.Max(s.A.Y, s.B.Y));
            }
            return Math.Max(maxX - minX, maxY - minY);
        }

        // ── 원점 이동 ───────────────────────────────────────────

        private static void Recenter(List<WallAxis> walls, List<Seg2> segments,
            List<ArcGeo> arcs, List<TextLabel> texts, RecognizedPlan plan)
        {
            double minX = double.MaxValue, minY = double.MaxValue;
            double maxX = double.MinValue, maxY = double.MinValue;
            foreach (var w in walls)
            {
                foreach (var p in new[] { w.Start, w.End })
                {
                    minX = Math.Min(minX, p.X); maxX = Math.Max(maxX, p.X);
                    minY = Math.Min(minY, p.Y); maxY = Math.Max(maxY, p.Y);
                }
            }
            var shift = new Vec2(-(minX + maxX) / 2, -(minY + maxY) / 2);
            if (shift.Length < 1000) return; // 이미 원점 근처

            foreach (var w in walls) w.P += shift;
            foreach (var s in segments) { s.A += shift; s.B += shift; }
            foreach (var a in arcs) a.Center += shift;
            foreach (var t in texts) t.Position += shift;
            plan.Notes.Add($"도면을 원점 근처로 {shift.Length / 1000:0.#}m 이동");
        }

        // ── 룸 라벨 선별 ────────────────────────────────────────

        private static readonly Regex NonNameText = new Regex(
            @"^[\s\d.,xX×*@~\-+/:#%()㎜㎝㎡²°'""]*$", RegexOptions.Compiled);

        private static List<TextLabel> PickRoomLabels(List<TextLabel> texts, RecognizedPlan plan)
        {
            var labels = new List<TextLabel>();
            foreach (var t in texts)
            {
                string v = t.Value;
                if (string.IsNullOrWhiteSpace(v)) continue;
                if (v.Length > RecognitionParams.MaxRoomNameLength) continue;
                if (NonNameText.IsMatch(v)) continue;          // 치수/숫자 텍스트 제외
                if (v.IndexOf("mm", StringComparison.OrdinalIgnoreCase) >= 0) continue;
                if (v.IndexOf("scale", StringComparison.OrdinalIgnoreCase) >= 0) continue;

                // 건물 외곽(또는 벽 영역) 안에 있는 텍스트만
                if (plan.FloorLoop != null)
                {
                    if (!Geo.PointInPolygon(t.Position, plan.FloorLoop)) continue;
                }
                else if (!InsideWallsBBox(t.Position, plan.Walls)) continue;

                // 같은 자리에 이미 라벨이 있으면 건너뜀
                if (labels.Any(l => l.Position.DistanceTo(t.Position) < 1500)) continue;

                labels.Add(t);
            }
            return labels;
        }

        private static bool InsideWallsBBox(Vec2 p, List<WallAxis> walls)
        {
            double minX = double.MaxValue, minY = double.MaxValue;
            double maxX = double.MinValue, maxY = double.MinValue;
            foreach (var w in walls)
            {
                foreach (var q in new[] { w.Start, w.End })
                {
                    minX = Math.Min(minX, q.X); maxX = Math.Max(maxX, q.X);
                    minY = Math.Min(minY, q.Y); maxY = Math.Max(maxY, q.Y);
                }
            }
            return p.X > minX && p.X < maxX && p.Y > minY && p.Y < maxY;
        }
    }
}
