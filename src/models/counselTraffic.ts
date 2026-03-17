export interface CounselTrafficHourlyItem {
  hour: number;
  count: number;
}

export interface CounselTrafficDailyItem {
  day: number;
  count: number;
}

export interface CounselTrafficResponse<T> {
  items: T[];
  maxCount: number;
}

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
  timestamp: string;
  requestId: string;
}
