import React from "react";

import type { ChurnRiskFilters } from "@/components/domain/churn/search/FilterList";
import { FilterList } from "@/components/domain/churn/search/FilterList";
import { ResetFilterButton } from "@/components/domain/churn/search/ResetFilterButton";
import { SearchButton } from "@/components/domain/churn/search/SearchButton";
import { SearchInput } from "@/components/domain/churn/search/SearchInput";

type Props = {
  keyword: string;
  onKeywordChange: (v: string) => void;
  filters: ChurnRiskFilters;
  onFiltersChange: (v: ChurnRiskFilters) => void;
  onSearch: () => void;
  onResetFilters: () => void;
  isFiltered: boolean;
};

export function SearchSection({
  keyword,
  onKeywordChange,
  filters,
  onFiltersChange,
  onSearch,
  onResetFilters,
  isFiltered,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <SearchInput value={keyword} onChange={onKeywordChange} onSearch={onSearch} />
        <FilterList value={filters} onChange={onFiltersChange} />
      </div>
      <div className="flex items-center gap-3">
        <ResetFilterButton onClick={onResetFilters} disabled={!isFiltered} />
        <SearchButton onClick={onSearch} />
      </div>
    </div>
  );
}
