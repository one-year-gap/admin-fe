"use client";

import { GRADE_OPTIONS, RISK_OPTIONS } from "@/constants/churnRiskFilters";

import { FilterItem } from "./FilterItem";

export type ChurnRiskFilters = {
  grade: string[];
  risk: string[];
};

type FilterListProps = {
  value: ChurnRiskFilters;
  onChange: (next: ChurnRiskFilters) => void;
};

export function FilterList({ value, onChange }: FilterListProps) {
  const set = (key: keyof ChurnRiskFilters) => (next: string[]) => {
    onChange({ ...value, [key]: next });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <FilterItem
        label="등급"
        options={GRADE_OPTIONS}
        value={value.grade}
        onChange={set("grade")}
      />
      <FilterItem
        label="이탈위험도"
        options={RISK_OPTIONS}
        value={value.risk}
        onChange={set("risk")}
      />
    </div>
  );
}
