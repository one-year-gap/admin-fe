export type PersonaName =
  | "SPACE_EXPLORER"
  | "SPACE_OCTOPUS"
  | "SPACE_GUARDIAN"
  | "SPACE_SURFER"
  | "SPACE_SHERLOCK"
  | "SPACE_GRAVITY";

export type PersonaMonthlyTrendItem = {
  yearMonth: string;
  personaName: PersonaName;
  userCount: number;
};

export type PersonaMonthlyTrendResponse = {
  status: string;
  message: string;
  data: PersonaMonthlyTrendItem[];
  timestamp: string;
};
