import type { CustomerFilters } from "@/components/domain/customers/filter/FilterList";
import type { MemberSearchRequestDTO } from "@/models/customers/adminMembers";

export function toAdminMembersParams(args: {
  page: number;
  size: number;
  keyword: string;
  filters: CustomerFilters;
}): MemberSearchRequestDTO {
  const { page, size, keyword, filters } = args;

  const planNames = [
    ...filters.plan.mobile,
    ...filters.plan.tabletWatch,
    ...filters.plan.iptv,
    ...filters.plan.internet,
    ...filters.plan.addon,
  ];

  // gender는 UI가 string[]인데 백엔드는 단일 string.
  // UI가 단일 선택이라면 보통 0 또는 1개만 들어오게 되어있을 거고,
  // 일단 "첫 번째만" 보내도록 처리.
  const gender = filters.gender[0];

  const params: MemberSearchRequestDTO = {
    page,
    size,
    keyword: keyword.trim().length > 0 ? keyword.trim() : undefined,

    ages: filters.age.length ? filters.age : undefined,
    memberships: filters.grade.length ? filters.grade : undefined,
    durations: filters.period.length ? filters.period : undefined,

    gender: gender ? gender : undefined,

    planNames: planNames.length ? planNames : undefined,
    statuses: filters.status.length ? filters.status : undefined,
  };

  return params;
}
