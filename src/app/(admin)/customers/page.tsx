"use client";

import { useState } from "react";

import { CustomersList } from "@/components/domain/customers/CustomersList";
import { DataUsageChart } from "@/components/domain/customers/DataUsageChart";
import type { CustomerFilters } from "@/components/domain/customers/filter/FilterList";
import type { PlanFilterState } from "@/components/domain/customers/filter/PlanFilterItem";
import { GradeChart } from "@/components/domain/customers/GradeChart";
import { SearchSection } from "@/components/domain/customers/SearchSection";

export const INITIAL_PLAN: PlanFilterState = {
  mobile: [],
  tabletWatch: [],
  iptv: [],
  internet: [],
  addon: [],
};

export const INITIAL_FILTERS: CustomerFilters = {
  age: [],
  grade: [],
  period: [],
  gender: [],
  status: [],
  plan: INITIAL_PLAN,
};

export default function CustomersPage() {
  // 검색하기 버튼 누르기 전의 필터링 선택 상태
  const [keyword, setKeyword] = useState("");
  const [filters, setFilters] = useState<CustomerFilters>(INITIAL_FILTERS);

  // 검색하기 버튼 눌렀을 때 적용되는 상태
  const [searchedKeyword, setSearchedKeyword] = useState("");
  const [searchedFilters, setSearchedFilters] = useState<CustomerFilters>(INITIAL_FILTERS);

  const applySearch = () => {
    setSearchedKeyword(keyword.trim());
    setSearchedFilters(filters);
  };

  const isFilterSelected =
    keyword.trim().length > 0 || JSON.stringify(filters) !== JSON.stringify(INITIAL_FILTERS);

  const isFilteredSearched =
    searchedKeyword.trim().length > 0 ||
    JSON.stringify(searchedFilters) !== JSON.stringify(INITIAL_FILTERS);

  const resetFilters = () => {
    setKeyword("");
    setFilters(INITIAL_FILTERS);
  };

  return (
    <>
      {/* 필터링 영역 */}
      <section className="col-span-12">
        <SearchSection
          keyword={keyword}
          onKeywordChange={setKeyword}
          filters={filters}
          onFiltersChange={setFilters}
          onSearch={applySearch}
          onResetFilters={resetFilters}
          isFilterd={isFilterSelected}
        />
      </section>

      {/* 고객목록 영역 */}
      <section className="col-span-12">
        <CustomersList keyword={searchedKeyword} filters={searchedFilters} />
      </section>

      {/* 차트 영역 */}
      <section className="col-span-12 md:col-span-5">
        <GradeChart isFiltered={isFilteredSearched} />
      </section>

      <section className="col-span-12 md:col-span-7">
        <DataUsageChart />
      </section>
    </>
  );
}
