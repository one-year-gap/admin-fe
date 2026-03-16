import { useMutation } from "@tanstack/react-query";

import { postCoupon } from "@/services/churn/postCoupon";

export function useCoupon() {
  return useMutation({
    mutationFn: postCoupon,
  });
}
