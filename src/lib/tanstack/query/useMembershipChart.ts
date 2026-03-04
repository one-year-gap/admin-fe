import { useQuery } from "@tanstack/react-query";

import { getMembershipChart } from "@/services/customers/getMembershipChart";

export function useMembershipChart() {
  return useQuery({
    queryKey: ["membershipChart"],
    queryFn: getMembershipChart,
    staleTime: 60_000,
  });
}
