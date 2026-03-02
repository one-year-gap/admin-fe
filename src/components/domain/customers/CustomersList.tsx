"use client";

import { useState } from "react";

import type { RowSelectionState } from "@tanstack/react-table";

import type { CustomerFilters } from "@/components/domain/customers/filter/FilterList";
import { DataTable } from "@/components/domain/customers/list/DataTable";
import { type CustomerRow, getColumns } from "@/components/domain/customers/list/getColumns";

import { CustomerModal } from "./list/CustomerModal";

const STATUSES = ["정상", "정지", "탈퇴", "가입중"] as const;

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
    status: STATUSES[(n - 1) % STATUSES.length],
  };
});

type Props = {
  keyword: string;
  filters: CustomerFilters;
  rowSelection: RowSelectionState;
  onRowSelectionChange: (next: RowSelectionState) => void;
};

export function CustomersList({ keyword, filters, rowSelection, onRowSelectionChange }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerRow | null>(null);

  void keyword;
  void filters;

  // 선택된 id 목록
  const selectedIds = Object.keys(rowSelection);
  const selectedCount = selectedIds.length;

  // id -> customer 맵
  const customerById = new Map<string, CustomerRow>();
  for (const c of MOCK_CUSTOMERS) customerById.set(c.id, c);

  // 선택된 status 집합
  const selectedStatuses = new Set<CustomerRow["status"]>();
  for (const id of selectedIds) {
    const c = customerById.get(id);
    if (c) selectedStatuses.add(c.status);
  }

  // 일괄 버튼 노출 규칙
  let bulkAction: "BANNED" | "ACTIVE" | null = null;

  if (selectedCount > 0) {
    if (selectedStatuses.has("가입중") || selectedStatuses.has("탈퇴")) {
      bulkAction = null;
    } else if (selectedStatuses.size === 1 && selectedStatuses.has("정상")) {
      bulkAction = "BANNED"; // 일괄 정지
    } else if (selectedStatuses.size === 1 && selectedStatuses.has("정지")) {
      bulkAction = "ACTIVE"; // 일괄 정지 해제
    }
  }

  const handleBulk = (to: "BANNED" | "ACTIVE") => {
    // TODO: 일괄 정지/정지해제 API 연동 필요
    console.log("[BULK]", { toStatus: to, ids: selectedIds });
  };

  const columns = getColumns({ bulkAction, onBulkAction: handleBulk });

  return (
    <div className="bg-neutral-0 rounded-xl border border-neutral-300">
      <div className="flex items-center justify-between px-5 pt-6 pb-4">
        <span className="text-lg font-medium text-neutral-900">전체 {MOCK_CUSTOMERS.length}건</span>

        <span className="text-md font-medium text-neutral-500">선택 {selectedCount}건</span>
      </div>

      <DataTable
        data={MOCK_CUSTOMERS}
        columns={columns}
        pageSize={10}
        rowSelection={rowSelection}
        onRowSelectionChange={onRowSelectionChange}
        onRowClick={(row) => {
          setSelectedCustomer(row);
          setOpen(true);
        }}
      />

      <CustomerModal open={open} onOpenChange={setOpen} customer={selectedCustomer} />
    </div>
  );
}
