"use client";

import { useState } from "react";

import type { RowSelectionState } from "@tanstack/react-table";

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

  const [page, setPage] = useState(1);
  const [size] = useState(10);

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const onClickSearchButton = () => {
    setSearchedKeyword(keyword.trim());
    setSearchedFilters(filters);
    setRowSelection({});
    setPage(1);
  };

  const isFilterSelected =
    keyword.trim().length > 0 || JSON.stringify(filters) !== JSON.stringify(INITIAL_FILTERS);

  const isFilteredSearched =
    searchedKeyword.trim().length > 0 ||
    JSON.stringify(searchedFilters) !== JSON.stringify(INITIAL_FILTERS);

  const resetFilters = () => {
    setKeyword("");
    setFilters(INITIAL_FILTERS);
    // 필터 리셋 시 선택도 초기화하고 싶으면 주석 해제
    setRowSelection({});
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
          onSearch={onClickSearchButton}
          onResetFilters={resetFilters}
          isFilterd={isFilterSelected}
        />
      </section>

      {/* 고객목록 영역 */}
      <section className="col-span-12">
        <CustomersList
          keyword={searchedKeyword}
          filters={searchedFilters}
          page={page}
          size={size}
          onPageChange={(next) => {
            setPage(next);
            setRowSelection({});
          }}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
        />
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
