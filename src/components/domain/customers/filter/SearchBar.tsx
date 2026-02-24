"use client";

import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (next: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <button
        type="button"
        className="absolute top-0 bottom-0 left-0 flex cursor-pointer items-center pl-4"
        aria-label="검색">
        <Search className="text-primary-500 size-5" />
      </button>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="고객명, 연락처로 검색"
        className="bg-neutral-0 placeholder:text-md focus-visible:border-primary-500 focus:border-primary-500 text-md h-auto w-full truncate rounded-lg border border-neutral-300 py-3 pr-3 pl-12 font-medium shadow-none transition-colors duration-1000 ease-out placeholder:truncate placeholder:font-normal placeholder:text-neutral-500 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
}
