import qs from "qs";

import { api } from "@/lib/axios";
import type {
  ChurnRiskMembersQuery,
  ChurnRiskMembersResponse,
} from "@/models/churn/churnRiskMembers";

export async function getChurnRiskMembers(
  params: ChurnRiskMembersQuery,
): Promise<ChurnRiskMembersResponse> {
  const response = await api.get("/api/v1/admin/churn-risk/members", {
    params,
    paramsSerializer: (p) => qs.stringify(p, { arrayFormat: "repeat", skipNulls: true }),
  });

  return response.data;
}
