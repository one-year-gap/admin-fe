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
  return data;
}
