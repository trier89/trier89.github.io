using System;
using System.Collections.Generic;
using System.Linq;
using RevitDxfTo3D.Core;

namespace RevitDxfTo3D.Recognition
{
    public enum OpeningKind { Door, Window, Doorway }

    /// <summary>벽 위의 개구부. T0~T1은 벽 축 파라미터 (mm).</summary>
    public sealed class Opening
    {
        public int WallIndex;
        public double T0, T1;
        public OpeningKind Kind;

        public double Width => T1 - T0;
    }

    /// <summary>
    /// 문/창 검출 — 사람이 도면을 읽는 단서를 그대로 사용:
    ///   문: 벽에 힌지가 붙은 1/4원 스윙 호 (반지름 ≈ 문 폭)
    ///   창: 벽 선이 끊긴 갭 안에 벽과 평행한 유리선이 그려진 곳
    ///   개구부: 벽 선이 끊겼지만 아무것도 없는 곳 (문틀 없는 출입구로 간주)
    /// </summary>
    public static class OpeningDetector
    {
        public static List<Opening> Detect(
            List<WallAxis> walls,
            List<ArcGeo> arcs,
            List<Seg2> allSegments,
            List<string> notes)
        {
            var openings = new List<Opening>();

            DetectDoors(walls, arcs, openings);
            int doors = openings.Count;

            DetectGapOpenings(walls, allSegments, openings);
            int windows = openings.Count(o => o.Kind == OpeningKind.Window);
            int doorways = openings.Count(o => o.Kind == OpeningKind.Doorway);

            notes?.Add($"문 {doors}개, 창 {windows}개, 개구부 {doorways}개 인식");
            return openings;
        }

        // ── 문: 스윙 호 ─────────────────────────────────────────

        private static void DetectDoors(List<WallAxis> walls, List<ArcGeo> arcs, List<Opening> openings)
        {
            foreach (var arc in arcs)
            {
                if (arc.Radius < RecognitionParams.DoorRadiusMin ||
                    arc.Radius > RecognitionParams.DoorRadiusMax) continue;
                double sweep = arc.SweepDeg;
                if (sweep < RecognitionParams.DoorSweepMinDeg ||
                    sweep > RecognitionParams.DoorSweepMaxDeg) continue;

                // 힌지(호 중심)가 벽 축 가까이에 있어야 한다
                int bestWall = -1;
                double bestDist = double.MaxValue;
                for (int i = 0; i < walls.Count; i++)
                {
                    var w = walls[i];
                    double lat = w.LateralDistanceTo(arc.Center);
                    double t = w.ParamOf(arc.Center);
                    if (lat > w.Thickness / 2 + 100) continue;
                    if (t < w.T0 - arc.Radius || t > w.T1 + arc.Radius) continue;
                    if (lat < bestDist) { bestDist = lat; bestWall = i; }
                }
                if (bestWall < 0) continue;

                var wall = walls[bestWall];
                double tCenter = wall.ParamOf(arc.Center);

                // 호의 양 끝점 중 벽에서 먼 쪽이 열린 문짝 → 가까운 쪽이 문이 닫히는 방향.
                // 개구부는 힌지에서 "닫힌 문짝" 방향으로 반지름만큼.
                Vec2 closedTip = wall.LateralDistanceTo(arc.StartPoint) < wall.LateralDistanceTo(arc.EndPoint)
                    ? arc.StartPoint : arc.EndPoint;
                double sign = Math.Sign(wall.ParamOf(closedTip) - tCenter);
                if (sign == 0) sign = 1;

                double t0 = tCenter;
                double t1 = tCenter + sign * arc.Radius;
                if (t0 > t1) { var t = t0; t0 = t1; t1 = t; }

                t0 = Math.Max(t0, wall.T0 + 30);
                t1 = Math.Min(t1, wall.T1 - 30);
                if (t1 - t0 < RecognitionParams.DoorRadiusMin * 0.6) continue;

                AddIfNotOverlapping(openings, new Opening
                {
                    WallIndex = bestWall,
                    T0 = t0,
                    T1 = t1,
                    Kind = OpeningKind.Door,
                });
            }
        }

        // ── 창/개구부: 벽 커버리지 갭 ────────────────────────────

        private static void DetectGapOpenings(List<WallAxis> walls, List<Seg2> allSegments, List<Opening> openings)
        {
            for (int wi = 0; wi < walls.Count; wi++)
            {
                var w = walls[wi];
                double margin = Math.Max(150, w.Thickness);

                foreach (var gap in w.Cover.GapsWithin(w.T0, w.T1))
                {
                    double len = gap.E - gap.S;
                    if (len < RecognitionParams.OpeningGapMin ||
                        len > RecognitionParams.OpeningGapMax) continue;
                    // 벽 끝의 갭은 접합부 연장으로 생긴 것일 수 있으니 내부 갭만
                    if (gap.S < w.T0 + margin || gap.E > w.T1 - margin) continue;

                    bool hasGlazing = HasParallelLinesInBand(w, gap.S, gap.E, allSegments);

                    AddIfNotOverlapping(openings, new Opening
                    {
                        WallIndex = wi,
                        T0 = gap.S,
                        T1 = gap.E,
                        Kind = hasGlazing ? OpeningKind.Window : OpeningKind.Doorway,
                    });
                }
            }
        }

        /// <summary>갭 구간의 벽 두께 띠 안에 벽과 평행한 선(유리선)이 있는지.</summary>
        private static bool HasParallelLinesInBand(WallAxis w, double gs, double ge, List<Seg2> segments)
        {
            foreach (var s in segments)
            {
                if (Math.Abs(s.Dir.Cross(w.D)) > 0.06) continue; // 벽과 평행해야 함
                if (w.LateralDistanceTo(s.A) > w.Thickness / 2 + 20) continue;
                if (w.LateralDistanceTo(s.B) > w.Thickness / 2 + 20) continue;

                double t0 = w.ParamOf(s.A), t1 = w.ParamOf(s.B);
                if (t0 > t1) { var t = t0; t0 = t1; t1 = t; }
                double ov = Math.Min(t1, ge) - Math.Max(t0, gs);
                if (ov > 0.3 * (ge - gs)) return true;
            }
            return false;
        }

        private static void AddIfNotOverlapping(List<Opening> openings, Opening o)
        {
            foreach (var ex in openings)
            {
                if (ex.WallIndex != o.WallIndex) continue;
                double ov = Math.Min(ex.T1, o.T1) - Math.Max(ex.T0, o.T0);
                if (ov > 0.25 * Math.Min(ex.Width, o.Width)) return; // 이미 같은 자리에 개구부 있음
            }
            openings.Add(o);
        }
    }
}
