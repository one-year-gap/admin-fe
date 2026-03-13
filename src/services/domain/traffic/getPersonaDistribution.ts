import { api } from "@/lib/axios";
import type { PersonaDistributionItem } from "@/models/persona";

export async function getPersonaDistribution() {
  const { data } = await api.get("/api/v1/admin/dashboard/personas/distribution");

  return data.data as PersonaDistributionItem[];
}
