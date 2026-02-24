"use client";

import React from "react";

import type { CustomerFilters } from "@/components/domain/customers/filter/FilterBar";
import { FilterBar } from "@/components/domain/customers/filter/FilterBar";
import type { PlanFilterState } from "@/components/domain/customers/filter/PlanFilterItem";
import { SearchBar } from "@/components/domain/customers/filter/SearchBar";
import type { CustomerAnalytics } from "@/mocks/customerAnalytics.mock";
import { getMockCustomerAnalytics } from "@/mocks/customerAnalytics.mock";

import { DataUsageChart } from "./chart/DataUsageChart";
import { GradeChart } from "./chart/GradeChart";
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

  // 분석 데이터(실제론 API에서 받아와야 할 부분)
  const [analytics, setAnalytics] = React.useState<CustomerAnalytics>(() =>
    getMockCustomerAnalytics({ keyword: "", filters: INITIAL_FILTERS }),
  );

  const applySearch = () => {
    const k = keyword.trim();
    setAppliedKeyword(keyword.trim());
    setAppliedFilters(filters);
    setAnalytics(getMockCustomerAnalytics({ keyword: k, filters }));
  };

  const isFiltered =
    appliedKeyword.trim().length > 0 ||
    JSON.stringify(appliedFilters) !== JSON.stringify(INITIAL_FILTERS);

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
          className="bg-secondary-500 hover:bg-secondary-700 text-neutral-0 text-md border-secondary-500 h-auto shrink-0 cursor-pointer rounded-lg border p-3 font-medium">
          선택된 조건 검색하기
        </button>
      </section>

      {/* 고객목록 영역 */}
      <section className="col-span-12">
        <CustomersList keyword={appliedKeyword} filters={appliedFilters} />
      </section>

      {/* 차트 영역 */}
      <section className="col-span-12 md:col-span-5">
        <GradeChart analytics={analytics} isFiltered={isFiltered} />
      </section>

      <section className="col-span-12 md:col-span-7">
        <DataUsageChart analytics={analytics} />
      </section>
    </>
  );
}
