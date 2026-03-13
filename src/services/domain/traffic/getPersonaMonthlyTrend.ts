import { api } from "@/lib/axios";
import type { PersonaMonthlyTrendResponse } from "@/models/personaTrend";

export async function getPersonaMonthlyTrend() {
  const { data } = await api.get<PersonaMonthlyTrendResponse>(
    "/api/v1/admin/dashboard/personas/monthly-trend",
  );

  return data.data;
}
