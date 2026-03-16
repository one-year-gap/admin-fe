"use client";

import { useState } from "react";

import type { RowSelectionState } from "@tanstack/react-table";

import { DataTable } from "@/components/domain/churn/list/DataTable";
import { useChurnRiskMembers } from "@/lib/tanstack/query/churn/useChurnRiskMembers";
import { toChurnRiskMembersParams } from "@/services/churn/toChurnRiskMembersParams";

import type { ChurnRiskFilters } from "../search/FilterList";
import { ChurnModal } from "./ChurnModal";
import type { ChurnRiskRow } from "./columns";
import { columns } from "./columns";

type Props = {
  keyword: string;
  filters: ChurnRiskFilters;

  page: number;
  size: number;
  onPageChange: (next: number) => void;

  rowSelection: RowSelectionState;
  onRowSelectionChange: (next: RowSelectionState) => void;
};

function toUiGrade(m: string): ChurnRiskRow["grade"] {
  if (m === "VIP") return "VIP";
  if (m === "VVIP") return "VVIP";
  return "우수";
}

function toUiRisk(m: string): ChurnRiskRow["riskLevel"] {
  if (m === "HIGH") return "고위험군";
  return "중위험군";
}

export function ChurnList({
  keyword,
  filters,
  page,
  size,
  onPageChange,
  rowSelection,
  onRowSelectionChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<ChurnRiskRow | null>(null);

  const params = toChurnRiskMembersParams({ page, size, keyword, filters });

  const { data, isLoading, isError } = useChurnRiskMembers(params);

  const members = data?.data.members ?? [];

  const rows: ChurnRiskRow[] = members.map((m) => ({
    id: String(m.memberId),
    grade: toUiGrade(m.membership),
    name: m.name,
    riskLevel: toUiRisk(m.riskLevel),
    riskReason: m.riskReason,
    churnPercent: m.churnScore,
    phone: m.phone,
    email: m.email,
  }));

  const pagination = data?.data.pagination;

  if (isLoading) {
    return (
      <div className="bg-neutral-0 rounded-xl border border-neutral-300 p-6">
        데이터를 불러오는 중...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-neutral-0 text-danger-500 rounded-xl border border-neutral-300 p-6">
        데이터 조회 실패
      </div>
    );
  }

  return (
    <div className="bg-neutral-0 rounded-xl border border-neutral-300">
      <div className="flex items-center justify-start px-5 pt-6 pb-4">
        <span className="text-lg font-medium text-neutral-900">
          전체 {pagination?.totalCount ?? 0}건
        </span>
      </div>

      <DataTable
        data={rows}
        columns={columns}
        page={page}
        size={size}
        totalPage={pagination?.totalPage ?? 1}
        onPageChange={onPageChange}
        rowSelection={rowSelection}
        onRowSelectionChange={onRowSelectionChange}
      />

      <ChurnModal open={open} onOpenChange={setOpen} customer={selectedCustomer} />
    </div>
  );
}
