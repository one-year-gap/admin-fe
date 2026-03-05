import { useQuery } from "@tanstack/react-query";

import { getCounselTrafficMonthly } from "@/services/domain/traffic/getCounselTrafficMonthly";

export function useCounselTrafficMonthly(month: string) {
  return useQuery({
    queryKey: ["counselTrafficMonthly", month],
    queryFn: () => getCounselTrafficMonthly(month),
  });
}
