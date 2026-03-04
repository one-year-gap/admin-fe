export type AdminMembersStatus = "ACTIVE" | "BANNED";

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
