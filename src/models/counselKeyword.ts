export interface CounselKeywordItem {
  keywordId: number;
  keywordName: string;
  totalCount: number;
  changeRate: number | null;
}

export interface CounselKeywordResponse {
  status: string;
  message: string;
  data: CounselKeywordItem[];
  timestamp: string;
}
