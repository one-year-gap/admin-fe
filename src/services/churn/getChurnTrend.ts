import { api } from "@/lib/axios";
import type { ChurnTrendResponse } from "@/models/churn/churnTrend";

export const getChurnTrend = async (): Promise<ChurnTrendResponse> => {
  const { data } = await api.get("/api/v1/admin/dashboard/churn-risk/trend");

  return data;
};
