export type MultiSelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export const GRADE_OPTIONS: MultiSelectOption[] = [
  { label: "우수", value: "GOLD" },
  { label: "VIP", value: "VIP" },
  { label: "VVIP", value: "VVIP" },
];

export const RISK_OPTIONS: MultiSelectOption[] = [
  { label: "경고", value: "MEDIUM" },
  { label: "위험", value: "HIGH" },
];
