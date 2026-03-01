"use client";

import React, { useState } from "react";

import { ChevronDown, Search, X } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { MultiSelectOption } from "@/constants/customerFilters";
import { cn } from "@/lib/utils";

import { PlanColumn } from "./PlanColumn";

export type PlanFilterState = {
  mobile: string[];
  tabletWatch: string[];
  iptv: string[];
  internet: string[];
  addon: string[];
};

type PlanOptions = {
  mobile: {
    fiveG: readonly MultiSelectOption[];
    lte: readonly MultiSelectOption[];
  };
  tabletWatch: readonly MultiSelectOption[];
  iptv: readonly MultiSelectOption[];
  internet: readonly MultiSelectOption[];
  addon: {
    digitalContent: readonly MultiSelectOption[];
    familyCare: readonly MultiSelectOption[];
    phoneCare: readonly MultiSelectOption[];
  };
};

type PlanFilterItemProps = {
  label?: string;
  value: PlanFilterState;
  onChange: (next: PlanFilterState) => void;
  options: PlanOptions;
  triggerClassName?: string;
  popoverClassName?: string;
};

type ListKey = keyof PlanFilterState;

export function PlanFilterItem({
  label = "현재 요금제",
  value,
  onChange,
  options,
  triggerClassName,
  popoverClassName,
}: PlanFilterItemProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const s = search.trim().toLowerCase();
  const filterItems = (arr: readonly MultiSelectOption[]) =>
    s.length === 0 ? arr : arr.filter((o) => o.label.toLowerCase().includes(s));

  const totalSelected =
    value.mobile.length +
    value.tabletWatch.length +
    value.iptv.length +
    value.internet.length +
    value.addon.length;

  const clearAll = () => {
    onChange({
      mobile: [],
      tabletWatch: [],
      iptv: [],
      internet: [],
      addon: [],
    });
  };

  const toggleList = (key: ListKey, v: string) => {
    const current = new Set(value[key]);
    current.has(v) ? current.delete(v) : current.add(v);
    onChange({ ...value, [key]: Array.from(current) });
  };

  const clearColumn = (key: keyof PlanFilterState) => {
    onChange({ ...value, [key]: [] });
  };

  const mobileSections = (() => {
    const fiveGSet = new Set(options.mobile.fiveG.map((o) => o.value));
    const lteSet = new Set(options.mobile.lte.map((o) => o.value));

    const countBySet = (set: Set<string>, arr: string[]) => arr.filter((v) => set.has(v)).length;

    return [
      {
        title: "5G",
        items: filterItems(options.mobile.fiveG),
        count: countBySet(fiveGSet, value.mobile),
      },
      {
        title: "LTE",
        items: filterItems(options.mobile.lte),
        count: countBySet(lteSet, value.mobile),
      },
    ];
  })();

  const addonSections = (() => {
    const digitalSet = new Set(options.addon.digitalContent.map((o) => o.value));
    const familySet = new Set(options.addon.familyCare.map((o) => o.value));
    const phoneSet = new Set(options.addon.phoneCare.map((o) => o.value));

    const countBySet = (set: Set<string>) => value.addon.filter((v) => set.has(v)).length;

    return [
      {
        title: "디지털 콘텐츠",
        items: filterItems(options.addon.digitalContent),
        count: countBySet(digitalSet),
      },
      {
        title: "가족케어",
        items: filterItems(options.addon.familyCare),
        count: countBySet(familySet),
      },
      {
        title: "휴대폰케어",
        items: filterItems(options.addon.phoneCare),
        count: countBySet(phoneSet),
      },
    ];
  })();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "bg-neutral-0 text-md flex h-auto w-32 items-center justify-between gap-2 rounded-lg border border-neutral-300 p-3",
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
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={4}
        className={cn(
          "bg-neutral-0 rounded-lg border border-neutral-300 px-3 py-2 shadow-none",
          "w-[min(1100px,95vw)]",
          popoverClassName,
        )}>
        {/* 상단 */}
        <div className="mb-1 flex items-center justify-around py-2 pl-1">
          <div className="flex flex-1 items-center gap-2">
            <span className="text-md font-semibold text-neutral-900">{label}</span>
            {totalSelected > 0 ? (
              <span className="text-sm text-neutral-500">선택 {totalSelected}개</span>
            ) : null}
          </div>

          <div className="relative flex-1">
            <div className="absolute top-0 bottom-0 left-0 flex items-center pl-3">
              <Search className="text-primary-500 size-4 cursor-pointer" />
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="요금제 검색"
              className="bg-neutral-0 focus:border-primary-500 h-auto w-full rounded-lg border border-neutral-300 py-2 pr-2 pl-9 text-sm text-neutral-900 transition-colors ease-in-out placeholder:text-sm placeholder:text-neutral-500 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="flex flex-1 justify-end">
            {totalSelected > 0 ? (
              <button
                type="button"
                onClick={clearAll}
                className="flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-sm text-neutral-500 hover:font-semibold hover:text-neutral-900">
                <span>초기화</span>
                <X className="h-4 w-4" />
              </button>
            ) : (
              <span />
            )}
          </div>
        </div>

        {/* 하단 - 5열 */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
          <PlanColumn
            title="모바일"
            sections={mobileSections}
            selectedValues={value.mobile}
            onToggle={(v) => toggleList("mobile", v)}
            onClear={() => clearColumn("mobile")}
          />

          <PlanColumn
            title="태블릿/스마트워치"
            items={filterItems(options.tabletWatch)}
            selectedValues={value.tabletWatch}
            onToggle={(v) => toggleList("tabletWatch", v)}
            onClear={() => clearColumn("tabletWatch")}
          />

          <PlanColumn
            title="IPTV"
            items={filterItems(options.iptv)}
            selectedValues={value.iptv}
            onToggle={(v) => toggleList("iptv", v)}
            onClear={() => clearColumn("iptv")}
          />

          <PlanColumn
            title="인터넷"
            items={filterItems(options.internet)}
            selectedValues={value.internet}
            onToggle={(v) => toggleList("internet", v)}
            onClear={() => clearColumn("internet")}
          />

          <PlanColumn
            title="부가서비스"
            sections={addonSections}
            selectedValues={value.addon}
            onToggle={(v) => toggleList("addon", v)}
            onClear={() => clearColumn("addon")}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
