export interface CouponRequest {
  memberIds: number[];
  couponId: number;
}

export interface CouponResponse {
  status: string;
  message: string;
  data: {
    requestedCount: number;
    issuedCount: number;
    skippedCount: number;
    issuedMemberIds: number[];
    skippedMembers: number[];
  };
  timestamp: string;
}
