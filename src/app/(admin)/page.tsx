"use client";

import { useState } from "react";

import type { RowSelectionState } from "@tanstack/react-table";

import { CustomersList } from "@/components/domain/customers/CustomersList";
import type { CustomerFilters } from "@/components/domain/customers/filter/FilterList";
import { MembershipChart } from "@/components/domain/customers/MembershipChart";
import { MonthlyMembersChart } from "@/components/domain/customers/MonthlyMembersChart";
import { SearchSection } from "@/components/domain/customers/SearchSection";
import { INITIAL_FILTERS } from "@/constants/initialFilters";
import { useMembershipChart } from "@/lib/tanstack/query/useMembershipChart";

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
    setPage(1);
    setSearchedKeyword(keyword.trim());
    setSearchedFilters(filters);
    setRowSelection({});
  };

  const isFilterSelected =
    keyword.trim().length > 0 || JSON.stringify(filters) !== JSON.stringify(INITIAL_FILTERS);

  const isFilteredSearched =
    searchedKeyword.trim().length > 0 ||
    JSON.stringify(searchedFilters) !== JSON.stringify(INITIAL_FILTERS);

  const resetFilters = () => {
    setKeyword("");
    setFilters(INITIAL_FILTERS);
    setRowSelection({});
  };

  const { data: stats, isLoading, isError } = useMembershipChart();

  const gradeChartData = stats
    ? [
        { name: "VVIP", value: stats.vvipRate, fill: "var(--color-chart-1)" },
        { name: "VIP", value: stats.vipRate, fill: "var(--color-chart-2)" },
        { name: "우수", value: stats.goldRate, fill: "var(--color-chart-3)" },
      ]
    : [];

  const totalLabel = stats ? `${stats.totalInK.toLocaleString()}K` : "";

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* 필터링 영역 */}
      <section className="col-span-12">
        <SearchSection
          keyword={keyword}
          onKeywordChange={setKeyword}
          filters={filters}
          onFiltersChange={setFilters}
          onSearch={onClickSearchButton}
          onResetFilters={resetFilters}
          isFiltered={isFilterSelected}
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
        <MembershipChart
          isFiltered={isFilteredSearched}
          data={gradeChartData}
          totalLabel={totalLabel}
          isLoading={isLoading}
          isError={isError}
        />
      </section>

      <section className="col-span-12 md:col-span-7">
        <MonthlyMembersChart />
      </section>
    </div>
  );
}
