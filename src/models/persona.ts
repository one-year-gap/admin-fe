export type PersonaDistributionItem = {
  personaName: string;
  userCount: number;
  percentage: number;
  top3PlanNames: string[];
};

export type PersonaDistributionResponse = {
  status: string;
  message: string;
  data: PersonaDistributionItem[];
  timestamp: string;
};
