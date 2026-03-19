import { api } from "@/lib/axios";
import type { ChurnLatestQuery, ChurnLatestResponse } from "@/models/churn/churnLatest";

export async function getChurnLatest(params: ChurnLatestQuery): Promise<ChurnLatestResponse> {
  const { data } = await api.get<ChurnLatestResponse>("/api/v1/admin/churn/latest", {
    params: {
      limit: params.limit,
      level: params.level.join(","),
    },
  });

  return data;
}
