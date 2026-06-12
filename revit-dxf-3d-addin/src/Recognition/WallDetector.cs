using System;
using System.Collections.Generic;
using System.Linq;
using RevitDxfTo3D.Core;

namespace RevitDxfTo3D.Recognition
{
    /// <summary>
    /// 인식된 벽. 무한 직선 (P + t·D) 위의 구간 [T0,T1]로 표현한다.
    /// Cover는 "이 구간이 실제 도면 선분으로 뒷받침되는 범위" — 갭이 곧 개구부 후보.
    /// </summary>
    public sealed class WallAxis
    {
        public Vec2 P;           // 직선 위 기준점
        public Vec2 D;           // 단위 방향 (정규화: 각도 [0,180) 범위)
        public double T0, T1;    // 구간 파라미터 (mm)
        public double Thickness; // 벽 두께 (mm)
        public IntervalSet Cover = new IntervalSet();

        public double Length => T1 - T0;
        public Vec2 PointAt(double t) => P + D * t;
        public Vec2 Start => PointAt(T0);
        public Vec2 End => PointAt(T1);

        public double ParamOf(Vec2 q) => (q - P).Dot(D);
        public double LateralDistanceTo(Vec2 q) => Math.Abs((q - P).Dot(D.Perp()));

        /// <summary>방향을 각도 [0,180) 기준으로 정규화 (병합 비교를 단순하게).</summary>
        public void CanonicalizeDirection()
        {
            if (D.Y < -1e-9 || (Math.Abs(D.Y) <= 1e-9 && D.X < 0))
            {
                D = -D;
                double t0 = -T1, t1 = -T0;
                var newCover = new IntervalSet();
                foreach (var iv in Cover.Intervals) newCover.Add(-iv.E, -iv.S);
                T0 = t0; T1 = t1; Cover = newCover;
            }
        }
    }

    /// <summary>
    /// 레이어/색상에 의존하지 않는 기하 기반 벽 검출.
    /// 사람이 도면에서 "일정 간격의 평행선 쌍 = 벽"을 읽는 방식을 그대로 구현:
    ///   1) 평행하고 50~500mm 간격으로 마주보며 충분히 겹치는 선분 쌍 → 벽 후보
    ///   2) 점수(중첩 길이 × 레이어 힌트 × 두께 타당성) 순으로 채택, 중복/충돌 제거
    ///   3) 동일 직선상의 조각 병합
    ///   4) T자/L자 접합부에서 끝점을 만나는 벽 축까지 연장
    /// </summary>
    public static class WallDetector
    {
        public static List<WallAxis> Detect(List<Seg2> allSegments, List<string> notes)
        {
            var segs = allSegments.Where(s => s.Length >= RecognitionParams.MinSegmentLength).ToList();
            if (segs.Count < 2) return new List<WallAxis>();

            var candidates = FindPairCandidates(segs);
            notes?.Add($"평행선 쌍 후보: {candidates.Count}개");

            var accepted = SelectCandidates(candidates, segs);
            var walls = accepted.Select(ToWallAxis).ToList();

            walls = MergeCollinear(walls, allSegments);
            RemoveNestedWalls(walls);
            ExtendToJunctions(walls);
            walls.RemoveAll(w => w.Length < RecognitionParams.MinWallLength);

            return walls;
        }

        // ── 1) 평행선 쌍 탐색 ────────────────────────────────────

        private sealed class PairCandidate
        {
            public int IA, IB;            // 선분 인덱스
            public double Thickness;      // 평행 간격
            public double OvStart, OvEnd; // 선분 A 축 기준 중첩 구간
            public double Score;
        }

        private static List<PairCandidate> FindPairCandidates(List<Seg2> segs)
        {
            // 공간 그리드로 후보 쌍을 좁힌다 (셀 크기 = 최대 벽 두께 + 여유).
            double cell = RecognitionParams.WallThicknessMax + 200;
            var grid = new Dictionary<(int, int), List<int>>();

            for (int i = 0; i < segs.Count; i++)
            {
                var s = segs[i];
                int x0 = (int)Math.Floor((Math.Min(s.A.X, s.B.X) - RecognitionParams.WallThicknessMax) / cell);
                int x1 = (int)Math.Floor((Math.Max(s.A.X, s.B.X) + RecognitionParams.WallThicknessMax) / cell);
                int y0 = (int)Math.Floor((Math.Min(s.A.Y, s.B.Y) - RecognitionParams.WallThicknessMax) / cell);
                int y1 = (int)Math.Floor((Math.Max(s.A.Y, s.B.Y) + RecognitionParams.WallThicknessMax) / cell);
                for (int gx = x0; gx <= x1; gx++)
                    for (int gy = y0; gy <= y1; gy++)
                    {
                        if (!grid.TryGetValue((gx, gy), out var list))
                            grid[(gx, gy)] = list = new List<int>();
                        list.Add(i);
                    }
            }

            var seen = new HashSet<long>();
            var result = new List<PairCandidate>();

            foreach (var bucket in grid.Values)
            {
                for (int u = 0; u < bucket.Count; u++)
                    for (int v = u + 1; v < bucket.Count; v++)
                    {
                        int i = Math.Min(bucket[u], bucket[v]);
                        int j = Math.Max(bucket[u], bucket[v]);
                        if (i == j || !seen.Add((long)i << 32 | (uint)j)) continue;

                        var c = TryPair(segs[i], segs[j], i, j);
                        if (c != null) result.Add(c);
                    }
            }
            return result;
        }

        private static PairCandidate TryPair(Seg2 a, Seg2 b, int ia, int ib)
        {
            // 평행성
            if (Math.Abs(a.Dir.Cross(b.Dir)) > RecognitionParams.ParallelSinTol) return null;

            // 간격 = 벽 두께 후보 (양 끝에서 거의 일정해야 함)
            double d1 = a.SignedDistanceTo(b.A);
            double d2 = a.SignedDistanceTo(b.B);
            if (Math.Abs(d1 - d2) > RecognitionParams.DistanceVariationTol) return null;
            double dist = Math.Abs((d1 + d2) / 2);
            if (dist < RecognitionParams.WallThicknessMin || dist > RecognitionParams.WallThicknessMax) return null;

            // 중첩 구간 (선분 A 축 파라미터 기준)
            double lenA = a.Length;
            double tb0 = a.ParamOf(b.A), tb1 = a.ParamOf(b.B);
            if (tb0 > tb1) { var t = tb0; tb0 = tb1; tb1 = t; }
            double s = Math.Max(0, tb0);
            double e = Math.Min(lenA, tb1);
            double overlap = e - s;
            double minLen = Math.Min(lenA, b.Length);
            if (overlap < RecognitionParams.MinOverlap || overlap < 0.4 * minLen) return null;

            double thicknessPref =
                (dist >= RecognitionParams.TypicalThicknessMin && dist <= RecognitionParams.TypicalThicknessMax)
                    ? 1.0 : 0.65;

            return new PairCandidate
            {
                IA = ia, IB = ib,
                Thickness = dist,
                OvStart = s, OvEnd = e,
                Score = overlap * Math.Min(a.Weight, b.Weight) * thicknessPref,
            };
        }

        // ── 2) 후보 채택 (그리디 + 충돌 회피) ─────────────────────

        private sealed class Accepted
        {
            public Vec2 W0, W1;      // 중심선 끝점 (월드 좌표)
            public double Thickness;
        }

        private static List<Accepted> SelectCandidates(List<PairCandidate> candidates, List<Seg2> segs)
        {
            candidates.Sort((x, y) => y.Score.CompareTo(x.Score));

            var claimed = new Dictionary<int, IntervalSet>(); // 선분별 사용된 구간
            var accepted = new List<Accepted>();

            foreach (var c in candidates)
            {
                var a = segs[c.IA];
                var b = segs[c.IB];

                // 같은 선분 구간이 이미 다른 벽에 쓰였으면 기각
                double ovLen = c.OvEnd - c.OvStart;
                if (ClaimedFraction(claimed, c.IA, c.OvStart, c.OvEnd) > RecognitionParams.MaxClaimedFraction)
                    continue;
                double sb0 = b.ParamOf(a.A + a.Dir * c.OvStart);
                double sb1 = b.ParamOf(a.A + a.Dir * c.OvEnd);
                if (ClaimedFraction(claimed, c.IB, Math.Min(sb0, sb1), Math.Max(sb0, sb1)) > RecognitionParams.MaxClaimedFraction)
                    continue;

                // 중심선 계산
                double side = Math.Sign(a.SignedDistanceTo(b.Mid));
                Vec2 offset = a.Dir.Perp() * (side * c.Thickness / 2);
                Vec2 w0 = a.A + a.Dir * c.OvStart + offset;
                Vec2 w1 = a.A + a.Dir * c.OvEnd + offset;

                // 기존 채택 벽과 같은 자리에 겹치는 중복 벽 방지
                // (마감선이 여러 겹인 도면에서 한 벽이 두세 번 잡히는 것을 막는다)
                if (ConflictsWithAccepted(accepted, w0, w1, c.Thickness)) continue;

                accepted.Add(new Accepted { W0 = w0, W1 = w1, Thickness = c.Thickness });
                Claim(claimed, c.IA, c.OvStart, c.OvEnd);
                Claim(claimed, c.IB, Math.Min(sb0, sb1), Math.Max(sb0, sb1));
            }
            return accepted;
        }

        private static double ClaimedFraction(Dictionary<int, IntervalSet> claimed, int idx, double s, double e)
        {
            if (e - s < 1e-9) return 1.0;
            return claimed.TryGetValue(idx, out var set) ? set.CoveredLength(s, e) / (e - s) : 0.0;
        }

        private static void Claim(Dictionary<int, IntervalSet> claimed, int idx, double s, double e)
        {
            if (!claimed.TryGetValue(idx, out var set)) claimed[idx] = set = new IntervalSet();
            set.Add(s, e);
        }

        private static bool ConflictsWithAccepted(List<Accepted> accepted, Vec2 w0, Vec2 w1, double thickness)
        {
            Vec2 dir = (w1 - w0).Normalized();
            double len = w0.DistanceTo(w1);
            foreach (var acc in accepted)
            {
                Vec2 ad = (acc.W1 - acc.W0).Normalized();
                if (Math.Abs(dir.Cross(ad)) > 0.05) continue;

                double lat = Math.Abs((w0 - acc.W0).Dot(ad.Perp()));
                if (lat > (thickness + acc.Thickness) / 3) continue;

                double t0 = (w0 - acc.W0).Dot(ad);
                double t1 = (w1 - acc.W0).Dot(ad);
                if (t0 > t1) { var t = t0; t0 = t1; t1 = t; }
                double accLen = acc.W0.DistanceTo(acc.W1);
                double ov = Math.Min(t1, accLen) - Math.Max(t0, 0);
                if (ov > 0.3 * Math.Min(len, accLen)) return true;
            }
            return false;
        }

        private static WallAxis ToWallAxis(Accepted acc)
        {
            var w = new WallAxis
            {
                P = acc.W0,
                D = (acc.W1 - acc.W0).Normalized(),
                T0 = 0,
                T1 = acc.W0.DistanceTo(acc.W1),
                Thickness = acc.Thickness,
            };
            w.Cover.Add(w.T0, w.T1);
            w.CanonicalizeDirection();
            return w;
        }

        // ── 3) 동일 직선상 병합 ──────────────────────────────────

        private static List<WallAxis> MergeCollinear(List<WallAxis> walls, List<Seg2> allSegments)
        {
            bool changed = true;
            while (changed)
            {
                changed = false;
                for (int i = 0; i < walls.Count && !changed; i++)
                    for (int j = i + 1; j < walls.Count && !changed; j++)
                    {
                        if (TryMerge(walls[i], walls[j], allSegments, out var merged))
                        {
                            walls[i] = merged;
                            walls.RemoveAt(j);
                            changed = true;
                        }
                    }
            }
            return walls;
        }

        private static bool TryMerge(WallAxis a, WallAxis b, List<Seg2> allSegments, out WallAxis merged)
        {
            merged = null;
            if (Math.Abs(a.D.Cross(b.D)) > RecognitionParams.ParallelSinTol * 1.5) return false;

            double avgTh = (a.Thickness + b.Thickness) / 2;
            if (Math.Abs(a.Thickness - b.Thickness) > Math.Max(30, avgTh * 0.35)) return false;
            if (a.LateralDistanceTo(b.Start) > avgTh * 0.5) return false;
            if (a.LateralDistanceTo(b.End) > avgTh * 0.5) return false;

            // b를 a의 파라미터 공간으로 투영 (둘 다 방향이 정규화되어 dot ≈ +1)
            double c0 = (b.P - a.P).Dot(a.D);
            double sign = a.D.Dot(b.D) >= 0 ? 1 : -1;
            double bt0 = c0 + sign * b.T0, bt1 = c0 + sign * b.T1;
            if (bt0 > bt1) { var t = bt0; bt0 = bt1; bt1 = t; }

            // 문/창으로 끊긴 벽은 갭을 건너 하나로 합쳐야 개구부 검출이 가능하다.
            // 짧은 갭(문 폭 수준)은 무조건, 긴 갭은 유리선 증거가 있을 때만 병합.
            double gapStart = Math.Min(a.T1, bt1);
            double gapEnd = Math.Max(a.T0, bt0);
            double gap = gapEnd - gapStart;
            if (gap > RecognitionParams.MergeGapPlain)
            {
                if (gap > RecognitionParams.OpeningGapMax) return false;
                if (!HasGlazingEvidence(a, gapStart, gapEnd, avgTh, allSegments)) return false;
            }

            var m = new WallAxis
            {
                P = a.P,
                D = a.D,
                T0 = Math.Min(a.T0, bt0),
                T1 = Math.Max(a.T1, bt1),
                Thickness = (a.Thickness * a.Length + b.Thickness * b.Length) /
                            Math.Max(1, a.Length + b.Length),
            };
            foreach (var iv in a.Cover.Intervals) m.Cover.Add(iv.S, iv.E);
            foreach (var iv in b.Cover.Intervals)
            {
                double s = c0 + sign * iv.S, e = c0 + sign * iv.E;
                m.Cover.Add(Math.Min(s, e), Math.Max(s, e));
            }
            merged = m;
            return true;
        }

        /// <summary>갭 구간의 벽 두께 띠 안에 벽과 평행한 선(유리선)이 있는지.</summary>
        private static bool HasGlazingEvidence(WallAxis a, double gs, double ge, double th, List<Seg2> segments)
        {
            foreach (var s in segments)
            {
                if (Math.Abs(s.Dir.Cross(a.D)) > 0.06) continue;
                if (a.LateralDistanceTo(s.A) > th / 2 + 20) continue;
                if (a.LateralDistanceTo(s.B) > th / 2 + 20) continue;

                double t0 = a.ParamOf(s.A), t1 = a.ParamOf(s.B);
                if (t0 > t1) { var t = t0; t0 = t1; t1 = t; }
                double ov = Math.Min(t1, ge) - Math.Max(t0, gs);
                if (ov > 0.3 * (ge - gs)) return true;
            }
            return false;
        }

        /// <summary>
        /// 더 두꺼운 벽의 띠 안에 통째로 들어 있는 얇은 "벽" 제거.
        /// 창 유리선 쌍이나 벽 안의 마감선 쌍이 벽으로 오인되는 것을 막는다.
        /// 단, 제거하더라도 그 구간은 두꺼운 벽의 근거(Cover)로 반영하지 않는다 —
        /// 유리선 갭은 창 검출이 따로 처리한다.
        /// </summary>
        private static void RemoveNestedWalls(List<WallAxis> walls)
        {
            walls.RemoveAll(w =>
            {
                foreach (var v in walls)
                {
                    if (ReferenceEquals(v, w) || v.Thickness <= w.Thickness) continue;
                    if (Math.Abs(w.D.Cross(v.D)) > 0.05) continue;
                    if (v.LateralDistanceTo(w.Start) > v.Thickness / 2 + 10) continue;
                    if (v.LateralDistanceTo(w.End) > v.Thickness / 2 + 10) continue;

                    double t0 = v.ParamOf(w.Start), t1 = v.ParamOf(w.End);
                    if (t0 > t1) { var t = t0; t0 = t1; t1 = t; }
                    if (t0 >= v.T0 - 50 && t1 <= v.T1 + 50) return true;
                }
                return false;
            });
        }

        // ── 4) 접합부 연장 ──────────────────────────────────────

        private static void ExtendToJunctions(List<WallAxis> walls)
        {
            foreach (var w in walls)
            {
                ExtendEnd(w, walls, isStart: true);
                ExtendEnd(w, walls, isStart: false);
            }

            // 남은 가까운 끝점끼리 스냅 (L자 코너의 미세 오차 정리)
            SnapEndpoints(walls);
        }

        private static void ExtendEnd(WallAxis w, List<WallAxis> walls, bool isStart)
        {
            Vec2 end = isStart ? w.Start : w.End;
            double bestDist = double.MaxValue;
            double bestT = 0;
            bool found = false;

            foreach (var v in walls)
            {
                if (ReferenceEquals(v, w)) continue;
                if (Math.Abs(w.D.Cross(v.D)) < 0.1) continue; // 평행 벽은 접합 대상 아님

                var ix = Geo.LineIntersection(w.P, w.D, v.P, v.D);
                if (ix == null) continue;

                double tw = w.ParamOf(ix.Value);
                double tv = v.ParamOf(ix.Value);

                // 교점이 상대 벽 구간(약간의 여유 포함) 안에 있어야 함
                if (tv < v.T0 - v.Thickness || tv > v.T1 + v.Thickness) continue;

                double endT = isStart ? w.T0 : w.T1;
                double dist = Math.Abs(tw - endT);
                double maxExtend = (w.Thickness + v.Thickness) * RecognitionParams.JoinExtendFactor / 2
                                   + RecognitionParams.EndpointSnapRadius;
                if (dist > maxExtend) continue;

                // 벽 안쪽으로 크게 잘라먹는 방향은 제외
                if (isStart && tw > w.T0 + w.Thickness) continue;
                if (!isStart && tw < w.T1 - w.Thickness) continue;

                if (dist < bestDist)
                {
                    bestDist = dist;
                    bestT = tw;
                    found = true;
                }
            }

            if (found)
            {
                if (isStart) w.T0 = Math.Min(bestT, w.T1 - 1);
                else w.T1 = Math.Max(bestT, w.T0 + 1);

                // 상대 벽도 교점까지 닿도록 연장 (L자 코너)
                foreach (var v in walls)
                {
                    if (ReferenceEquals(v, w)) continue;
                    Vec2 p = isStart ? w.Start : w.End;
                    if (v.LateralDistanceTo(p) > v.Thickness) continue;
                    double tv = v.ParamOf(p);
                    double tol = (w.Thickness + v.Thickness) * RecognitionParams.JoinExtendFactor / 2;
                    if (tv < v.T0 && v.T0 - tv < tol) v.T0 = tv;
                    else if (tv > v.T1 && tv - v.T1 < tol) v.T1 = tv;
                }
            }
        }

        private static void SnapEndpoints(List<WallAxis> walls)
        {
            // 끝점들을 모아 반경 내 클러스터의 중심으로 이동
            var pts = new List<(WallAxis W, bool IsStart, Vec2 P)>();
            foreach (var w in walls)
            {
                pts.Add((w, true, w.Start));
                pts.Add((w, false, w.End));
            }

            var used = new bool[pts.Count];
            for (int i = 0; i < pts.Count; i++)
            {
                if (used[i]) continue;
                var cluster = new List<int> { i };
                for (int j = i + 1; j < pts.Count; j++)
                {
                    if (used[j] || ReferenceEquals(pts[j].W, pts[i].W)) continue;
                    if (pts[i].P.DistanceTo(pts[j].P) <= RecognitionParams.EndpointSnapRadius)
                        cluster.Add(j);
                }
                if (cluster.Count < 2) continue;

                double cx = 0, cy = 0;
                foreach (int k in cluster) { cx += pts[k].P.X; cy += pts[k].P.Y; }
                var centroid = new Vec2(cx / cluster.Count, cy / cluster.Count);

                foreach (int k in cluster)
                {
                    used[k] = true;
                    var (w, isStart, _) = pts[k];
                    double t = w.ParamOf(centroid); // 축 방향 성분만 반영 (벽이 휘지 않도록)
                    if (isStart) { if (t < w.T1 - 1) w.T0 = t; }
                    else { if (t > w.T0 + 1) w.T1 = t; }
                }
            }
        }
    }
}
