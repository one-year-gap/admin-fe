import type { CustomerFilters } from "@/components/domain/customers/filter/FilterList";
import type { MultiSelectOption } from "@/constants/customerFilters";
import { PLAN_OPTIONS } from "@/constants/customerFilters";
import type { MemberSearchRequestDTO } from "@/models/customers/adminMembers";

/** PlanOptions 안의 모든 옵션을 평탄화 */
function flattenPlanOptions(): MultiSelectOption[] {
  const opts: MultiSelectOption[] = [];

  // mobile
  opts.push(...PLAN_OPTIONS.mobile.fiveG);
  opts.push(...PLAN_OPTIONS.mobile.lte);

  // tabletWatch / iptv / internet
  opts.push(...PLAN_OPTIONS.tabletWatch);
  opts.push(...PLAN_OPTIONS.iptv);
  opts.push(...PLAN_OPTIONS.internet);

  // addon
  opts.push(...PLAN_OPTIONS.addon.digitalContent);
  opts.push(...PLAN_OPTIONS.addon.familyCare);
  opts.push(...PLAN_OPTIONS.addon.phoneCare);

  return opts;
}

/** value -> label 맵 만들기 */
const PLAN_VALUE_TO_LABEL: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const o of flattenPlanOptions()) map[o.value] = o.label;
  return map;
})();

function unique(arr: string[]): string[] {
  return Array.from(new Set(arr));
}

/**
 * UI filters + keyword + page/size를 백엔드 요청 DTO로 변환
 * - 배열은 백엔드가 키 반복으로 받는다는 전제(직렬화는 A에서 처리)
 * - planNames: "label로 전송" 규칙 반영 (value -> label)
 */
export function toAdminMembersParams(args: {
  page: number;
  size: number;
  keyword: string;
  filters: CustomerFilters;
}): MemberSearchRequestDTO {
  const { page, size, keyword, filters } = args;

  // plan: 5열 선택값 합치기
  const selectedPlanValues = unique([
    ...filters.plan.mobile,
    ...filters.plan.tabletWatch,
    ...filters.plan.iptv,
    ...filters.plan.internet,
    ...filters.plan.addon,
  ]);

  // "요금제는 label로 보내야 함" 규칙
  const planNames = selectedPlanValues
    .map((v) => PLAN_VALUE_TO_LABEL[v] ?? v) // 혹시 맵에 없으면 v 그대로
    .filter((v) => v.trim().length > 0);

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
