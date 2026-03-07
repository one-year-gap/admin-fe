import { ADDON_PLANS } from "./addonPlans";
import { INTERNET_PLANS } from "./internetPlans";
import { IPTV_PLANS } from "./iptvPlans";
import { MOBILE_PLANS } from "./mobilePlans";
import { TABLET_WATCH_PLANS } from "./tabletWatchPlans";

export const PLAN_OPTIONS = {
  mobile: MOBILE_PLANS,
  tabletWatch: TABLET_WATCH_PLANS,
  addon: ADDON_PLANS,
  iptv: IPTV_PLANS,
  internet: INTERNET_PLANS,
} as const;
