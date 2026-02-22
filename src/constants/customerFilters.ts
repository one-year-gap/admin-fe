export type MultiSelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export const AGE_OPTIONS: MultiSelectOption[] = [
  { label: "10대", value: "10s" },
  { label: "20대", value: "20s" },
  { label: "30대", value: "30s" },
  { label: "40대", value: "40s" },
  { label: "50대", value: "50s" },
  { label: "60대", value: "60s" },
  { label: "65세 이상", value: "65plus" },
];

export const GRADE_OPTIONS: MultiSelectOption[] = [
  { label: "우수", value: "good" },
  { label: "VIP", value: "vip" },
  { label: "VVIP", value: "vvip" },
];

export const PERIOD_OPTIONS: MultiSelectOption[] = [
  { label: "1년미만", value: "lt1y" },
  { label: "1년이상 2년미만", value: "1to2y" },
  { label: "2년이상", value: "gte2y" },
];

export const GENDER_OPTIONS: MultiSelectOption[] = [
  { label: "남성", value: "M" },
  { label: "여성", value: "F" },
];

export const CHARACTER_OPTIONS: MultiSelectOption[] = [
  { label: "다이어터", value: "dieter" },
  { label: "자유영혼", value: "free_spirit" },
  { label: "디바이스 마스터", value: "device_master" },
  { label: "콜렉터", value: "collector" },
  { label: "탐험가", value: "explorer" },
];

export const CHURN_RISK_OPTIONS: MultiSelectOption[] = [
  { label: "low", value: "low" },
  { label: "middle", value: "middle" },
  { label: "high", value: "high" },
];

export const CSAT_OPTIONS: MultiSelectOption[] = [
  { label: "매우만족", value: "very_satisfied" },
  { label: "만족", value: "satisfied" },
  { label: "보통", value: "neutral" },
  { label: "불만족", value: "dissatisfied" },
  { label: "매우불만족", value: "very_dissatisfied" },
];

/** 요금제 mock (각 컬럼별로 별도 배열) */
export const PLAN_OPTIONS = {
  mobile5gLte: [
    { label: "5G 프리미엄", value: "5g_premium" },
    { label: "5G 스탠다드", value: "5g_standard" },
    { label: "LTE 베이직", value: "lte_basic" },
  ],
  tabletWatch: [
    { label: "워치 베이직", value: "watch_basic" },
    { label: "태블릿 쉐어", value: "tablet_share" },
  ],
  addon: [
    { label: "데이터 추가 5GB", value: "addon_data_5" },
    { label: "로밍 패스", value: "addon_roaming" },
    { label: "뮤직", value: "addon_music" },
  ],
  iptv: [
    { label: "IPTV 라이트", value: "iptv_light" },
    { label: "IPTV 프리미엄", value: "iptv_premium" },
  ],
  internet: [
    { label: "인터넷 500M", value: "internet_500" },
    { label: "인터넷 1G", value: "internet_1g" },
  ],
} as const;
