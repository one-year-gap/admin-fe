import qs from "qs";

import { api } from "@/lib/axios";
import type {
  MemberSearchRequestDTO,
  MemberSearchResponseDTO,
} from "@/models/customers/adminMembers";

// export const getAdminMembers = async (
//   params: MemberSearchRequestDTO,
// ): Promise<MemberSearchResponseDTO> => {
//   const response = await api.get("/api/v1/admin/members", {
//     params,
//     paramsSerializer: (p) => qs.stringify(p, { arrayFormat: "repeat", skipNulls: true }),
//   });

//   return response.data.data;
// };

export async function getAdminMembers(
  params: MemberSearchRequestDTO,
): Promise<MemberSearchResponseDTO> {
  const response = await api.get("/api/v1/admin/members", {
    params,
    paramsSerializer: (p) => qs.stringify(p, { arrayFormat: "repeat", skipNulls: true }),
  });

  return response.data.data;
}
