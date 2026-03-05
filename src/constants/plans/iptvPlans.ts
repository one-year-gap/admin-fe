import type { MultiSelectOption } from "../customerFilters";

export const IPTV_PLANS: MultiSelectOption[] = [
  { label: "실속형", value: "PLAN_IPTV_001" },
  { label: "기본형", value: "PLAN_IPTV_002" },
  { label: "프리미엄", value: "PLAN_IPTV_003" },
  { label: "프리미엄 플러스", value: "PLAN_IPTV_004" },
  { label: "프리미엄 환승구독", value: "PLAN_IPTV_005" },
  { label: "프리미엄 유플레이", value: "PLAN_IPTV_006" },
] as const;
