import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { MemberUpdateRequestDTO } from "@/models/customers/adminMembersUpdate";
import { patchAdminMembersUpdate } from "@/services/customers/patchAdminMembersDetail";

type Variables = {
  memberId: number;
  body: MemberUpdateRequestDTO;
};

export function useAdminMemberUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ memberId, body }: Variables) => patchAdminMembersUpdate(memberId, body),

    onSuccess: async (_data, vars) => {
      await queryClient.invalidateQueries({ queryKey: ["adminMembers"] });

      await queryClient.invalidateQueries({
        queryKey: ["adminMembersDetail", vars.memberId],
      });

      if (vars.body.membership) {
        await queryClient.invalidateQueries({ queryKey: ["membershipChart"] });
      }
    },
  });
}
