/**
 * PATCH /api/v1/admin/members/{memberId}
 * 부분 수정: membership / status만 허용
 */
export type Membership = "VVIP" | "VIP" | "GOLD" | "BASIC";
export type MemberStatus = "ACTIVE" | "BANNED" | "DELETED" | "PROCESSING";

/* 요청 DTO */
export type MemberUpdateRequestDTO = {
  membership?: Membership;
  status?: MemberStatus;
};
