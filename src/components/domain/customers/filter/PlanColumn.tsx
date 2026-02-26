"use client";

import { useMemo } from "react";

import { Check } from "lucide-react";

import type { MultiSelectOption } from "@/constants/customerFilters";
import { cn } from "@/lib/utils";

type PlanColumnProps = {
  title: string;
  items: readonly MultiSelectOption[];
  selectedValues: string[];
  onToggle: (value: string) => void;

  heightClassName?: string;
};

export function PlanColumn({
  title,
  items,
  selectedValues,
  onToggle,
  heightClassName = "min-h-80 max-h-80",
}: PlanColumnProps) {
  const selected = useMemo(() => new Set(selectedValues), [selectedValues]);

  return (
    <div className="flex flex-col rounded-lg border border-neutral-300 p-2">
      <div className="mb-1 flex items-center justify-between p-2">
        <span className="text-sm font-semibold text-neutral-900">{title}</span>
        {selectedValues.length > 0 ? (
          <span className="text-sm text-neutral-500">{selectedValues.length}개</span>
        ) : null}
      </div>

      <div className={cn(heightClassName, "overflow-y-auto pr-1")}>
        <ul className="space-y-1">
          {items.length === 0 ? (
            <li className="p-2 text-sm text-neutral-500">검색 결과 없음</li>
          ) : (
            items.map((opt) => {
              const checked = selected.has(opt.value);

              return (
                <li key={opt.value}>
                  <button
                    type="button"
                    disabled={opt.disabled}
                    onClick={() => onToggle(opt.value)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md p-2 text-left text-sm transition-colors",
                      opt.disabled && "cursor-not-allowed opacity-50",
                      checked
                        ? "bg-primary-500 text-neutral-0"
                        : "hover:bg-primary-300 text-neutral-900",
                    )}>
                    <span className="truncate">{opt.label}</span>
                    {checked ? <Check className="h-4 w-4" /> : null}
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}
