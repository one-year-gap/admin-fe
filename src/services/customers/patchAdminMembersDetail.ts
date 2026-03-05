import { api } from "@/lib/axios";
import type { MemberUpdateRequestDTO } from "@/models/customers/adminMembersUpdate";

export async function patchAdminMembersUpdate(
  memberId: number,
  body: MemberUpdateRequestDTO,
): Promise<void> {
  if (!Number.isInteger(memberId) || memberId <= 0) {
    throw new Error("memberId is required.");
  }

  if (!body || (!body.membership && !body.status)) {
    throw new Error("PATCH body must include at least one of membership or status.");
  }

  await api.patch(`/api/v1/admin/members/${memberId}`, body);
}
