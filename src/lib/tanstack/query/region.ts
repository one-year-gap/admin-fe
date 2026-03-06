import { useQuery } from "@tanstack/react-query";

import { getRegionArpu, getRegionTop } from "@/services/domain/region";

export const useRegionArpu = (yyyymm: string) => {
  return useQuery({
    queryKey: ["regionArpu", yyyymm],
    queryFn: () => getRegionArpu(yyyymm),
  });
};

export const useRegionTop = () => {
  return useQuery({
    queryKey: ["regionTop"],
    queryFn: () => getRegionTop(),
  });
};
