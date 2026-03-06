import { api } from "@/lib/axios";
import type { SupportStatsApiResponse } from "@/models/supportStats";

export const getSupportStats = async () => {
  const { data } = await api.get<SupportStatsApiResponse>("/api/v1/admin/dashboard/supports/stats");

  return data.data;
};
