import { api } from "@/lib/axios";
import type { MonthlyMembersResponse } from "@/models/customers/monthlyMembersChart";

export async function getMonthlyMembersChart() {
  const { data } = await api.get<MonthlyMembersResponse>(
    "/api/v1/admin/members/statistics/monthly",
  );

  return data;
}
