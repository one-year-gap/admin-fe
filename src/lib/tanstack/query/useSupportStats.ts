import { useQuery } from "@tanstack/react-query";

import { getSupportStats } from "@/services/domain/traffic/getSupportStats";

export function useSupportStats() {
  return useQuery({
    queryKey: ["supportStats"],
    queryFn: getSupportStats,
  });
}
