using System;
using System.Collections.Generic;
using System.Linq;
using RevitDxfTo3D.Core;

namespace RevitDxfTo3D.Recognition
{
    /// <summary>
    /// 벽 중심선 그래프에서 건물 외곽 루프를 찾아 바닥 경계를 만든다.
    /// 끝점을 노드로 클러스터링 → T자 지점에서 에지 분할 → 최하단 노드에서
    /// "가장 오른쪽으로 도는" 면 추적으로 외곽 다각형을 얻는다.
    /// </summary>
    public static class FloorOutline
    {
        public static List<Vec2> Find(List<WallAxis> walls, List<string> notes)
        {
            if (walls.Count < 3) return null;

            try
            {
                var (nodes, edges) = BuildGraph(walls);
                if (nodes.Count < 3 || edges.Count < 3) return null;

                var loop = TraceOuterLoop(nodes, edges);
                if (loop == null || loop.Count < 3) return null;

                double area = Math.Abs(Geo.SignedArea(loop));
                if (area < 4e6) return null; // 4㎡ 미만이면 외곽으로 보기 어려움

                // 인식된 벽 대부분을 포함해야 진짜 외곽이다
                int inside = walls.Count(w => Geo.PointInPolygon(w.PointAt((w.T0 + w.T1) / 2), loop));
                if (inside < walls.Count * 0.6)
                {
                    notes?.Add("외곽 루프가 벽 전체를 포함하지 못해 바닥 생성을 건너뜁니다.");
                    return null;
                }

                notes?.Add($"바닥 외곽 인식: {loop.Count}개 꼭짓점, 약 {area / 1e6:0.#}㎡");
                return Simplify(loop);
            }
            catch
            {
                return null; // 바닥은 최선 노력 — 실패해도 벽 생성은 계속
            }
        }

        // ── 그래프 구성 ─────────────────────────────────────────

        private static (List<Vec2> Nodes, List<(int A, int B)> Edges) BuildGraph(List<WallAxis> walls)
        {
            double snap = RecognitionParams.EndpointSnapRadius * 1.2;
            var nodes = new List<Vec2>();

            int NodeOf(Vec2 p)
            {
                for (int i = 0; i < nodes.Count; i++)
                    if (nodes[i].DistanceTo(p) <= snap) return i;
                nodes.Add(p);
                return nodes.Count - 1;
            }

            // 벽 끝점 노드 등록
            foreach (var w in walls) { NodeOf(w.Start); NodeOf(w.End); }

            // 각 벽을 그 위에 놓인 노드들(T자 접합점)에서 분할해 에지 생성
            var edgeSet = new HashSet<(int, int)>();
            var edges = new List<(int A, int B)>();

            foreach (var w in walls)
            {
                var cuts = new List<double> { w.T0, w.T1 };
                for (int i = 0; i < nodes.Count; i++)
                {
                    double lat = w.LateralDistanceTo(nodes[i]);
                    if (lat > w.Thickness / 2 + snap / 2) continue;
                    double t = w.ParamOf(nodes[i]);
                    if (t > w.T0 + 1 && t < w.T1 - 1) cuts.Add(t);
                }
                cuts.Sort();

                for (int i = 0; i + 1 < cuts.Count; i++)
                {
                    if (cuts[i + 1] - cuts[i] < snap / 2) continue;
                    int a = NodeOf(w.PointAt(cuts[i]));
                    int b = NodeOf(w.PointAt(cuts[i + 1]));
                    if (a == b) continue;
                    var key = (Math.Min(a, b), Math.Max(a, b));
                    if (edgeSet.Add(key)) edges.Add(key);
                }
            }
            return (nodes, edges);
        }

        // ── 외곽 면 추적 ────────────────────────────────────────

        private static List<Vec2> TraceOuterLoop(List<Vec2> nodes, List<(int A, int B)> edges)
        {
            // 인접 리스트
            var adj = new Dictionary<int, List<int>>();
            void Link(int a, int b)
            {
                if (!adj.TryGetValue(a, out var l)) adj[a] = l = new List<int>();
                if (!l.Contains(b)) l.Add(b);
            }
            foreach (var (a, b) in edges) { Link(a, b); Link(b, a); }

            // 최하단 노드에서 시작
            int start = -1;
            for (int i = 0; i < nodes.Count; i++)
            {
                if (!adj.ContainsKey(i)) continue;
                if (start < 0 || nodes[i].Y < nodes[start].Y ||
                    (Math.Abs(nodes[i].Y - nodes[start].Y) < 1e-9 && nodes[i].X < nodes[start].X))
                    start = i;
            }
            if (start < 0) return null;

            // 시작 에지: +x축에서 반시계로 가장 가까운 방향 (외곽을 오른쪽 어깨에 끼고 출발)
            // 여기서는 각도 0(정동쪽)이 최우선이어야 하므로 0을 한 바퀴로 보정하지 않는다.
            int next = adj[start]
                .OrderBy(n =>
                {
                    double a = Math.Atan2(nodes[n].Y - nodes[start].Y, nodes[n].X - nodes[start].X);
                    return a < -1e-9 ? a + Math.PI * 2 : a;
                })
                .First();

            var loop = new List<int> { start };
            int prev = start, cur = next;
            int guard = edges.Count * 4 + 8;

            while (guard-- > 0)
            {
                loop.Add(cur);
                if (cur == start && loop.Count > 2) break;

                var nbrs = adj[cur];
                int chosen;
                if (nbrs.Count == 1)
                {
                    chosen = nbrs[0]; // 막다른 길은 되돌아간다
                }
                else
                {
                    // 들어온 방향의 역방향에서 반시계로 가장 가까운 에지 = 가장 오른쪽 턴
                    double inAng = Math.Atan2(nodes[prev].Y - nodes[cur].Y, nodes[prev].X - nodes[cur].X);
                    chosen = -1;
                    double best = double.MaxValue;
                    foreach (int n in nbrs)
                    {
                        if (n == prev) continue;
                        double ang = Math.Atan2(nodes[n].Y - nodes[cur].Y, nodes[n].X - nodes[cur].X);
                        double diff = PositiveAngle(ang - inAng);
                        if (diff < best) { best = diff; chosen = n; }
                    }
                    if (chosen < 0) chosen = prev;
                }
                prev = cur;
                cur = chosen;
            }

            if (loop.Count < 4 || loop[loop.Count - 1] != start) return null;
            loop.RemoveAt(loop.Count - 1);

            // 막다른 길 왕복(A→B→A) 제거
            bool removed = true;
            while (removed && loop.Count >= 3)
            {
                removed = false;
                for (int i = 0; i < loop.Count; i++)
                {
                    int a = loop[i];
                    int c = loop[(i + 2) % loop.Count];
                    if (a == c)
                    {
                        int j = (i + 1) % loop.Count;
                        if (j > i) { loop.RemoveAt(j); loop.RemoveAt(i % loop.Count == loop.Count ? 0 : i); }
                        else { loop.RemoveAt(i); loop.RemoveAt(j); }
                        removed = true;
                        break;
                    }
                }
            }

            if (loop.Count < 3) return null;
            return loop.Select(i => nodes[i]).ToList();
        }

        private static double PositiveAngle(double a)
        {
            const double tau = Math.PI * 2;
            a %= tau;
            if (a < 1e-9) a += tau; // 0은 "되돌아가기"이므로 한 바퀴로 취급
            return a;
        }

        /// <summary>거의 일직선인 꼭짓점과 너무 가까운 꼭짓점 제거.</summary>
        private static List<Vec2> Simplify(List<Vec2> poly)
        {
            var result = new List<Vec2>();
            int n = poly.Count;
            for (int i = 0; i < n; i++)
            {
                var prev = poly[(i + n - 1) % n];
                var cur = poly[i];
                var next = poly[(i + 1) % n];
                if (cur.DistanceTo(prev) < 10) continue;
                var d1 = (cur - prev).Normalized();
                var d2 = (next - cur).Normalized();
                if (Math.Abs(d1.Cross(d2)) < 0.01 && d1.Dot(d2) > 0) continue; // 일직선
                result.Add(cur);
            }
            return result.Count >= 3 ? result : poly;
        }
    }
}
