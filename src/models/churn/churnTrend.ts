export interface ChurnTrendSummary {
  maxIncrease: number;
  maxDecrease: number;
}

export interface ChurnTrendItem {
  date: string;
  riskCount: number;
  delta: number;
}

export interface ChurnTrendData {
  summary: ChurnTrendSummary;
  data: ChurnTrendItem[];
}

export interface ChurnTrendResponse {
  status: string;
  message: string;
  data: ChurnTrendData;
  timestamp: string;
}
