import type {
  ChurnLatestData,
  ChurnLatestItem,
  ChurnLatestLevel,
  ChurnLatestResponse,
} from "@/models/churn/churnLatest";

export type ChurnChangesItem = ChurnLatestItem;
export type ChurnChangesData = ChurnLatestData;
export type ChurnChangesResponse = ChurnLatestResponse;

export interface ChurnChangesQuery {
  afterId: number;
  limit: number;
  level: ChurnLatestLevel[];
}
