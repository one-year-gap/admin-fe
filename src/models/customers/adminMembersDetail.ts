/**
 * GET /api/v1/admin/members/{memberId}
 * 고객 상세 정보 조회: 고객의 세부 정보를 조회
 */

/* 응답 DTO */
export type MemberDetailResponseDTO = {
  name: string;
  age: number;
  membership: "GOLD" | "VIP" | "VVIP" | "BASIC";
  gender: "M" | "F";

  fullAddress: string;
  email: string;
  phone: string;

  birthDate: string | null;

  currentMobilePlan: string;

  joinDate: string | null;
  joinDurationText: string;

  status: "ACTIVE" | "BANNED" | "DELETED" | "PROCESSING";

  isContracted: boolean;
  contractMonths: number | null;
  contractStartDate: string | null;
  contractEndDate: string | null;
  remainingDays: number | null;
  isExpired: boolean | null;

  totalSupportCount: number;
  lastSupportDate: string | null;
  recentSupportStatus: string | null;
  recentSatisfactionScore: number | null;
  averageSatisfactionScore: number | null;
  top3Keywords: string[];
};
