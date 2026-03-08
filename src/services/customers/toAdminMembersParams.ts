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

  const params: MemberSearchRequestDTO = {
    page,
    size,

    keyword: keyword.trim().length > 0 ? keyword.trim() : undefined,

    ages: filters.age.length ? filters.age : undefined,
    memberships: filters.grade.length ? filters.grade : undefined,
    durations: filters.period.length ? filters.period : undefined,
    genders: filters.gender.length ? filters.gender : undefined,

    planNames: planNames.length ? planNames : undefined,
    statuses: filters.status.length ? filters.status : undefined,
  };

  return params;
}
