export interface CounselTrafficItem {
  hour: number;
  count: number;
}

export interface CounselTrafficResponse {
  items: CounselTrafficItem[];
  maxCount: number;
}
