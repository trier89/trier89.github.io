using System;
using System.Collections.Generic;
using netDxf;
using netDxf.Entities;
using netDxf.Units;
using RevitDxfTo3D.Core;

namespace RevitDxfTo3D.Dxf
{
    /// <summary>DXF에서 추출한 원시 기하 (DXF 도면 단위 그대로).</summary>
    public sealed class DxfGeometry
    {
        public readonly List<Seg2> Segments = new List<Seg2>();
        public readonly List<ArcGeo> Arcs = new List<ArcGeo>();
        public readonly List<TextLabel> Texts = new List<TextLabel>();

        /// <summary>DXF 헤더(INSUNITS)가 알려준 mm 환산 계수. 모르면 null.</summary>
        public double? HeaderUnitFactor;
        public string HeaderUnitName = "지정 안 됨";
    }

    /// <summary>
    /// netDxf로 DXF를 읽어 선분/호/텍스트로 평탄화한다.
    /// 레이어와 색상으로 거르지 않고 전부 수집하되, 레이어 이름은
    /// 신뢰도 힌트(Weight)로만 사용한다 — 도면마다 레이어 체계가 달라도 동작하도록.
    /// </summary>
    public static class DxfReader
    {
        public static DxfGeometry Load(string path)
        {
            DxfDocument doc = DxfDocument.Load(path);
            if (doc == null)
                throw new InvalidOperationException("DXF 파일을 읽을 수 없습니다. (지원되지 않는 버전이거나 손상된 파일)");

            var geo = new DxfGeometry();
            geo.HeaderUnitFactor = UnitFactor(doc.DrawingVariables.InsUnits, out string unitName);
            geo.HeaderUnitName = unitName;

            foreach (EntityObject e in doc.Entities.All)
                Collect(e, geo, depth: 0);

            return geo;
        }

        private static void Collect(EntityObject e, DxfGeometry geo, int depth)
        {
            if (depth > 8) return; // 비정상적으로 깊은 중첩 블록 보호

            double w = LayerWeight(e.Layer?.Name);

            switch (e)
            {
                case Line ln:
                    AddSegment(geo, ln.StartPoint, ln.EndPoint, w);
                    break;

                case Arc arc:
                    geo.Arcs.Add(new ArcGeo
                    {
                        Center = V(arc.Center),
                        Radius = arc.Radius,
                        StartAngleDeg = arc.StartAngle,
                        EndAngleDeg = arc.EndAngle,
                        Weight = w,
                    });
                    break;

                case Polyline2D pl:
                    // Explode가 bulge(호 구간)를 Line/Arc로 풀어준다.
                    foreach (var sub in pl.Explode())
                        Collect(sub, geo, depth + 1);
                    break;

                case Polyline3D pl3:
                {
                    var vx = pl3.Vertexes;
                    for (int i = 0; i + 1 < vx.Count; i++)
                        AddSegment(geo, vx[i], vx[i + 1], w);
                    if (pl3.IsClosed && vx.Count > 2)
                        AddSegment(geo, vx[vx.Count - 1], vx[0], w);
                    break;
                }

                case Text tx:
                    AddText(geo, V(tx.Position), tx.Value, tx.Height);
                    break;

                case MText mt:
                    AddText(geo, V(mt.Position), mt.PlainText(), mt.Height);
                    break;

                case Insert ins:
                    // 블록 참조를 월드 좌표로 전개 (가구/심볼 블록도 일단 수집하고,
                    // 벽 검출 단계의 기하 조건이 알아서 걸러낸다).
                    List<EntityObject> exploded;
                    try { exploded = ins.Explode(); }
                    catch { exploded = null; }
                    if (exploded != null)
                        foreach (var sub in exploded)
                            Collect(sub, geo, depth + 1);
                    break;

                // Circle(기둥/심볼), Hatch, Dimension, Spline 등은 벽 인식에
                // 직접 쓰지 않으므로 무시한다.
                default:
                    break;
            }
        }

        private static void AddSegment(DxfGeometry geo, Vector3 a, Vector3 b, double w)
        {
            var seg = new Seg2(V(a), V(b)) { Weight = w };
            if (seg.Length > 1e-6) geo.Segments.Add(seg);
        }

        private static void AddText(DxfGeometry geo, Vec2 pos, string value, double height)
        {
            if (string.IsNullOrWhiteSpace(value)) return;
            geo.Texts.Add(new TextLabel { Position = pos, Value = value.Trim(), Height = height });
        }

        private static Vec2 V(Vector3 v) => new Vec2(v.X, v.Y);

        /// <summary>레이어 이름 기반 신뢰도 힌트. 필터가 아니라 가중치일 뿐이다.</summary>
        internal static double LayerWeight(string layerName)
        {
            if (string.IsNullOrEmpty(layerName)) return 1.0;
            string n = layerName.ToUpperInvariant();

            // 벽일 가능성이 높은 레이어
            if (n.Contains("WALL") || n.Contains("벽") || n.Contains("WAL") ||
                n.StartsWith("A-WALL") || n.StartsWith("W-"))
                return 1.6;

            // 벽이 아닐 가능성이 높은 레이어
            if (n.Contains("FURN") || n.Contains("가구") || n.Contains("SYM") ||
                n.Contains("DIM") || n.Contains("치수") || n.Contains("HATCH") ||
                n.Contains("EQP") || n.Contains("ANNO") || n.Contains("TEXT") ||
                n.Contains("CENTER") || n.Contains("중심"))
                return 0.45;

            return 1.0;
        }

        private static double? UnitFactor(DrawingUnits units, out string name)
        {
            switch (units)
            {
                case DrawingUnits.Millimeters: name = "밀리미터"; return 1.0;
                case DrawingUnits.Centimeters: name = "센티미터"; return 10.0;
                case DrawingUnits.Decimeters: name = "데시미터"; return 100.0;
                case DrawingUnits.Meters: name = "미터"; return 1000.0;
                case DrawingUnits.Inches: name = "인치"; return 25.4;
                case DrawingUnits.Feet: name = "피트"; return 304.8;
                default: name = "지정 안 됨"; return null;
            }
        }
    }
}
