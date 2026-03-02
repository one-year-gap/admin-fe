import React from "react";

import type { CustomerFilters } from "./filter/FilterList";
import { FilterList } from "./filter/FilterList";
import { ResetFilterButton } from "./search/ResetFilterButton";
import { SearchButton } from "./search/SearchButton";
import { SearchInput } from "./search/SearchInput";

type Props = {
  keyword: string;
  onKeywordChange: (v: string) => void;
  filters: CustomerFilters;
  onFiltersChange: (v: CustomerFilters) => void;
  onSearch: () => void;
  onResetFilters: () => void;
  isFilterd: boolean;
};

export function SearchSection({
  keyword,
  onKeywordChange,
  filters,
  onFiltersChange,
  onSearch,
  onResetFilters,
  isFilterd,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <SearchInput value={keyword} onChange={onKeywordChange} />
        <FilterList value={filters} onChange={onFiltersChange} />
      </div>
      <div className="flex items-center gap-3">
        <ResetFilterButton onClick={onResetFilters} disabled={!isFilterd} />
        <SearchButton onClick={onSearch} />
      </div>
    </div>
  );
}
