using System.Reflection;
using Autodesk.Revit.UI;

namespace RevitDxfTo3D
{
    /// <summary>리본 버튼 등록.</summary>
    public class App : IExternalApplication
    {
        public Result OnStartup(UIControlledApplication application)
        {
            RibbonPanel panel = application.CreateRibbonPanel("DXF → 3D");

            var button = new PushButtonData(
                "RevitDxfTo3D_Import",
                "DXF 도면\n3D 변환",
                Assembly.GetExecutingAssembly().Location,
                "RevitDxfTo3D.Commands.ImportDxfCommand")
            {
                ToolTip = "DXF 평면도를 불러와 벽/문/창/바닥/룸을 자동 인식하여 3D 모델을 생성합니다.",
                LongDescription =
                    "레이어 이름이나 선 색상에 의존하지 않고 기하학적 패턴" +
                    "(평행선 쌍 = 벽, 스윙 호 = 문, 벽 갭 = 창)으로 도면을 해석합니다.",
            };

            panel.AddItem(button);
            return Result.Succeeded;
        }

        public Result OnShutdown(UIControlledApplication application) => Result.Succeeded;
    }
}
