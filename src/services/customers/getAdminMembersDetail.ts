import { api } from "@/lib/axios";
import type { ApiResponse } from "@/models/common/apiResponse";
import type { MemberDetailResponseDTO } from "@/models/customers/adminMembersDetail";

export async function getAdminMembersDetail(
  memberId: number,
): Promise<ApiResponse<MemberDetailResponseDTO>> {
  if (!Number.isInteger(memberId) || memberId <= 0) {
    throw new Error("memberId must be a positive integer.");
  }
  const { data } = await api.get(`/api/v1/admin/members/${memberId}`);
  return data;
}
