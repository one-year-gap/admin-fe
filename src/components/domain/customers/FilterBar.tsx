"use client";

import React from "react";

import type { MultiSelectOption } from "@/components/domain/customers/FilterItem";
import FilterItem from "@/components/domain/customers/FilterItem";

export type CustomerFilters = {
  age: string[];
  grade: string[];
  period: string[];
  gender: string[];
  character: string[];
  churnRisk: string[];
  csat: string[];
  // plan은 나중에 PlanFilterItem으로 분리 예정
  plan: string[];
};

type FilterBarProps = {
  value: CustomerFilters;
  onChange: (next: CustomerFilters) => void;
};

const AGE: MultiSelectOption[] = [
  { label: "10대", value: "10s" },
  { label: "20대", value: "20s" },
  { label: "30대", value: "30s" },
  { label: "40대", value: "40s" },
  { label: "50대", value: "50s" },
  { label: "60대", value: "60s" },
  { label: "65세 이상", value: "65plus" },
];

const GRADE: MultiSelectOption[] = [
  { label: "우수", value: "good" },
  { label: "VIP", value: "vip" },
  { label: "VVIP", value: "vvip" },
];

const PERIOD: MultiSelectOption[] = [
  { label: "1년미만", value: "lt1y" },
  { label: "1년이상 2년미만", value: "1to2y" },
  { label: "2년이상", value: "gte2y" },
];

const GENDER: MultiSelectOption[] = [
  { label: "남성", value: "M" },
  { label: "여성", value: "F" },
];

const CHARACTER: MultiSelectOption[] = [
  { label: "다이어터", value: "dieter" },
  { label: "자유영혼", value: "free_spirit" },
  { label: "디바이스 마스터", value: "device_master" },
  { label: "콜렉터", value: "collector" },
  { label: "탐험가", value: "explorer" },
];

const CHURN: MultiSelectOption[] = [
  { label: "low", value: "low" },
  { label: "middle", value: "middle" },
  { label: "high", value: "high" },
];

const CSAT: MultiSelectOption[] = [
  { label: "매우만족", value: "very_satisfied" },
  { label: "만족", value: "satisfied" },
  { label: "보통", value: "neutral" },
  { label: "불만족", value: "dissatisfied" },
  { label: "매우불만족", value: "very_dissatisfied" },
];

// 요금제는 일단 같은 방식으로 mock (나중에 PlanFilterItem으로 교체)
const PLAN: MultiSelectOption[] = [
  { label: "저렴이 요금제", value: "cheap" },
  { label: "알뜰살뜰 요금제", value: "value" },
  { label: "프리미엄 요금제", value: "premium" },
];

export default function FilterBar({ value, onChange }: FilterBarProps) {
  const set = (key: keyof CustomerFilters) => (next: string[]) => {
    onChange({ ...value, [key]: next });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <FilterItem label="연령" options={AGE} value={value.age} onChange={set("age")} />
      <FilterItem label="등급" options={GRADE} value={value.grade} onChange={set("grade")} />
      <FilterItem label="가입기간" options={PERIOD} value={value.period} onChange={set("period")} />
      <FilterItem label="성별" options={GENDER} value={value.gender} onChange={set("gender")} />
      <FilterItem label="현재 요금제" options={PLAN} value={value.plan} onChange={set("plan")} />
      <FilterItem
        label="캐릭터 유형"
        options={CHARACTER}
        value={value.character}
        onChange={set("character")}
      />
      <FilterItem
        label="이탈 위험군"
        options={CHURN}
        value={value.churnRisk}
        onChange={set("churnRisk")}
      />
      <FilterItem label="상담 이력" options={CSAT} value={value.csat} onChange={set("csat")} />
    </div>
  );
}
