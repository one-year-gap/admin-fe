export type PersonaMonthlyTrendItem = {
  yearMonth: string;
  personaName: string;
  userCount: number;
};

export type PersonaMonthlyTrendResponse = {
  status: string;
  message: string;
  data: PersonaMonthlyTrendItem[];
  timestamp: string;
};
