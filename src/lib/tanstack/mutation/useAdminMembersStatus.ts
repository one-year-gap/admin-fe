import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import type {
  MemberStatusRequestDTO,
  MemberStatusResponseDTO,
} from "@/models/customers/adminMembersStatus";
import { patchAdminMembersStatus } from "@/services/customers/patchAdminMembersStatus";

export function useAdminMembersStatus(
  options?: UseMutationOptions<MemberStatusResponseDTO, unknown, MemberStatusRequestDTO>,
) {
  return useMutation<MemberStatusResponseDTO, unknown, MemberStatusRequestDTO>({
    mutationFn: patchAdminMembersStatus,
    ...options,
  });
}
