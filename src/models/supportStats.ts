export interface SupportStatsResponse {
  totalCount: number;
  openCount: number;
  supportingCount: number;
  closedCount: number;
}

export interface SupportStatsApiResponse {
  status: string;
  message: string;
  data: SupportStatsResponse;
  timestamp: string;
}
