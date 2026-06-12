using System;
using System.Collections.Generic;
using System.Linq;
using Autodesk.Revit.DB;
using Autodesk.Revit.DB.Structure;
using RevitDxfTo3D.Core;
using RevitDxfTo3D.Recognition;
using Opening = RevitDxfTo3D.Recognition.Opening;

namespace RevitDxfTo3D.Revit
{
    public sealed class BuildOptions
    {
        public Level Level;
        public double WallHeightMm = 2800;
        public double DoorHeightMm = 2100;
        public double WindowSillMm = 900;
        public double WindowHeadMm = 2400;
        public bool CreateFloor = true;
        public bool CreateOpenings = true;
        public bool CreateRooms = true;
        public bool UseFamiliesIfAvailable = true;
    }

    public sealed class BuildResult
    {
        public int Walls, Doors, Windows, Doorways, Rooms;
        public bool FloorCreated;
        public List<string> Warnings = new List<string>();
    }

    /// <summary>인식 결과(mm)를 Revit 요소로 생성한다.</summary>
    public sealed class ModelBuilder
    {
        private const double MmToFt = 1.0 / 304.8;

        private readonly Document _doc;
        private readonly BuildOptions _opt;
        private readonly BuildResult _result = new BuildResult();
        private readonly Dictionary<double, WallType> _wallTypes = new Dictionary<double, WallType>();

        public ModelBuilder(Document doc, BuildOptions options)
        {
            _doc = doc;
            _opt = options;
        }

        public BuildResult Build(RecognizedPlan plan)
        {
            using (var tx = new Transaction(_doc, "DXF → 3D 변환"))
            {
                var fho = tx.GetFailureHandlingOptions();
                fho.SetFailuresPreprocessor(new WarningSwallower());
                tx.SetFailureHandlingOptions(fho);
                tx.Start();

                var revitWalls = CreateWalls(plan);

                if (_opt.CreateOpenings)
                    CreateOpenings(plan, revitWalls);

                if (_opt.CreateFloor && plan.FloorLoop != null)
                    CreateFloor(plan.FloorLoop);

                if (_opt.CreateRooms && plan.RoomLabels.Count > 0)
                    CreateRooms(plan);

                tx.Commit();
            }
            return _result;
        }

        // ── 벽 ──────────────────────────────────────────────────

        private static XYZ ToXyz(Vec2 p, double zFt) => new XYZ(p.X * MmToFt, p.Y * MmToFt, zFt);

        private Dictionary<int, Wall> CreateWalls(RecognizedPlan plan)
        {
            double zFt = _opt.Level.Elevation;
            double heightFt = _opt.WallHeightMm * MmToFt;
            var map = new Dictionary<int, Wall>();

            for (int i = 0; i < plan.Walls.Count; i++)
            {
                var w = plan.Walls[i];
                try
                {
                    var line = Line.CreateBound(ToXyz(w.Start, zFt), ToXyz(w.End, zFt));
                    WallType wt = GetWallType(w.Thickness);
                    var wall = Wall.Create(_doc, line, wt.Id, _opt.Level.Id, heightFt, 0, false, false);
                    map[i] = wall;
                    _result.Walls++;
                }
                catch (Exception ex)
                {
                    _result.Warnings.Add($"벽 #{i} 생성 실패: {ex.Message}");
                }
            }
            return map;
        }

        /// <summary>두께를 25mm 단위로 양자화한 "DXF 벽 {t}mm" 타입을 찾거나 만든다.</summary>
        private WallType GetWallType(double thicknessMm)
        {
            double bucket = Math.Max(50, Math.Round(thicknessMm / 25.0) * 25.0);
            if (_wallTypes.TryGetValue(bucket, out var cached)) return cached;

            string name = $"DXF 벽 {bucket:0}mm";
            var existing = new FilteredElementCollector(_doc)
                .OfClass(typeof(WallType)).Cast<WallType>()
                .FirstOrDefault(t => t.Name == name);
            if (existing != null) return _wallTypes[bucket] = existing;

            var baseType = new FilteredElementCollector(_doc)
                .OfClass(typeof(WallType)).Cast<WallType>()
                .FirstOrDefault(t => t.Kind == WallKind.Basic);
            if (baseType == null)
                throw new InvalidOperationException("기본 벽 타입을 찾을 수 없습니다.");

            var newType = (WallType)baseType.Duplicate(name);
            var cs = CompoundStructure.CreateSingleLayerCompoundStructure(
                MaterialFunctionAssignment.Structure, bucket * MmToFt, ElementId.InvalidElementId);
            newType.SetCompoundStructure(cs);
            return _wallTypes[bucket] = newType;
        }

        // ── 문/창 ───────────────────────────────────────────────

        private void CreateOpenings(RecognizedPlan plan, Dictionary<int, Wall> revitWalls)
        {
            FamilySymbol doorSymbol = _opt.UseFamiliesIfAvailable
                ? FindSymbol(BuiltInCategory.OST_Doors) : null;
            FamilySymbol windowSymbol = _opt.UseFamiliesIfAvailable
                ? FindSymbol(BuiltInCategory.OST_Windows) : null;

            _doc.Regenerate();

            foreach (var o in plan.Openings)
            {
                if (!revitWalls.TryGetValue(o.WallIndex, out var wall)) continue;
                var axis = plan.Walls[o.WallIndex];

                try
                {
                    switch (o.Kind)
                    {
                        case OpeningKind.Door:
                            if (!TryPlaceFamily(doorSymbol, wall, axis, o, sillMm: 0))
                                CutRectOpening(wall, axis, o, 0, _opt.DoorHeightMm);
                            _result.Doors++;
                            break;

                        case OpeningKind.Window:
                            if (!TryPlaceFamily(windowSymbol, wall, axis, o, sillMm: _opt.WindowSillMm))
                                CutRectOpening(wall, axis, o, _opt.WindowSillMm,
                                    Math.Min(_opt.WindowHeadMm, _opt.WallHeightMm - 100));
                            _result.Windows++;
                            break;

                        case OpeningKind.Doorway:
                            CutRectOpening(wall, axis, o, 0, _opt.DoorHeightMm);
                            _result.Doorways++;
                            break;
                    }
                }
                catch (Exception ex)
                {
                    _result.Warnings.Add($"개구부 생성 실패 ({o.Kind}): {ex.Message}");
                }
            }
        }

        private FamilySymbol FindSymbol(BuiltInCategory cat)
        {
            return new FilteredElementCollector(_doc)
                .OfClass(typeof(FamilySymbol))
                .OfCategory(cat)
                .Cast<FamilySymbol>()
                .FirstOrDefault();
        }

        private bool TryPlaceFamily(FamilySymbol symbol, Wall wall, WallAxis axis, Opening o, double sillMm)
        {
            if (symbol == null) return false;
            try
            {
                if (!symbol.IsActive) symbol.Activate();
                double tMid = (o.T0 + o.T1) / 2;
                XYZ p = ToXyz(axis.PointAt(tMid), _opt.Level.Elevation);
                var inst = _doc.Create.NewFamilyInstance(
                    p, symbol, wall, _opt.Level, StructuralType.NonStructural);

                if (sillMm > 0)
                    inst.get_Parameter(BuiltInParameter.INSTANCE_SILL_HEIGHT_PARAM)
                        ?.Set(sillMm * MmToFt);
                return true;
            }
            catch
            {
                return false; // 패밀리 배치 실패 시 사각 개구부로 폴백
            }
        }

        private void CutRectOpening(Wall wall, WallAxis axis, Opening o, double sillMm, double headMm)
        {
            double z0 = _opt.Level.Elevation + sillMm * MmToFt;
            double z1 = _opt.Level.Elevation + headMm * MmToFt;
            XYZ p0 = ToXyz(axis.PointAt(o.T0), z0);
            XYZ p1 = ToXyz(axis.PointAt(o.T1), z1);
            _doc.Create.NewOpening(wall, p0, p1);
        }

        // ── 바닥 ────────────────────────────────────────────────

        private void CreateFloor(List<Vec2> loopMm)
        {
            try
            {
                double zFt = _opt.Level.Elevation;
                var loop = new CurveLoop();
                for (int i = 0; i < loopMm.Count; i++)
                {
                    XYZ a = ToXyz(loopMm[i], zFt);
                    XYZ b = ToXyz(loopMm[(i + 1) % loopMm.Count], zFt);
                    if (a.DistanceTo(b) < 0.01) continue;
                    loop.Append(Line.CreateBound(a, b));
                }

                var floorType = new FilteredElementCollector(_doc)
                    .OfClass(typeof(FloorType)).Cast<FloorType>()
                    .FirstOrDefault(t => t.IsFoundationSlab == false)
                    ?? new FilteredElementCollector(_doc)
                        .OfClass(typeof(FloorType)).Cast<FloorType>().FirstOrDefault();
                if (floorType == null)
                {
                    _result.Warnings.Add("바닥 타입이 없어 바닥을 생성하지 못했습니다.");
                    return;
                }

                Floor.Create(_doc, new List<CurveLoop> { loop }, floorType.Id, _opt.Level.Id);
                _result.FloorCreated = true;
            }
            catch (Exception ex)
            {
                _result.Warnings.Add($"바닥 생성 실패: {ex.Message}");
            }
        }

        // ── 룸 ──────────────────────────────────────────────────

        private void CreateRooms(RecognizedPlan plan)
        {
            _doc.Regenerate(); // 벽이 룸 경계로 인식되도록

            foreach (var label in plan.RoomLabels)
            {
                try
                {
                    var uv = new UV(label.Position.X * MmToFt, label.Position.Y * MmToFt);
                    var room = _doc.Create.NewRoom(_opt.Level, uv);
                    if (room != null)
                    {
                        room.Name = label.Value;
                        _result.Rooms++;
                    }
                }
                catch (Exception ex)
                {
                    _result.Warnings.Add($"룸 '{label.Value}' 생성 실패: {ex.Message}");
                }
            }
        }

        /// <summary>대량 생성 시 경고 대화상자가 쏟아지지 않도록 경고를 흡수한다.</summary>
        private sealed class WarningSwallower : IFailuresPreprocessor
        {
            public FailureProcessingResult PreprocessFailures(FailuresAccessor accessor)
            {
                accessor.DeleteAllWarnings();
                return FailureProcessingResult.Continue;
            }
        }
    }
}
