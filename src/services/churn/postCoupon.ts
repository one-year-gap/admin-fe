import { api } from "@/lib/axios";
import type { CouponRequest, CouponResponse } from "@/models/churn/coupon";

export async function postCoupon(body: CouponRequest): Promise<CouponResponse> {
  const { data } = await api.post<CouponResponse>("/api/v1/admin/churn-risk/coupons/issue", body);

  return data;
}
