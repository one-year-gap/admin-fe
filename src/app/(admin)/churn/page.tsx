"use client";

import React, { useState } from "react";

import type { RowSelectionState } from "@tanstack/react-table";

import { ChurnDelta } from "@/components/domain/churn/ChurnDelta";
import { ChurnTotal } from "@/components/domain/churn/ChurnTotal";
import { ChurnFeed } from "@/components/domain/churn/feed/ChurnFeed";
import { ChurnList } from "@/components/domain/churn/list/ChurnList";
import type { ChurnRiskFilters } from "@/components/domain/churn/search/FilterList";
import { SearchSection } from "@/components/domain/churn/SearchSection";
import { INITIAL_FILTERS_CHURN } from "@/constants/initialFilters";

export default function ChurnPage() {
  // 검색하기 버튼 누르기 전의 필터링 선택 상태
  const [keyword, setKeyword] = useState("");
  const [filters, setFilters] = useState<ChurnRiskFilters>(INITIAL_FILTERS_CHURN);

  // 검색하기 버튼 눌렀을 때 적용되는 상태
  const [searchedKeyword, setSearchedKeyword] = useState("");
  const [searchedFilters, setSearchedFilters] = useState<ChurnRiskFilters>(INITIAL_FILTERS_CHURN);

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
    keyword.trim().length > 0 || JSON.stringify(filters) !== JSON.stringify(INITIAL_FILTERS_CHURN);

  const resetFilters = () => {
    setKeyword("");
    setFilters(INITIAL_FILTERS_CHURN);
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
          isFiltered={isFilterSelected}
        />
      </section>

      {/* 고객목록 */}
      <section className="col-span-12">
        <ChurnList
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

      {/* 차트 및 피드 */}
      <section className="col-span-12 md:col-span-6">
        <div className="flex flex-col gap-6">
          <ChurnDelta />
          <ChurnTotal />
        </div>
      </section>
      <section className="col-span-12 md:col-span-6">
        <ChurnFeed />
      </section>
    </>
  );
}
