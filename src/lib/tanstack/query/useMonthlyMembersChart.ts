import { useQuery } from "@tanstack/react-query";

import type { MonthlyMembersResponse } from "@/models/customers/monthlyMembersChart";
import { getMonthlyMembersChart } from "@/services/customers/getMonthlyMembersChart";

export function useMonthlyMembersChart() {
  return useQuery<MonthlyMembersResponse>({
    queryKey: ["admin", "member", "statistics", "monthly"],
    queryFn: getMonthlyMembersChart,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 0,
  });
}
