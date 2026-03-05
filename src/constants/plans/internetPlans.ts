import type { MultiSelectOption } from "../customerFilters";

export const INTERNET_PLANS: MultiSelectOption[] = [
  { label: "와이파이기본_기가안심 1G", value: "PLAN_INT_001" },
  { label: "와이파이기본_기가슬림안심 500M", value: "PLAN_INT_002" },
  { label: "와이파이기본_광랜안심 100M", value: "PLAN_INT_003" },
  { label: "프리미엄 안심 보상 1G", value: "PLAN_INT_004" },
  { label: "프리미엄 안심 보상 500M", value: "PLAN_INT_005" },
  { label: "프리미엄 안심 보상 100M", value: "PLAN_INT_006" },
  { label: "프리미엄 안심 1기가", value: "PLAN_INT_007" },
  { label: "프리미엄 안심 500M", value: "PLAN_INT_008" },
  { label: "프리미엄 안심 100M", value: "PLAN_INT_009" },
] as const;
