/**
 * GET /api/v1/admin/members/membership
 * 전체 고객들의 등급 통계 조회
 */

/* 응답 DTO */
export type membershipChartResponseDTO = {
  totalInK: number;
  vvipRate: number;
  vipRate: number;
  goldRate: number;
};
