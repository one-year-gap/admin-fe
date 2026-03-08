/**
 * GET api/v1/admin/members?keyword=홍길동&page=1&size=20
 * 고객 리스트 필터링 검색
 * 이름/전화번호로 검색가능
 * 연령, 등급, 가입기간, 성별, 상태, 요금제로 검색가능
 * 페이지 단위로 목록을 조회
 */

/* 요청 DTO */
export type MemberSearchRequestDTO = {
  page: number;
  size: number;
  keyword?: string;
  ages?: string[];
  memberships?: string[];
  durations?: string[];
  genders?: string[];
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
