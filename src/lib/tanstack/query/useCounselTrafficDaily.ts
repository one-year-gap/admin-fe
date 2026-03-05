import { useQuery } from "@tanstack/react-query";

import { getCounselTrafficDaily } from "@/services/domain/traffic/getCounselTrafficDaily";

export function useCounselTrafficDaily(date: string) {
  return useQuery({
    queryKey: ["counselTrafficDaily", date],
    queryFn: () => getCounselTrafficDaily(date),
  });
}
