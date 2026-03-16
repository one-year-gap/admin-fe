// import { api } from "@/lib/axios";
// import type { ChurnRiskMembersQuery } from "@/models/churn/churnRiskMembers";

// export async function getChurnRiskMembers(params: ChurnRiskMembersQuery) {
//   const response = await api.get("/api/v1/admin/churn-risk/members", {
//     params: {
//       page: params.page,
//       size: params.size,
//       keyword: params.keyword || undefined,
//       memberships: params.memberships?.length ? params.memberships : undefined,
//       riskLevels: params.riskLevels?.length ? params.riskLevels : undefined,
//     },
//   });

//   return response.data;
// }

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
