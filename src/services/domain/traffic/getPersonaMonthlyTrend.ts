import { api } from "@/lib/axios";
import type { PersonaMonthlyTrendItem } from "@/models/personaTrend";

export async function getPersonaMonthlyTrend() {
  const { data } = await api.get("/api/v1/admin/dashboard/personas/monthly-trend");

  return data.data as PersonaMonthlyTrendItem[];
}
