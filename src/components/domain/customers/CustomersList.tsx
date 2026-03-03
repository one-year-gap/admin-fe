"use client";

import { useState } from "react";

import type { RowSelectionState } from "@tanstack/react-table";

import type { CustomerFilters } from "@/components/domain/customers/filter/FilterList";
import { DataTable } from "@/components/domain/customers/list/DataTable";
import { type CustomerRow, getColumns } from "@/components/domain/customers/list/getColumns";
import { useAdminMembers } from "@/lib/tanstack/query/useAdminMembers";
import { toAdminMembersParams } from "@/services/customers/toAdminMembersParams";

import { CustomerModal } from "./list/CustomerModal";

// 백엔드 status -> UI status 매핑
function toUiStatus(s: string): CustomerRow["status"] {
  if (s === "ACTIVE") return "정상";
  if (s === "BANNED") return "정지";
  if (s === "DELETED") return "탈퇴";
  return "가입중"; // PROCESSING 등
}

// 백엔드 gender -> UI gender 매핑
function toUiGender(g: string): CustomerRow["gender"] {
  return g === "M" ? "남" : "여";
}

// 백엔드 membership -> UI grade 매핑 (우수=GOLD로 처리)
function toUiGrade(m: string): CustomerRow["grade"] {
  if (m === "VIP") return "VIP";
  if (m === "VVIP") return "VVIP";
  return "우수"; // GOLD -> 우수
}

// birthDate "YYYY-MM-DD" -> "YYYY.MM.DD"
function dotDate(d: string): string {
  return d.replaceAll("-", ".");
}

type Props = {
  keyword: string;
  filters: CustomerFilters;

  page: number; // 1-based
  size: number;
  onPageChange: (next: number) => void;

  rowSelection: RowSelectionState;
  onRowSelectionChange: (next: RowSelectionState) => void;
};

export function CustomersList({
  keyword,
  filters,
  page,
  size,
  onPageChange,
  rowSelection,
  onRowSelectionChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerRow | null>(null);

  const params = toAdminMembersParams({ page, size, keyword, filters });
  const { data, isLoading, isError } = useAdminMembers(params, true);

  // API -> UI rows
  const members = data?.members ?? [];
  const rows: CustomerRow[] = members.map((m) => ({
    id: String(m.id),
    grade: toUiGrade(m.membership),
    gender: toUiGender(m.gender),
    name: m.name,
    birth: dotDate(m.birthDate),
    phone: m.phone,
    email: m.email,
    planText: m.planName,
    status: toUiStatus(m.status),
  }));

  // 선택된 id 목록
  const selectedIds = Object.keys(rowSelection);
  const selectedCount = selectedIds.length;

  // id -> customer 맵
  const customerById = new Map<string, CustomerRow>();
  for (const c of rows) customerById.set(c.id, c);

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

  const totalCount = data?.pagination.totalCount ?? 0;
  const totalPage = data?.pagination.totalPage ?? 1;

  if (isError) {
    return (
      <div className="bg-neutral-0 rounded-xl border border-neutral-300 p-6 text-neutral-900">
        데이터를 불러오지 못했습니다.
      </div>
    );
  }

  return (
    <div className="bg-neutral-0 rounded-xl border border-neutral-300">
      <div className="flex items-center justify-between px-5 pt-6 pb-4">
        <span className="text-lg font-medium text-neutral-900">
          {isLoading ? "불러오는 중..." : `전체 ${totalCount}건`}
        </span>

        <span className="text-md font-medium text-neutral-500">선택 {selectedCount}건</span>
      </div>

      <DataTable
        data={rows}
        columns={columns}
        page={page}
        size={size}
        totalPage={data?.pagination.totalPage ?? 1}
        onPageChange={onPageChange}
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
