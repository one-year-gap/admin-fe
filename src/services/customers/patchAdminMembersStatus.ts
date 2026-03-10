import { api } from "@/lib/axios";
import type {
  MemberStatusRequestDTO,
  MemberStatusResponseDTO,
} from "@/models/customers/adminMembersStatus";

export async function patchAdminMembersStatus(
  payload: MemberStatusRequestDTO,
): Promise<MemberStatusResponseDTO> {
  const { data } = await api.patch<MemberStatusResponseDTO>(
    "/api/v1/admin/members/status",
    payload,
  );
  if (data.status === "error") {
    throw new Error(data.message ?? "고객 상태 변경에 실패했습니다.");
  }
  return data;
}
