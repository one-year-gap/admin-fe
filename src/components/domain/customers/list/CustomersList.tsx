"use client";

import React from "react";

import type { CustomerFilters } from "@/components/domain/customers/filter/FilterBar";
import { columns, type CustomerRow } from "@/components/domain/customers/list/columns";
import { CustomerDetailModal } from "@/components/domain/customers/list/CustomerDetailModal";
import { DataTable } from "@/components/domain/customers/list/DataTable";
import { PLAN_OPTIONS } from "@/constants/customerFilters";

const MOCK_CUSTOMERS: CustomerRow[] = Array.from({ length: 137 }, (_, i) => {
  const n = i + 1;
  return {
    id: String(n).padStart(4, "0"),
    grade: n % 3 === 0 ? "VVIP" : n % 3 === 1 ? "VIP" : "우수",
    gender: n % 2 === 0 ? "남" : "여",
    name: `고객${n}`,
    birth: "1999.01.01",
    phone: "010-****-1234",
    email: `${n}@gmail.com`,
    planText: n % 2 === 0 ? "5G 프리미엄" : "LTE 베이직",
  };
});

function normalize(str: string) {
  return str.trim().toLowerCase();
}

function buildPlanValueToLabelMap() {
  const map = new Map<string, string>();
  Object.values(PLAN_OPTIONS).forEach((arr) => {
    arr.forEach((opt) => map.set(opt.value, opt.label));
  });
  return map;
}

const PLAN_VALUE_TO_LABEL = buildPlanValueToLabelMap();

function extractSelectedPlanLabels(filters: CustomerFilters): string[] {
  const plan = filters.plan;
  const selectedValues = [
    ...plan.mobile5gLte,
    ...plan.tabletWatch,
    ...plan.addon,
    ...plan.iptv,
    ...plan.internet,
  ];

  // value -> label로 변환(못 찾으면 value 그대로)
  return selectedValues.map((v) => PLAN_VALUE_TO_LABEL.get(v) ?? v);
}

function applyMockFilters(rows: CustomerRow[], keyword: string, filters: CustomerFilters) {
  const q = normalize(keyword);

  // grade 매핑(필터 값이 영어코드로 들어와도 매칭되게)
  const gradeMap: Record<string, CustomerRow["grade"]> = {
    good: "우수",
    vip: "VIP",
    vvip: "VVIP",
  };

  const selectedGrades = (filters.grade ?? [])
    .map((g) => gradeMap[normalize(g)] ?? g) // "vip" -> "VIP"
    .map((g) => g.toUpperCase()); // VIP/VVIP 정규화

  const genderMap: Record<string, CustomerRow["gender"]> = {
    m: "남",
    f: "여",
    남: "남",
    여: "여",
  };

  const selectedGenders = (filters.gender ?? []).map((g) => genderMap[normalize(g)] ?? g);

  const selectedPlanLabels = extractSelectedPlanLabels(filters).map(normalize);
  const hasPlanFilter = selectedPlanLabels.length > 0;

  return rows.filter((r) => {
    // 1) keyword (이름/연락처/이메일에 포함)
    if (q) {
      const hay = normalize(`${r.name} ${r.phone} ${r.email}`);
      if (!hay.includes(q)) return false;
    }

    // 2) grade
    if (selectedGrades.length > 0) {
      const g = r.grade.toUpperCase();
      if (!selectedGrades.includes(g)) return false;
    }

    // 3) gender
    if (selectedGenders.length > 0) {
      if (!selectedGenders.includes(r.gender)) return false;
    }

    // 4) plan (선택된 요금제 label 중 하나와 일치/포함)
    if (hasPlanFilter) {
      const planText = normalize(r.planText);
      const ok = selectedPlanLabels.some((p) => planText.includes(p));
      if (!ok) return false;
    }

    return true;
  });
}

export function CustomersList({ keyword, filters }: { keyword: string; filters: CustomerFilters }) {
  const [open, setOpen] = React.useState(false);
  const [selectedCustomer, setSelectedCustomer] = React.useState<CustomerRow | null>(null);

  const data = React.useMemo(() => {
    return applyMockFilters(MOCK_CUSTOMERS, keyword, filters);
  }, [keyword, filters]);

  const memoColumns = React.useMemo(() => columns, []);

  const tableKey = React.useMemo(() => {
    return `${keyword}::${JSON.stringify(filters)}`;
  }, [keyword, filters]);

  return (
    <div className="bg-neutral-0 rounded-xl border border-neutral-300">
      <div className="flex items-center justify-start px-5 pt-6 pb-4">
        <span className="text-lg font-medium text-neutral-900">전체 {data.length}건</span>
      </div>

      <DataTable
        key={tableKey}
        data={data}
        columns={memoColumns}
        pageSize={10}
        onRowClick={(row) => {
          setSelectedCustomer(row);
          setOpen(true);
        }}
      />

      <CustomerDetailModal open={open} onOpenChange={setOpen} customer={selectedCustomer} />
    </div>
  );
}
