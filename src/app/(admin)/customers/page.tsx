"use client";

import { useState } from "react";

import { DataUsageChart } from "@/components/domain/customers/chart/DataUsageChart";
import { GradeChart } from "@/components/domain/customers/chart/GradeChart";
import type { CustomerFilters } from "@/components/domain/customers/filter/FilterBar";
import { FilterBar } from "@/components/domain/customers/filter/FilterBar";
import type { PlanFilterState } from "@/components/domain/customers/filter/PlanFilterItem";
import { SearchBar } from "@/components/domain/customers/filter/SearchBar";
import { CustomersList } from "@/components/domain/customers/list/CustomersList";

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

export default function CustomersPage() {
  // 검색하기 버튼 누르기 전의 필터링 선택 상태
  const [keyword, setKeyword] = useState("");
  const [filters, setFilters] = useState<CustomerFilters>(INITIAL_FILTERS);

  // 검색하기 버튼 눌렀을 때 적용되는 상태
  const [appliedKeyword, setAppliedKeyword] = useState("");
  const [appliedFilters, setAppliedFilters] = useState<CustomerFilters>(INITIAL_FILTERS);

  const applySearch = () => {
    setAppliedKeyword(keyword.trim());
    setAppliedFilters(filters);
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
        <GradeChart isFiltered={isFiltered} />
      </section>

      <section className="col-span-12 md:col-span-7">
        <DataUsageChart />
      </section>
    </>
  );
}
