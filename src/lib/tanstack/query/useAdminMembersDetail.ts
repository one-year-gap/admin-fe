import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { ApiResponse } from "@/models/common/apiResponse";
import type { MemberDetailResponseDTO } from "@/models/customers/adminMembersDetail";
import { getAdminMembersDetail } from "@/services/customers/getAdminMembersDetail";

type Options = Omit<UseQueryOptions<ApiResponse<MemberDetailResponseDTO>>, "queryKey" | "queryFn">;

export function useAdminMembersDetail(memberId: number, options?: Options) {
  return useQuery({
    queryKey: ["adminMemberDetail", memberId],
    queryFn: () => getAdminMembersDetail(memberId),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
}
