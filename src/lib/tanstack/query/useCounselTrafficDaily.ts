import { useQuery } from "@tanstack/react-query";

import { getCounselTrafficHourly } from "@/services/domain/traffic/getCounselTrafficDaily";

export function useCounselTrafficDaily(date: string) {
  return useQuery({
    queryKey: ["counsel-traffic-hourly", date],
    queryFn: () => getCounselTrafficHourly(date),
    enabled: !!date,
  });
}
