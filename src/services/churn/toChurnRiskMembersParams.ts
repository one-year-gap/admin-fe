import type { ChurnRiskFilters } from "@/components/domain/churn/search/FilterList";
import type { ChurnRiskMembersQuery } from "@/models/churn/churnRiskMembers";

export function toChurnRiskMembersParams(args: {
  page: number;
  size: number;
  keyword: string;
  filters: ChurnRiskFilters;
}): ChurnRiskMembersQuery {
  const { page, size, keyword, filters } = args;

  return {
    page,
    size,
    keyword: keyword.trim().length > 0 ? keyword.trim() : undefined,
    memberships: filters.grade.length ? filters.grade : undefined,
    riskLevels: filters.risk.length ? filters.risk : undefined,
  };
}
