import type { MultiSelectOption } from "../customerFilters";

export const IPTV_PLANS: MultiSelectOption[] = [
  { label: "실속형", value: "iptv_value" },
  { label: "기본형", value: "iptv_basic" },
  { label: "프리미엄", value: "iptv_premium" },
  { label: "프리미엄 플러스", value: "iptv_premium_plus" },
  { label: "프리미엄 환승구독", value: "iptv_premium_transfer_subscription" },
  { label: "프리미엄 유플레이", value: "iptv_premium_uplay" },
] as const;
