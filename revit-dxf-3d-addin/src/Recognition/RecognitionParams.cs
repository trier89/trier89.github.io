namespace RevitDxfTo3D.Recognition
{
    /// <summary>
    /// 인식 휴리스틱 튜닝 상수. 모든 길이 단위는 mm (단위 정규화 이후 기준).
    /// 도면 스타일에 따라 결과가 아쉬우면 이 값들을 조정하세요.
    /// </summary>
    public static class RecognitionParams
    {
        // ── 벽 검출 ──────────────────────────────────────────────
        /// <summary>벽 후보로 고려할 선분의 최소 길이.</summary>
        public const double MinSegmentLength = 80;

        /// <summary>벽 두께로 인정하는 평행선 간격 범위.</summary>
        public const double WallThicknessMin = 50;
        public const double WallThicknessMax = 500;

        /// <summary>일반적인 벽 두께 범위 (이 범위는 점수 가중치를 받음).</summary>
        public const double TypicalThicknessMin = 70;
        public const double TypicalThicknessMax = 350;

        /// <summary>평행 판정 각도 허용치 (sin 값, 0.03 ≈ 1.7도).</summary>
        public const double ParallelSinTol = 0.03;

        /// <summary>평행선 쌍의 양 끝 거리 차 허용치 (살짝 비스듬한 선 허용).</summary>
        public const double DistanceVariationTol = 12;

        /// <summary>벽 후보로 인정하는 최소 평행 중첩 길이.</summary>
        public const double MinOverlap = 250;

        /// <summary>이미 사용된 선분 구간 비율이 이 값 이상이면 후보 기각.</summary>
        public const double MaxClaimedFraction = 0.5;

        /// <summary>
        /// 동일 직선상 벽 조각 병합 시 무조건 허용하는 갭 (문/통로 폭 수준).
        /// 이보다 긴 갭은 갭 안에 유리선(벽과 평행한 선) 증거가 있을 때만 병합.
        /// </summary>
        public const double MergeGapPlain = 1800;

        /// <summary>최종 벽의 최소 길이.</summary>
        public const double MinWallLength = 250;

        /// <summary>T자/L자 접합부에서 벽 끝을 연장해 붙이는 최대 거리 (두께 합 배수).</summary>
        public const double JoinExtendFactor = 1.6;

        /// <summary>끝점 클러스터링 반경.</summary>
        public const double EndpointSnapRadius = 200;

        // ── 문/창 검출 ────────────────────────────────────────────
        /// <summary>문 스윙 호의 반지름 범위 (= 문 폭).</summary>
        public const double DoorRadiusMin = 450;
        public const double DoorRadiusMax = 1500;

        /// <summary>문 스윙 호의 중심각 범위 (도).</summary>
        public const double DoorSweepMinDeg = 45;
        public const double DoorSweepMaxDeg = 200;

        /// <summary>창/개구부로 인정하는 벽 커버리지 갭 길이 범위.</summary>
        public const double OpeningGapMin = 300;
        public const double OpeningGapMax = 5000;

        // ── 단위 추정 ─────────────────────────────────────────────
        /// <summary>단위 추정 시 가정하는 건물의 대표 크기 (mm).</summary>
        public const double AssumedBuildingSize = 30000;

        // ── 룸 라벨 ──────────────────────────────────────────────
        /// <summary>룸 이름으로 인정하는 텍스트 최대 길이.</summary>
        public const int MaxRoomNameLength = 24;
    }
}
