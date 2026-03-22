export type ChurnLatestLevel = "HIGH" | "MEDIUM" | "LOW";

export interface ChurnLatestItem {
  churnId: number;
  memberId: number;
  reason: string;
  churnLevel: ChurnLatestLevel;
  memberName: string;
  timeStamp: string;
}

export interface ChurnLatestData {
  items: ChurnLatestItem[];
  afterId: number;
  hasMore: boolean;
}

export interface ChurnLatestResponse {
  status: string;
  message: string;
  data: ChurnLatestData;
  timestamp: string;
}

export interface ChurnLatestQuery {
  limit: number;
  level: ChurnLatestLevel[];
}
