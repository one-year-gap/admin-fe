import { useQuery } from "@tanstack/react-query";

import type { ChurnLatestQuery } from "@/models/churn/churnLatest";
import { getChurnLatest } from "@/services/churn/getChurnLatest";

export function useChurnLatest(params: ChurnLatestQuery) {
  return useQuery({
    queryKey: ["churnLatest", params],
    queryFn: () => getChurnLatest(params),
    retry: 0,
  });
}
