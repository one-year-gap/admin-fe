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
