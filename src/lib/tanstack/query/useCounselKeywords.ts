import { useQuery } from "@tanstack/react-query";

import { getCounselKeywords } from "@/services/domain/traffic/getCounselKeywords";

export function useCounselKeywords(year: number, month: number) {
  return useQuery({
    queryKey: ["counselKeywords", year, month],
    queryFn: () => getCounselKeywords(year, month),
  });
}
