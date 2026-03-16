"use client";

import { useMemo } from "react";

import { Check, X } from "lucide-react";

import type { MultiSelectOption } from "@/constants/customerFilters";
import { cn } from "@/lib/utils";

type PlanColumnSection = {
  title: string;
  items: readonly MultiSelectOption[];
  count?: number;
};

type PlanColumnProps = {
  title: string;
  items?: readonly MultiSelectOption[];
  sections?: readonly PlanColumnSection[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  onClear?: () => void;
  heightClassName?: string;
};

export function PlanColumn({
  title,
  items,
  sections,
  selectedValues,
  onToggle,
  onClear,
  heightClassName = "min-h-90 max-h-90",
}: PlanColumnProps) {
  const selected = useMemo(() => new Set(selectedValues), [selectedValues]);

  const renderItem = (opt: MultiSelectOption) => {
    const checked = selected.has(opt.value);

    return (
      <li key={opt.value}>
        <button
          type="button"
          disabled={opt.disabled}
          onClick={() => onToggle(opt.value)}
          className={cn(
            "flex w-full items-center justify-between rounded-md p-2 text-left text-sm",
            opt.disabled && "cursor-not-allowed opacity-50",
            checked ? "bg-primary-500 text-neutral-0" : "hover:bg-primary-300 text-neutral-900",
          )}>
          <span className="truncate" title={opt.label}>
            {opt.label}
          </span>
          {checked ? <Check className="h-4 w-4" /> : null}
        </button>
      </li>
    );
  };

  return (
    <div className="flex flex-col rounded-lg border border-neutral-300 p-2">
      <div className="mb-2 flex items-center justify-between border-b border-neutral-300 p-2">
        <div className="flex items-center gap-2">
          <span className="text-md font-medium text-neutral-900">{title}</span>
          {selectedValues.length > 0 ? (
            <span className="text-sm text-neutral-500">{selectedValues.length}개</span>
          ) : null}
        </div>

        {selectedValues.length > 0 ? (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onClear}
              className="cursor-pointer text-neutral-500 hover:font-semibold hover:text-neutral-900">
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </div>

      <div className={cn(heightClassName, "overflow-y-auto pr-1")}>
        {sections ? (
          <div className="space-y-2">
            {sections.map((sec, idx) => (
              <div key={`${sec.title}-${idx}`}>
                {idx > 0 ? <div className="my-2 border-t border-neutral-300" /> : null}

                <div className="flex items-center justify-between px-2 py-1 text-sm">
                  <span className="font-semibold text-neutral-900">{sec.title} 항목</span>
                  {typeof sec.count === "number" && sec.count > 0 ? (
                    <span className="text-neutral-500">{sec.count}개</span>
                  ) : null}
                </div>

                <ul className="space-y-1">
                  {sec.items.length === 0 ? (
                    <li className="p-2 text-sm text-neutral-500">검색 결과 없음</li>
                  ) : (
                    sec.items.map(renderItem)
                  )}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <ul className="space-y-1">
            {!items || items.length === 0 ? (
              <li className="p-2 text-sm text-neutral-500">검색 결과 없음</li>
            ) : (
              items.map(renderItem)
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
