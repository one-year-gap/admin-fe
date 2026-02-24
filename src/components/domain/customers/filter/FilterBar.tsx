"use client";

import React from "react";

import { FilterItem } from "@/components/domain/customers/filter/FilterItem";
import {
  PlanFilterItem,
  type PlanFilterState,
} from "@/components/domain/customers/filter/PlanFilterItem";
import {
  AGE_OPTIONS,
  CHARACTER_OPTIONS,
  CHURN_RISK_OPTIONS,
  CSAT_OPTIONS,
  GENDER_OPTIONS,
  GRADE_OPTIONS,
  PERIOD_OPTIONS,
  PLAN_OPTIONS,
} from "@/constants/customerFilters";

export type CustomerFilters = {
  age: string[];
  grade: string[];
  period: string[];
  gender: string[];
  character: string[];
  churnRisk: string[];
  csat: string[];
  plan: PlanFilterState;
};

type FilterBarProps = {
  value: CustomerFilters;
  onChange: (next: CustomerFilters) => void;
};

export function FilterBar({ value, onChange }: FilterBarProps) {
  const set = (key: keyof Omit<CustomerFilters, "plan">) => (next: string[]) => {
    onChange({ ...value, [key]: next });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <FilterItem label="연령" options={AGE_OPTIONS} value={value.age} onChange={set("age")} />
      <FilterItem
        label="등급"
        options={GRADE_OPTIONS}
        value={value.grade}
        onChange={set("grade")}
      />
      <FilterItem
        label="가입기간"
        options={PERIOD_OPTIONS}
        value={value.period}
        onChange={set("period")}
      />
      <FilterItem
        label="성별"
        options={GENDER_OPTIONS}
        value={value.gender}
        onChange={set("gender")}
      />
      <FilterItem
        label="캐릭터 유형"
        options={CHARACTER_OPTIONS}
        value={value.character}
        onChange={set("character")}
      />
      <FilterItem
        label="이탈 위험군"
        options={CHURN_RISK_OPTIONS}
        value={value.churnRisk}
        onChange={set("churnRisk")}
      />
      <FilterItem
        label="상담 이력"
        options={CSAT_OPTIONS}
        value={value.csat}
        onChange={set("csat")}
      />
      <PlanFilterItem
        value={value.plan}
        onChange={(next) => onChange({ ...value, plan: next })}
        options={PLAN_OPTIONS}
      />
    </div>
  );
}
