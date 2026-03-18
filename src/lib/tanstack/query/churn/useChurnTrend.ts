import { useQuery } from "@tanstack/react-query";

import { getChurnTrend } from "@/services/churn/getChurnTrend";

export const useChurnTrend = () => {
  return useQuery({
    queryKey: ["churn-trend"],
    queryFn: getChurnTrend,
  });
};
