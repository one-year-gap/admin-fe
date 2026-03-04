// import { useQuery } from "@tanstack/react-query";

// import type { MemberSearchRequestDTO } from "@/models/customers/adminMembers";
// import { getAdminMembers } from "@/services/customers/getAdminMembers";

// export function useAdminMembers(params: MemberSearchRequestDTO, enabled = true) {
//   return useQuery({
//     queryKey: ["adminMembers", params],
//     queryFn: () => getAdminMembers(params),
//     enabled,
//     staleTime: 20_000,
//   });
// }
import { useQuery } from "@tanstack/react-query";

import qs from "qs";

import type { MemberSearchRequestDTO } from "@/models/customers/adminMembers";
import { getAdminMembers } from "@/services/customers/getAdminMembers";

function makeStableKey(params: MemberSearchRequestDTO): string {
  return qs.stringify(params, {
    arrayFormat: "repeat",
    sort: (a, b) => a.localeCompare(b),
    skipNulls: true,
  });
}

export function useAdminMembers(params: MemberSearchRequestDTO, enabled = true) {
  const key = makeStableKey(params);

  return useQuery({
    queryKey: ["adminMembers", key],
    queryFn: () => getAdminMembers(params),
    enabled,
    staleTime: 1000 * 60,
  });
}
