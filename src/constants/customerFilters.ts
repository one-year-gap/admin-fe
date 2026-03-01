export type MultiSelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export const AGE_OPTIONS: MultiSelectOption[] = [
  { label: "10대", value: "10s" },
  { label: "20대", value: "20s" },
  { label: "30대", value: "30s" },
  { label: "40대", value: "40s" },
  { label: "50대", value: "50s" },
  { label: "60대", value: "60s" },
  { label: "65세 이상", value: "65plus" },
];

export const GRADE_OPTIONS: MultiSelectOption[] = [
  { label: "우수", value: "good" },
  { label: "VIP", value: "vip" },
  { label: "VVIP", value: "vvip" },
];

export const PERIOD_OPTIONS: MultiSelectOption[] = [
  { label: "1년미만", value: "lt1y" },
  { label: "1년이상 2년미만", value: "1to2y" },
  { label: "2년이상", value: "gte2y" },
];

export const GENDER_OPTIONS: MultiSelectOption[] = [
  { label: "남성", value: "M" },
  { label: "여성", value: "F" },
];

export const STATUS_OPTIONS: MultiSelectOption[] = [
  { label: "정상", value: "active" },
  { label: "정지", value: "banned" },
  { label: "가입중", value: "processing" },
  { label: "탈퇴", value: "deleted" },
];

/** 요금제 */
export { PLAN_OPTIONS } from "./plans";
