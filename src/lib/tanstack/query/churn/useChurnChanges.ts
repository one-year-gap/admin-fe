import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { ChurnChangesQuery, ChurnChangesResponse } from "@/models/churn/churnChanges";
import { getChurnChanges } from "@/services/churn/getChurnChanges";

type Options = Omit<UseQueryOptions<ChurnChangesResponse>, "queryKey" | "queryFn">;

export function useChurnChanges(params: ChurnChangesQuery, options?: Options) {
  return useQuery({
    queryKey: ["churnChanges", params],
    queryFn: () => getChurnChanges(params),
    retry: 0,
    ...options,
  });
}
