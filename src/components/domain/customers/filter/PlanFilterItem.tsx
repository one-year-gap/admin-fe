"use client";

import React from "react";

import { ChevronDown, Search, X } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { MultiSelectOption } from "@/constants/customerFilters";
import { cn } from "@/lib/utils";

import { PlanColumn } from "./PlanColumn";

export type PlanFilterState = {
  mobile5gLte: string[];
  tabletWatch: string[];
  addon: string[];
  iptv: string[];
  internet: string[];
};

type PlanOptions = {
  [K in keyof PlanFilterState]: readonly MultiSelectOption[];
};

type PlanFilterItemProps = {
  label?: string;
  value: PlanFilterState;
  onChange: (next: PlanFilterState) => void;

  options: PlanOptions;

  triggerClassName?: string;
  popoverClassName?: string;
};

export function PlanFilterItem({
  label = "현재 요금제",
  value,
  onChange,
  options,
  triggerClassName,
  popoverClassName,
}: PlanFilterItemProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const s = search.trim().toLowerCase();
  const filterItems = (arr: readonly MultiSelectOption[]) =>
    s.length === 0 ? arr : arr.filter((o) => o.label.toLowerCase().includes(s));

  const totalSelected =
    value.mobile5gLte.length +
    value.tabletWatch.length +
    value.addon.length +
    value.iptv.length +
    value.internet.length;

  const clearAll = () => {
    onChange({
      mobile5gLte: [],
      tabletWatch: [],
      addon: [],
      iptv: [],
      internet: [],
    });
  };

  const toggle = (key: keyof PlanFilterState, v: string) => {
    const current = new Set(value[key]);
    current.has(v) ? current.delete(v) : current.add(v);
    onChange({ ...value, [key]: Array.from(current) });
  };

  const Trigger = (
    <button
      type="button"
      className={cn(
        "bg-neutral-0 text-md flex h-auto w-30 items-center justify-between gap-2 rounded-lg border border-neutral-300 p-3",
        (open || totalSelected > 0) && "border-primary-500 bg-primary-500",
        triggerClassName,
      )}>
      <div className="flex items-center gap-2 overflow-hidden">
        <span
          className={cn(
            "truncate text-neutral-900",
            (open || totalSelected > 0) && "text-neutral-0",
          )}>
          {label}
        </span>

        {totalSelected > 0 ? (
          <span className="text-neutral-0 shrink-0 text-sm">총 {totalSelected}개</span>
        ) : null}
      </div>

      <ChevronDown
        className={cn(
          "h-4 w-4 text-neutral-900",
          open && "rotate-180",
          (open || totalSelected > 0) && "text-neutral-0",
        )}
      />
    </button>
  );

  React.useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{Trigger}</PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={4}
        className={cn(
          "bg-neutral-0 rounded-lg border border-neutral-300 px-3 py-2 shadow-none",
          "w-225 max-w-[90vw]",
          popoverClassName,
        )}>
        {/* 카테고리 명 */}
        <div className="mb-1 flex items-center justify-around p-2">
          <div className="flex flex-1 items-center gap-2">
            <span className="text-sm font-semibold text-neutral-900">{label}</span>
            {totalSelected > 0 ? (
              <span className="text-sm text-neutral-500">선택 {totalSelected}개</span>
            ) : null}
          </div>

          <div className="relative flex-1">
            <div className="absolute top-0 bottom-0 left-0 flex items-center pl-2">
              <Search className="text-primary-500 size-4 cursor-pointer" />
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="요금제 검색"
              className="bg-neutral-0 focus:border-primary-500 h-auto w-full rounded-lg border border-neutral-300 py-1 pr-2 pl-8 text-sm text-neutral-900 placeholder:text-sm placeholder:text-neutral-500"
            />
          </div>
          <div className="flex flex-1 justify-end">
            {totalSelected > 0 ? (
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-neutral-500 hover:font-semibold hover:text-neutral-900">
                <X className="h-4 w-4" />
                초기화
              </button>
            ) : (
              <span />
            )}
          </div>
        </div>

        {/* 카테고리 항목 - 5줄 */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
          <PlanColumn
            title="5G/LTE"
            items={filterItems(options.mobile5gLte)}
            selectedValues={value.mobile5gLte}
            onToggle={(v) => toggle("mobile5gLte", v)}
          />
          <PlanColumn
            title="태블릿/스마트워치"
            items={filterItems(options.tabletWatch)}
            selectedValues={value.tabletWatch}
            onToggle={(v) => toggle("tabletWatch", v)}
          />
          <PlanColumn
            title="부가서비스"
            items={filterItems(options.addon)}
            selectedValues={value.addon}
            onToggle={(v) => toggle("addon", v)}
          />
          <PlanColumn
            title="IPTV"
            items={filterItems(options.iptv)}
            selectedValues={value.iptv}
            onToggle={(v) => toggle("iptv", v)}
          />
          <PlanColumn
            title="인터넷"
            items={filterItems(options.internet)}
            selectedValues={value.internet}
            onToggle={(v) => toggle("internet", v)}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
