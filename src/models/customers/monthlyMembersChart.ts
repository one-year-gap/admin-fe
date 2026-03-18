export interface MonthlyMembers {
  month: string;
  joinedCount: number;
  leftCount: number;
}

export interface MonthlyMembersResponse {
  status: string;
  message: string;
  data: MonthlyMembers[];
  timestamp: string;
}
