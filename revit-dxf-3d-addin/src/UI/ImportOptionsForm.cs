using System;
using System.Collections.Generic;
using System.Drawing;
using System.Windows.Forms;
using Level = Autodesk.Revit.DB.Level;
using Control = System.Windows.Forms.Control;
using Point = System.Drawing.Point;
using Rectangle = System.Drawing.Rectangle;

namespace RevitDxfTo3D.UI
{
    /// <summary>DXF 파일 선택과 변환 옵션 입력 대화상자.</summary>
    public sealed class ImportOptionsForm : System.Windows.Forms.Form
    {
        private readonly TextBox _txtPath = new TextBox();
        private readonly ComboBox _cmbLevel = new ComboBox();
        private readonly ComboBox _cmbUnits = new ComboBox();
        private readonly NumericUpDown _numWallHeight = new NumericUpDown();
        private readonly CheckBox _chkFloor = new CheckBox();
        private readonly CheckBox _chkOpenings = new CheckBox();
        private readonly CheckBox _chkRooms = new CheckBox();

        private readonly List<Level> _levels;

        public string DxfPath => _txtPath.Text;
        public Level SelectedLevel => _levels[Math.Max(0, _cmbLevel.SelectedIndex)];
        public double WallHeightMm => (double)_numWallHeight.Value;
        public bool CreateFloor => _chkFloor.Checked;
        public bool CreateOpenings => _chkOpenings.Checked;
        public bool CreateRooms => _chkRooms.Checked;

        /// <summary>mm 환산 계수. null이면 자동 추정.</summary>
        public double? UnitOverride
        {
            get
            {
                switch (_cmbUnits.SelectedIndex)
                {
                    case 1: return 1.0;     // mm
                    case 2: return 10.0;    // cm
                    case 3: return 1000.0;  // m
                    case 4: return 25.4;    // inch
                    case 5: return 304.8;   // ft
                    default: return null;   // 자동
                }
            }
        }

        public ImportOptionsForm(List<Level> levels)
        {
            _levels = levels;

            Text = "DXF → 3D 변환";
            FormBorderStyle = FormBorderStyle.FixedDialog;
            MaximizeBox = false;
            MinimizeBox = false;
            StartPosition = FormStartPosition.CenterScreen;
            ClientSize = new Size(420, 300);
            Font = new Font("맑은 고딕", 9f);

            int y = 16;
            AddLabel("DXF 도면 파일", 16, y);
            _txtPath.SetBounds(16, y + 20, 310, 24);
            var btnBrowse = new Button { Text = "찾기...", Bounds = new Rectangle(334, y + 19, 70, 25) };
            btnBrowse.Click += OnBrowse;
            y += 56;

            AddLabel("기준 레벨", 16, y);
            _cmbLevel.DropDownStyle = ComboBoxStyle.DropDownList;
            _cmbLevel.SetBounds(16, y + 20, 180, 24);
            foreach (var lv in levels) _cmbLevel.Items.Add(lv.Name);
            if (levels.Count > 0) _cmbLevel.SelectedIndex = 0;

            AddLabel("도면 단위", 224, y);
            _cmbUnits.DropDownStyle = ComboBoxStyle.DropDownList;
            _cmbUnits.SetBounds(224, y + 20, 180, 24);
            _cmbUnits.Items.AddRange(new object[]
                { "자동 인식", "밀리미터(mm)", "센티미터(cm)", "미터(m)", "인치(in)", "피트(ft)" });
            _cmbUnits.SelectedIndex = 0;
            y += 56;

            AddLabel("벽 높이 (mm)", 16, y);
            _numWallHeight.SetBounds(16, y + 20, 120, 24);
            _numWallHeight.Minimum = 1000;
            _numWallHeight.Maximum = 10000;
            _numWallHeight.Increment = 100;
            _numWallHeight.Value = 2800;
            y += 56;

            _chkOpenings.Text = "문/창 개구부 생성";
            _chkOpenings.Checked = true;
            _chkOpenings.SetBounds(16, y, 160, 22);
            _chkFloor.Text = "바닥 생성";
            _chkFloor.Checked = true;
            _chkFloor.SetBounds(184, y, 100, 22);
            _chkRooms.Text = "룸(텍스트) 생성";
            _chkRooms.Checked = true;
            _chkRooms.SetBounds(290, y, 130, 22);
            y += 40;

            var btnOk = new Button
            {
                Text = "변환",
                DialogResult = DialogResult.OK,
                Bounds = new Rectangle(240, y, 80, 30),
            };
            var btnCancel = new Button
            {
                Text = "취소",
                DialogResult = DialogResult.Cancel,
                Bounds = new Rectangle(326, y, 80, 30),
            };
            btnOk.Click += (s, e) =>
            {
                if (!System.IO.File.Exists(DxfPath))
                {
                    MessageBox.Show(this, "DXF 파일을 선택하세요.", "DXF → 3D",
                        MessageBoxButtons.OK, MessageBoxIcon.Warning);
                    DialogResult = DialogResult.None;
                }
            };

            AcceptButton = btnOk;
            CancelButton = btnCancel;

            Controls.AddRange(new Control[]
            {
                _txtPath, btnBrowse, _cmbLevel, _cmbUnits, _numWallHeight,
                _chkFloor, _chkOpenings, _chkRooms, btnOk, btnCancel,
            });
        }

        private void AddLabel(string text, int x, int y)
        {
            Controls.Add(new Label { Text = text, Location = new Point(x, y), AutoSize = true });
        }

        private void OnBrowse(object sender, EventArgs e)
        {
            using (var dlg = new OpenFileDialog
            {
                Filter = "DXF 도면 (*.dxf)|*.dxf|모든 파일 (*.*)|*.*",
                Title = "DXF 도면 선택",
            })
            {
                if (dlg.ShowDialog(this) == DialogResult.OK)
                    _txtPath.Text = dlg.FileName;
            }
        }
    }
}
