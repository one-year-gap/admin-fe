export type MultiSelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export const AGE_OPTIONS: MultiSelectOption[] = [
  { label: "10세 미만", value: "UNDER_10" },
  { label: "10대", value: "TEENS" },
  { label: "20대", value: "TWENTIES" },
  { label: "30대", value: "THIRTIES" },
  { label: "40대", value: "FORTIES" },
  { label: "50대", value: "FIFTIES" },
  { label: "60세 ~ 64세", value: "SIXTIES_EARLY" },
  { label: "65세 이상", value: "OVER_65" },
];

export const GRADE_OPTIONS: MultiSelectOption[] = [
  { label: "우수", value: "GOLD" },
  { label: "VIP", value: "VIP" },
  { label: "VVIP", value: "VVIP" },
];

export const PERIOD_OPTIONS: MultiSelectOption[] = [
  { label: "3개월 미만", value: "UNDER_3_MONTHS" },
  { label: "3개월 ~ 1년", value: "MONTHS_3_TO_12" },
  { label: "1년 ~ 2년", value: "YEARS_1_TO_2" },
  { label: "2년 ~ 5년", value: "YEARS_2_TO_5" },
  { label: "5년 ~ 10년", value: "YEARS_5_TO_10" },
  { label: "10년 이상", value: "OVER_10_YEARS" },
];

export const GENDER_OPTIONS: MultiSelectOption[] = [
  { label: "남성", value: "M" },
  { label: "여성", value: "F" },
];

export const STATUS_OPTIONS: MultiSelectOption[] = [
  { label: "정상", value: "ACTIVE" },
  { label: "정지", value: "BANNED" },
  { label: "가입중", value: "PROCESSING" },
  { label: "탈퇴", value: "DELETED" },
];

/** 요금제 */
export { PLAN_OPTIONS } from "./plans";
