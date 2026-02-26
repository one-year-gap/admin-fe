"use client";

import { useState } from "react";

import type { CustomerFilters } from "@/components/domain/customers/filter/FilterBar";
import { columns, type CustomerRow } from "@/components/domain/customers/list/columns";
import { DataTable } from "@/components/domain/customers/list/DataTable";

import { CustomerModal } from "./CustomerModal";

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

export function CustomersList({ keyword, filters }: { keyword: string; filters: CustomerFilters }) {
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerRow | null>(null);

  void keyword;
  void filters;

  return (
    <div className="bg-neutral-0 rounded-xl border border-neutral-300">
      <div className="flex items-center justify-start px-5 pt-6 pb-4">
        <span className="text-lg font-medium text-neutral-900">전체 {MOCK_CUSTOMERS.length}건</span>
      </div>

      <DataTable
        data={MOCK_CUSTOMERS}
        columns={columns}
        pageSize={10}
        onRowClick={(row) => {
          setSelectedCustomer(row);
          setOpen(true);
        }}
      />

      {/* <CustomerDetailModal open={open} onOpenChange={setOpen} customer={selectedCustomer} /> */}
      <CustomerModal open={open} onOpenChange={setOpen} customer={selectedCustomer} />
    </div>
  );
}
