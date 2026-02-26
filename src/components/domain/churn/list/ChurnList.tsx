"use client";

import { useState } from "react";

import { DataTable } from "@/components/domain/churn/list/DataTable";

import { ChurnModal } from "./ChurnModal";
import { columns, type CustomerRow } from "./columns";

const MOCK_CUSTOMERS: CustomerRow[] = Array.from({ length: 137 }, (_, i) => {
  const n = i + 1;
  const churn = n % 3 === 0 ? 92 : n % 3 === 1 ? 65 : 28;

  return {
    id: String(n).padStart(4, "0"),
    grade: n % 3 === 0 ? "VVIP" : n % 3 === 1 ? "VIP" : "우수",
    name: `고객${n}`,
    riskLevel: churn >= 80 ? "고위험군" : "중위험군",
    riskReason: churn >= 80 ? "약정 만료 임박(D-9)" : "부정적 상담 3회 이상",
    churnPercent: churn,
    phone: "010-****-1234",
    email: `${n}@gmail.com`,
  };
});

export function CustomersList({ keyword }: { keyword: string }) {
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerRow | null>(null);

  void keyword;

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

      <ChurnModal open={open} onOpenChange={setOpen} customer={selectedCustomer} />
    </div>
  );
}
