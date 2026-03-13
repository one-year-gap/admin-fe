import { useQuery } from "@tanstack/react-query";

import { getPersonaDistribution } from "@/services/domain/traffic/getPersonaDistribution";

export function usePersonaDistribution() {
  return useQuery({
    queryKey: ["personaDistribution"],
    queryFn: getPersonaDistribution,
  });
}
