using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using RevitDxfTo3D.Dxf;
using RevitDxfTo3D.Recognition;
using RevitDxfTo3D.Revit;
using RevitDxfTo3D.UI;
// .NET 8 WinForms에도 TaskDialog가 있어 Revit 것과 충돌하므로 명시적으로 고정
using TaskDialog = Autodesk.Revit.UI.TaskDialog;

namespace RevitDxfTo3D.Commands
{
    [Transaction(TransactionMode.Manual)]
    [Regeneration(RegenerationOption.Manual)]
    public class ImportDxfCommand : IExternalCommand
    {
        public Result Execute(ExternalCommandData commandData, ref string message, ElementSet elements)
        {
            UIDocument uidoc = commandData.Application.ActiveUIDocument;
            if (uidoc == null)
            {
                message = "열려 있는 문서가 없습니다.";
                return Result.Failed;
            }
            Document doc = uidoc.Document;

            var levels = new FilteredElementCollector(doc)
                .OfClass(typeof(Level)).Cast<Level>()
                .OrderBy(l => l.Elevation)
                .ToList();
            if (levels.Count == 0)
            {
                message = "프로젝트에 레벨이 없습니다.";
                return Result.Failed;
            }

            using (var form = new ImportOptionsForm(levels))
            {
                if (form.ShowDialog() != DialogResult.OK)
                    return Result.Cancelled;

                try
                {
                    // 1) DXF 읽기
                    DxfGeometry dxf = DxfReader.Load(form.DxfPath);
                    if (dxf.Segments.Count == 0)
                    {
                        TaskDialog.Show("DXF → 3D", "DXF에서 선 기하를 찾지 못했습니다.");
                        return Result.Cancelled;
                    }

                    // 2) 도면 인식
                    RecognizedPlan plan = PlanAnalyzer.Analyze(dxf, form.UnitOverride);
                    if (plan.Walls.Count == 0)
                    {
                        TaskDialog.Show("DXF → 3D",
                            "벽을 인식하지 못했습니다.\n\n" +
                            "- 도면 단위를 직접 지정해 보세요.\n" +
                            "- 벽이 단선(1줄)으로만 그려진 도면은 지원되지 않습니다.\n\n" +
                            $"단위 판단: {plan.UnitSource}\n" +
                            string.Join("\n", plan.Notes));
                        return Result.Cancelled;
                    }

                    // 3) Revit 요소 생성
                    var options = new BuildOptions
                    {
                        Level = form.SelectedLevel,
                        WallHeightMm = form.WallHeightMm,
                        CreateFloor = form.CreateFloor,
                        CreateOpenings = form.CreateOpenings,
                        CreateRooms = form.CreateRooms,
                    };
                    BuildResult result = new ModelBuilder(doc, options).Build(plan);

                    ShowReport(plan, result);
                    return Result.Succeeded;
                }
                catch (Exception ex)
                {
                    message = ex.Message;
                    TaskDialog.Show("DXF → 3D 오류", ex.ToString());
                    return Result.Failed;
                }
            }
        }

        private static void ShowReport(RecognizedPlan plan, BuildResult result)
        {
            var sb = new StringBuilder();
            sb.AppendLine($"벽: {result.Walls}개");
            sb.AppendLine($"문: {result.Doors}개 / 창: {result.Windows}개 / 개구부: {result.Doorways}개");
            sb.AppendLine($"룸: {result.Rooms}개 / 바닥: {(result.FloorCreated ? "생성됨" : "생성 안 됨")}");
            sb.AppendLine();
            sb.AppendLine($"도면 단위: {plan.UnitSource} (×{plan.UnitFactor:0.###} → mm)");
            sb.AppendLine();
            sb.AppendLine("── 인식 과정 ──");
            foreach (var note in plan.Notes) sb.AppendLine("· " + note);

            if (result.Warnings.Count > 0)
            {
                sb.AppendLine();
                sb.AppendLine($"── 경고 ({result.Warnings.Count}건, 최대 10건 표시) ──");
                foreach (var w in result.Warnings.Take(10)) sb.AppendLine("· " + w);
            }

            TaskDialog.Show("DXF → 3D 변환 완료", sb.ToString());
        }
    }
}
