import { api } from "@/lib/axios";
import type { ApiResponse } from "@/models/common/apiResponse";
import type { MemberDetailResponseDTO } from "@/models/customers/adminMembersDetail";

export async function getAdminMembersDetail(
  memberId: number,
): Promise<ApiResponse<MemberDetailResponseDTO>> {
  const { data } = await api.get(`/api/v1/admin/members/${memberId}`);
  return data;
}
