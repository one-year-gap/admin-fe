import { useQuery } from "@tanstack/react-query";

import { getRegionArpu } from "@/services/domain/region";

export const useRegionArpu = (yyyymm: string) => {
  return useQuery({
    queryKey: ["regionArpu", yyyymm],
    queryFn: () => getRegionArpu(yyyymm),
  });
};
