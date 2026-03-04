/* 요청 DTO */
export type MemberSearchRequestDTO = {
  page: number;
  size: number;
  keyword?: string;
  ages?: string[];
  memberships?: string[];
  durations?: string[];
  gender?: string;
  planNames?: string[];
  statuses?: string[];
};

/* 응답 DTO */
export type MemberSearchDTO = {
  id: number;
  membership: string; // "GOLD" | "VIP" | "VVIP" 로 좁히고 싶으면 유니온으로 바꿔도 됨
  gender: string; // "M" | "F"
  name: string;
  birthDate: string; // "YYYY-MM-DD"
  phone: string;
  email: string;
  planName: string;
  status: string; // "ACTIVE" | "BANNED" | "DELETED" | "PROCESSING"
};

export type MemberSearchPaginationDTO = {
  totalCount: number;
  currentPage: number; // 1-based
  size: number;
  totalPage: number;
};

export type MemberSearchResponseDTO = {
  members: MemberSearchDTO[];
  pagination: MemberSearchPaginationDTO;
};
