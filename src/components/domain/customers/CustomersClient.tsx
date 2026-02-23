"use client";

import React from "react";

import { DataUsageChart } from "@/components/domain/customers/chart/DataUsageChart";
import { GradeChart } from "@/components/domain/customers/chart/GradeChart";
import type { CustomerFilters } from "@/components/domain/customers/filter/FilterBar";
import { FilterBar } from "@/components/domain/customers/filter/FilterBar";
import type { PlanFilterState } from "@/components/domain/customers/filter/PlanFilterItem";
import { SearchBar } from "@/components/domain/customers/filter/SearchBar";

import { CustomersList } from "./list/CustomersList";

const INITIAL_PLAN: PlanFilterState = {
  mobile5gLte: [],
  tabletWatch: [],
  addon: [],
  iptv: [],
  internet: [],
};

const INITIAL_FILTERS: CustomerFilters = {
  age: [],
  grade: [],
  period: [],
  gender: [],
  character: [],
  churnRisk: [],
  csat: [],
  plan: INITIAL_PLAN,
};

export function CustomersClient() {
  // 입력 중 상태
  const [keyword, setKeyword] = React.useState("");
  const [filters, setFilters] = React.useState<CustomerFilters>(INITIAL_FILTERS);

  // 버튼 눌렀을 때 적용되는 상태
  const [appliedKeyword, setAppliedKeyword] = React.useState("");
  const [appliedFilters, setAppliedFilters] = React.useState<CustomerFilters>(INITIAL_FILTERS);

  const applySearch = () => {
    setAppliedKeyword(keyword.trim());
    setAppliedFilters(filters);
  };

  return (
    <>
      {/* 검색바 */}
      <section className="col-span-12 md:col-span-6 lg:col-span-4">
        <SearchBar value={keyword} onChange={setKeyword} />
      </section>

      {/* 필터바 + 검색 버튼 */}
      <section className="col-span-12 flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <FilterBar value={filters} onChange={setFilters} />
        </div>

        <button
          type="button"
          onClick={applySearch}
          className="bg-secondary-500 hover:bg-primary-900 text-neutral-0 text-md border-secondary-500 h-auto shrink-0 rounded-lg border p-3 font-medium">
          선택된 조건 검색하기
        </button>
      </section>

      {/* 고객목록 영역 */}
      <section className="col-span-12">
        <CustomersList keyword={appliedKeyword} filters={appliedFilters} />
      </section>

      {/* 차트 영역 */}
      <section className="col-span-12 md:col-span-6">
        <GradeChart keyword={appliedKeyword} filters={appliedFilters} />
      </section>

      <section className="col-span-12 md:col-span-6">
        <DataUsageChart keyword={appliedKeyword} filters={appliedFilters} />
      </section>
    </>
  );
}
