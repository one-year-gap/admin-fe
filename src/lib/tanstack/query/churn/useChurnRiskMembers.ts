import { useQuery } from "@tanstack/react-query";

import type { ChurnRiskMembersQuery } from "@/models/churn/churnRiskMembers";
import { getChurnRiskMembers } from "@/services/churn/getChurnRiskMembers";

export function useChurnRiskMembers(params: ChurnRiskMembersQuery) {
  return useQuery({
    queryKey: ["churnRiskMembers", params],
    queryFn: () => getChurnRiskMembers(params),
    retry: 0,
  });
}
