import { useQuery } from "@tanstack/react-query";

import type { PersonaMonthlyTrendItem } from "@/models/personaTrend";
import { getPersonaMonthlyTrend } from "@/services/domain/traffic/getPersonaMonthlyTrend";

export function usePersonaMonthlyTrend() {
  return useQuery<PersonaMonthlyTrendItem[]>({
    queryKey: ["personaMonthlyTrend"],
    queryFn: getPersonaMonthlyTrend,
  });
}
