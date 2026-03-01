import type { MultiSelectOption } from "../customerFilters";

export const INTERNET_PLANS: MultiSelectOption[] = [
  { label: "와이파이기본_기가안심 1G", value: "wifi_basic_giga_safe_1g" },
  { label: "와이파이기본_기가슬림안심 500M", value: "wifi_basic_giga_slim_safe_500m" },
  { label: "와이파이기본_광랜안심 100M", value: "wifi_basic_gwanglan_safe_100m" },
  { label: "프리미엄 안심 보상 1G", value: "premium_safe_compensation_1g" },
  { label: "프리미엄 안심 보상 500M", value: "premium_safe_compensation_500m" },
  { label: "프리미엄 안심 보상 100M", value: "premium_safe_compensation_100m" },
  { label: "프리미엄 안심 1기가", value: "premium_safe_1g" },
  { label: "프리미엄 안심 500M", value: "premium_safe_500m" },
  { label: "프리미엄 안심 100M", value: "premium_safe_100m" },
] as const;
