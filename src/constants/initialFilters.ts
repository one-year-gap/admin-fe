import type { ChurnRiskFilters } from "@/components/domain/churn/search/FilterList";
import type { CustomerFilters } from "@/components/domain/customers/filter/FilterList";
import type { PlanFilterState } from "@/components/domain/customers/filter/PlanFilterItem";

export const INITIAL_PLAN: PlanFilterState = {
  mobile: [],
  tabletWatch: [],
  iptv: [],
  internet: [],
  addon: [],
};

export const INITIAL_FILTERS: CustomerFilters = {
  age: [],
  grade: [],
  period: [],
  gender: [],
  status: [],
  plan: INITIAL_PLAN,
};

export const INITIAL_FILTERS_CHURN: ChurnRiskFilters = {
  grade: [],
  risk: [],
};
