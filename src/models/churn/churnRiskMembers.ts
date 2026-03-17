export type RiskLevel = "MEDIUM" | "HIGH";
export type Membership = "GOLD" | "VIP" | "VVIP";

export interface ChurnRiskMember {
  no: number;
  memberId: number;
  membership: Membership;
  name: string;
  riskLevel: RiskLevel;
  riskReason: string;
  churnScore: number;
  phone: string;
  email: string;
}

export interface ChurnRiskPagination {
  totalCount: number;
  currentPage: number;
  size: number;
  totalPage: number;
}

export interface ChurnRiskMembersData {
  members: ChurnRiskMember[];
  pagination: ChurnRiskPagination;
}

export interface ChurnRiskMembersResponse {
  status: string;
  message: string;
  data: ChurnRiskMembersData;
  timestamp: string;
}

export interface ChurnRiskMembersQuery {
  page: number;
  size: number;
  keyword?: string;
  memberships?: string[];
  riskLevels?: string[];
}
