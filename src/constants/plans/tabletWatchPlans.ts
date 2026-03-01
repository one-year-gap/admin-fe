import type { MultiSelectOption } from "../customerFilters";

export const TABLET_WATCH_PLANS: MultiSelectOption[] = [
  { label: "5G 태블릿 4GB+데이터 나눠쓰기", value: "tablet_5g_4gb_share" },
  { label: "LTE Wearable", value: "lte_wearable" },
  { label: "태블릿/스마트기기 500MB + 데이터 나눠쓰기", value: "tablet_device_500mb_share" },
  { label: "태블릿/스마트기기 데이터 10GB", value: "tablet_device_10gb" },
  { label: "태블릿/스마트기기 데이터 20GB", value: "tablet_device_20gb" },
  { label: "5G 태블릿 6GB+데이터 나눠쓰기", value: "tablet_5g_6gb_share" },
  { label: "태블릿/스마트기기 데이터 걱정없는 25GB", value: "tablet_device_no_worry_25gb" },
  { label: "태블릿/스마트기기 3GB + 데이터 나눠쓰기", value: "tablet_device_3gb_share" },
  { label: "LTE Wearable KIDS", value: "lte_wearable_kids" },
] as const;
