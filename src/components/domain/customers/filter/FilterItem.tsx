"use client";

import { useMemo, useState } from "react";

import { Check, ChevronDown, X } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { MultiSelectOption } from "@/constants/customerFilters";
import { cn } from "@/lib/utils";

type FilterItemProps = {
  label: string;
  options: MultiSelectOption[];
  value: string[];
  onChange: (next: string[]) => void;

  triggerClassName?: string;
  listHeightClassName?: string;
};

export function FilterItem({
  label,
  options,
  value,
  onChange,
  triggerClassName,
  listHeightClassName = "max-h-60",
}: FilterItemProps) {
  const [open, setOpen] = useState(false);
  const selectedSet = useMemo(() => new Set(value), [value]);

  const toggle = (v: string) => {
    const next = new Set(selectedSet);
    next.has(v) ? next.delete(v) : next.add(v);
    onChange(Array.from(next));
  };

  const clear = () => onChange([]);

  const displayLabel = useMemo(() => {
    if (value.length === 0) return label;

    const firstSelectedOption = options.find((opt) => opt.value === value[0]);

    return firstSelectedOption ? firstSelectedOption.label : label;
  }, [value, options, label]);

  const extraCount = value.length > 1 ? value.length - 1 : 0;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "bg-neutral-0 text-md flex h-auto w-32 items-center justify-between gap-2 rounded-lg border border-neutral-300 p-3",
            open && "bg-primary-500 border-primary-500",
            value.length > 0 && "border-primary-500 bg-primary-500",
            triggerClassName,
          )}>
          <div className="flex items-center gap-2 overflow-hidden">
            <span
              className={cn(
                "flex-1 truncate text-left text-neutral-900",
                open && "text-neutral-0",
                value.length > 0 && "text-neutral-0",
              )}>
              {displayLabel}
            </span>

            {extraCount > 0 && (
              <span className="text-neutral-0 shrink-0 text-sm">외 {extraCount}개</span>
            )}
          </div>

          <ChevronDown
            className={cn(
              "h-4 w-4 text-neutral-900",
              open && "text-neutral-0 rotate-180",
              value.length > 0 && "text-neutral-0",
            )}
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={4}
        className={cn(
          "bg-neutral-0 rounded-lg border border-neutral-300 p-2 shadow-none",
          "w-[--radix-popover-trigger-width]",
        )}>
        {/* 카테고리 명 */}
        <div className="mb-1 flex items-center justify-between p-2">
          <span className="text-sm font-semibold text-neutral-900">{label}</span>

          {value.length > 0 ? (
            <button
              type="button"
              onClick={clear}
              className="cursor-pointer text-neutral-500 hover:font-semibold hover:text-neutral-900">
              <X className="h-4 w-4" />
            </button>
          ) : (
            <span />
          )}
        </div>

        {/* 카테고리 항목 */}
        <div className={cn("overflow-auto pr-1", listHeightClassName)}>
          <ul className="space-y-1">
            {options.length === 0 ? (
              <li className="p-2 text-sm text-neutral-500">항목이 없습니다</li>
            ) : (
              options.map((opt) => {
                const checked = selectedSet.has(opt.value);

                return (
                  <li key={opt.value}>
                    <button
                      type="button"
                      disabled={opt.disabled}
                      onClick={() => toggle(opt.value)}
                      className={cn(
                        "flex w-full cursor-pointer items-center justify-between rounded-md p-2 text-left text-sm transition-colors",
                        opt.disabled && "cursor-not-allowed opacity-50",
                        checked
                          ? "bg-primary-500 text-neutral-0"
                          : "hover:bg-primary-100 text-neutral-900",
                      )}>
                      <span>{opt.label}</span>
                      {checked ? <Check className="h-4 w-4" /> : null}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
}
