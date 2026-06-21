using System;
using System.Collections.Generic;

namespace RevitDxfTo3D.Core
{
    /// <summary>2D 벡터/점 (단위: mm, 정규화 이후).</summary>
    public readonly struct Vec2
    {
        public readonly double X;
        public readonly double Y;

        public Vec2(double x, double y) { X = x; Y = y; }

        public static Vec2 operator +(Vec2 a, Vec2 b) => new Vec2(a.X + b.X, a.Y + b.Y);
        public static Vec2 operator -(Vec2 a, Vec2 b) => new Vec2(a.X - b.X, a.Y - b.Y);
        public static Vec2 operator *(Vec2 a, double s) => new Vec2(a.X * s, a.Y * s);
        public static Vec2 operator -(Vec2 a) => new Vec2(-a.X, -a.Y);

        public double Dot(Vec2 o) => X * o.X + Y * o.Y;
        public double Cross(Vec2 o) => X * o.Y - Y * o.X;
        public double Length => Math.Sqrt(X * X + Y * Y);

        public Vec2 Normalized()
        {
            double len = Length;
            return len < 1e-12 ? new Vec2(1, 0) : new Vec2(X / len, Y / len);
        }

        /// <summary>좌측 법선 (반시계 90도 회전).</summary>
        public Vec2 Perp() => new Vec2(-Y, X);

        public double DistanceTo(Vec2 o) => (o - this).Length;

        public override string ToString() => $"({X:0.#},{Y:0.#})";
    }

    /// <summary>2D 선분. Weight는 레이어 이름 기반의 신뢰도 힌트.</summary>
    public sealed class Seg2
    {
        public Vec2 A;
        public Vec2 B;
        public double Weight = 1.0;

        public Seg2(Vec2 a, Vec2 b) { A = a; B = b; }

        public double Length => A.DistanceTo(B);
        public Vec2 Dir => (B - A).Normalized();
        public Vec2 Mid => new Vec2((A.X + B.X) / 2, (A.Y + B.Y) / 2);

        /// <summary>점을 이 선분의 무한 직선에 투영한 파라미터 (A 기준, mm).</summary>
        public double ParamOf(Vec2 p) => (p - A).Dot(Dir);

        /// <summary>점에서 무한 직선까지의 부호 있는 거리.</summary>
        public double SignedDistanceTo(Vec2 p) => (p - A).Dot(Dir.Perp());

        /// <summary>점에서 "선분"까지의 거리.</summary>
        public double SegmentDistanceTo(Vec2 p)
        {
            double t = ParamOf(p);
            double len = Length;
            if (t <= 0) return A.DistanceTo(p);
            if (t >= len) return B.DistanceTo(p);
            return Math.Abs(SignedDistanceTo(p));
        }
    }

    /// <summary>호 (도 단위 각도, CCW).</summary>
    public sealed class ArcGeo
    {
        public Vec2 Center;
        public double Radius;
        public double StartAngleDeg;
        public double EndAngleDeg;
        public double Weight = 1.0;

        public double SweepDeg => ((EndAngleDeg - StartAngleDeg) % 360 + 360) % 360;

        public Vec2 PointAt(double angleDeg)
        {
            double r = angleDeg * Math.PI / 180.0;
            return Center + new Vec2(Math.Cos(r), Math.Sin(r)) * Radius;
        }

        public Vec2 StartPoint => PointAt(StartAngleDeg);
        public Vec2 EndPoint => PointAt(EndAngleDeg);
    }

    /// <summary>도면 텍스트.</summary>
    public sealed class TextLabel
    {
        public Vec2 Position;
        public string Value;
        public double Height;
    }

    /// <summary>1차원 구간 집합. 벽 축 위의 "근거(선분) 커버리지" 추적에 사용.</summary>
    public sealed class IntervalSet
    {
        private readonly List<(double S, double E)> _iv = new List<(double, double)>();
        private bool _dirty;

        public void Add(double s, double e)
        {
            if (e < s) { var t = s; s = e; e = t; }
            if (e - s < 1e-9) return;
            _iv.Add((s, e));
            _dirty = true;
        }

        public IReadOnlyList<(double S, double E)> Intervals
        {
            get { Normalize(); return _iv; }
        }

        private void Normalize()
        {
            if (!_dirty) return;
            _dirty = false;
            if (_iv.Count <= 1) return;
            _iv.Sort((a, b) => a.S.CompareTo(b.S));
            var merged = new List<(double S, double E)>();
            var cur = _iv[0];
            for (int i = 1; i < _iv.Count; i++)
            {
                if (_iv[i].S <= cur.E + 1e-9)
                    cur = (cur.S, Math.Max(cur.E, _iv[i].E));
                else
                {
                    merged.Add(cur);
                    cur = _iv[i];
                }
            }
            merged.Add(cur);
            _iv.Clear();
            _iv.AddRange(merged);
        }

        /// <summary>[s,e] 범위 내에서 덮인 길이.</summary>
        public double CoveredLength(double s, double e)
        {
            Normalize();
            double cov = 0;
            foreach (var iv in _iv)
            {
                double a = Math.Max(s, iv.S);
                double b = Math.Min(e, iv.E);
                if (b > a) cov += b - a;
            }
            return cov;
        }

        /// <summary>[s,e] 범위 내에서 덮이지 않은 구간들.</summary>
        public List<(double S, double E)> GapsWithin(double s, double e)
        {
            Normalize();
            var gaps = new List<(double S, double E)>();
            double cursor = s;
            foreach (var iv in _iv)
            {
                if (iv.E <= s) continue;
                if (iv.S >= e) break;
                if (iv.S > cursor) gaps.Add((cursor, Math.Min(iv.S, e)));
                cursor = Math.Max(cursor, iv.E);
                if (cursor >= e) break;
            }
            if (cursor < e) gaps.Add((cursor, e));
            return gaps;
        }
    }

    public static class Geo
    {
        /// <summary>두 무한 직선 (p1,d1), (p2,d2)의 교점. 평행이면 null.</summary>
        public static Vec2? LineIntersection(Vec2 p1, Vec2 d1, Vec2 p2, Vec2 d2)
        {
            double denom = d1.Cross(d2);
            if (Math.Abs(denom) < 1e-9) return null;
            double t = (p2 - p1).Cross(d2) / denom;
            return p1 + d1 * t;
        }

        /// <summary>레이 캐스팅 점-다각형 내부 판정.</summary>
        public static bool PointInPolygon(Vec2 p, IReadOnlyList<Vec2> poly)
        {
            bool inside = false;
            int n = poly.Count;
            for (int i = 0, j = n - 1; i < n; j = i++)
            {
                var a = poly[i];
                var b = poly[j];
                if ((a.Y > p.Y) != (b.Y > p.Y) &&
                    p.X < (b.X - a.X) * (p.Y - a.Y) / (b.Y - a.Y) + a.X)
                    inside = !inside;
            }
            return inside;
        }

        /// <summary>다각형의 부호 있는 면적 (CCW 양수).</summary>
        public static double SignedArea(IReadOnlyList<Vec2> poly)
        {
            double a = 0;
            for (int i = 0, j = poly.Count - 1; i < poly.Count; j = i++)
                a += poly[j].Cross(poly[i]);
            return a / 2;
        }
    }
}
