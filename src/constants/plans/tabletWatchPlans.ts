import type { MultiSelectOption } from "../customerFilters";

export const TABLET_WATCH_PLANS: MultiSelectOption[] = [
  { label: "5G 태블릿 4GB+데이터 나눠쓰기", value: "PLAN_TAB_001" },
  { label: "LTE Wearable", value: "PLAN_TAB_002" },
  { label: "태블릿/스마트기기 500MB + 데이터 나눠쓰기", value: "PLAN_TAB_003" },
  { label: "태블릿/스마트기기 데이터 10GB", value: "PLAN_TAB_004" },
  { label: "태블릿/스마트기기 데이터 20GB", value: "PLAN_TAB_005" },
  { label: "5G 태블릿 6GB+데이터 나눠쓰기", value: "PLAN_TAB_006" },
  { label: "태블릿/스마트기기 데이터 걱정없는 25GB", value: "PLAN_TAB_007" },
  { label: "태블릿/스마트기기 3GB + 데이터 나눠쓰기", value: "PLAN_TAB_008" },
  { label: "LTE Wearable KIDS", value: "PLAN_TAB_009" },
] as const;
