"use client";

import { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import type { RowSelectionState } from "@tanstack/react-table";

import type { CustomerFilters } from "@/components/domain/customers/filter/FilterList";
import { DataTable } from "@/components/domain/customers/list/DataTable";
import { type CustomerRow, getColumns } from "@/components/domain/customers/list/getColumns";
import { CustomerModal } from "@/components/domain/customers/modals/CustomerModal";
import { useAdminMembersStatus } from "@/lib/tanstack/mutation/useAdminMembersStatus";
import { useAdminMembers } from "@/lib/tanstack/query/useAdminMembers";
import { toAdminMembersParams } from "@/services/customers/toAdminMembersParams";

import { ConfirmModal } from "./modals/ConfirmModal";

// 백엔드 status -> UI 상태 매핑
function toUiStatus(s: string): CustomerRow["status"] {
  if (s === "ACTIVE") return "정상";
  if (s === "BANNED") return "정지";
  if (s === "DELETED") return "탈퇴";
  return "가입중"; // PROCESSING 등
}

// 백엔드 gender -> UI 성별 매핑
function toUiGender(g: string): CustomerRow["gender"] {
  return g === "M" ? "남" : "여";
}

// 백엔드 membership -> UI 등급 매핑 (우수=GOLD로 처리)
function toUiGrade(m: string): CustomerRow["grade"] {
  if (m === "VIP") return "VIP";
  if (m === "VVIP") return "VVIP";
  return "우수"; // GOLD -> 우수
}

// birthDate "YYYY-MM-DD" -> "YYYY.MM.DD"
function dotDate(d: string): string {
  return d?.replaceAll("-", ".") ?? "";
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
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    to: "BANNED" | "ACTIVE";
    ids: string[];
  } | null>(null);

  const params = toAdminMembersParams({ page, size, keyword, filters });

  const { data, isLoading, isError } = useAdminMembers(params, true);

  const members = data?.members ?? [];

  // API -> UI rows
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
  const selectedIds = Object.keys(rowSelection).filter((id) => rowSelection[id]);
  const selectedCount = selectedIds.length;

  // id -> customer 맵
  const customerById = new Map(rows.map((c) => [c.id, c]));

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
      bulkAction = "BANNED";
    } else if (selectedStatuses.size === 1 && selectedStatuses.has("정지")) {
      bulkAction = "ACTIVE";
    }
  }

  const queryClient = useQueryClient();

  const statusMutation = useAdminMembersStatus({
    onSuccess: (res) => {
      console.log("[STATUS PATCH SUCCESS]", res);
      onRowSelectionChange({});
      queryClient.invalidateQueries({ queryKey: ["adminMembers"] });
    },
    onError: (err) => {
      console.log("[STATUS PATCH ERROR]", err);
    },
  });

  const openConfirm = (to: "BANNED" | "ACTIVE", ids: string[]) => {
    if (ids.length === 0) return;

    setPendingAction({ to, ids });
    setConfirmOpen(true);
  };

  const handleBulk = (to: "BANNED" | "ACTIVE") => {
    openConfirm(to, selectedIds);
  };

  const columns = getColumns({
    bulkAction,
    onBulkAction: handleBulk,
    onRowAction: (to, id) => openConfirm(to, [id]),

    isMutating: statusMutation.isPending,
  });

  const totalCount = data?.pagination.totalCount ?? 0;

  if (isLoading) {
    return (
      <div className="bg-neutral-0 rounded-xl border border-neutral-300 p-6 text-neutral-900">
        데이터를 불러오는 중 입니다...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-neutral-0 text-danger-500 rounded-xl border border-neutral-300 p-6">
        데이터 조회에 실패했습니다
      </div>
    );
  }

  return (
    <div className="bg-neutral-0 rounded-xl border border-neutral-300">
      <div className="flex items-center justify-between px-5 pt-6 pb-4">
        <span className="text-lg font-medium text-neutral-900">{`전체 ${totalCount}건`}</span>
        <span className="text-md font-medium text-neutral-500">{`선택 ${selectedCount}건`}</span>
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
          setSelectedCustomer(Number(row.id));
          setOpen(true);
        }}
      />

      <CustomerModal
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) setSelectedCustomer(null);
        }}
        memberId={selectedCustomer}
      />

      {confirmOpen && pendingAction && (
        <ConfirmModal
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          action={pendingAction.to}
          count={pendingAction.ids.length}
          onConfirm={() => {
            const memberIds = pendingAction.ids.map((id) => Number(id)).filter(Number.isFinite);

            statusMutation.mutate({
              memberIds,
              status: pendingAction.to,
            });

            setConfirmOpen(false);
            setPendingAction(null);
          }}
        />
      )}
    </div>
  );
}
