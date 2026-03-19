import { api } from "@/lib/axios";
import type { ChurnChangesQuery, ChurnChangesResponse } from "@/models/churn/churnChanges";

export async function getChurnChanges(params: ChurnChangesQuery): Promise<ChurnChangesResponse> {
  const { data } = await api.get<ChurnChangesResponse>("/api/v1/admin/churn/changes", {
    params: {
      afterId: params.afterId,
      limit: params.limit,
      level: params.level.join(","),
    },
  });

  return data;
}
