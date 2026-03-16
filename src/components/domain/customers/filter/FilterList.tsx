"use client";

import { FilterItem } from "@/components/domain/customers/filter/FilterItem";
import {
  PlanFilterItem,
  type PlanFilterState,
} from "@/components/domain/customers/filter/PlanFilterItem";
import {
  AGE_OPTIONS,
  GENDER_OPTIONS,
  GRADE_OPTIONS,
  PERIOD_OPTIONS,
  PLAN_OPTIONS,
  STATUS_OPTIONS,
} from "@/constants/customerFilters";

export type CustomerFilters = {
  age: string[];
  grade: string[];
  period: string[];
  gender: string[];
  status: string[];
  plan: PlanFilterState;
};

type FilterListProps = {
  value: CustomerFilters;
  onChange: (next: CustomerFilters) => void;
};

export function FilterList({ value, onChange }: FilterListProps) {
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
        label="상태"
        options={STATUS_OPTIONS}
        value={value.status}
        onChange={set("status")}
      />

      <PlanFilterItem
        value={value.plan}
        onChange={(next) => onChange({ ...value, plan: next })}
        options={PLAN_OPTIONS}
      />
    </div>
  );
}
