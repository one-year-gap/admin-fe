export type AdminMembersStatus = "ACTIVE" | "BANNED";

/**
 * PATCH /api/v1/admin/members/status
 * 고객 상태 변경: 정지 / 정지해제
 */

/* 요청 DTO */
export type MemberStatusRequestDTO = {
  memberIds: number[];
  status: AdminMembersStatus;
};

/* 응답 DTO */
export type MemberStatusResponseDTO = {
  status: "success" | "error";
  message?: string;
  data: number;
};
