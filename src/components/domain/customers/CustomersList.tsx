"use client";

import { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import type { RowSelectionState } from "@tanstack/react-table";

import { toast } from "sonner";

import { TableCardSkeleton } from "@/components/common/skeletons/TableCardSkeleton";
import type { CustomerFilters } from "@/components/domain/customers/filter/FilterList";
import { DataTable } from "@/components/domain/customers/list/DataTable";
import { type CustomerRow, getColumns } from "@/components/domain/customers/list/getColumns";
import { CustomerModal } from "@/components/domain/customers/modals/CustomerModal";
import { useAdminMembersStatus } from "@/lib/tanstack/mutation/useAdminMembersStatus";
import { useAdminMembers } from "@/lib/tanstack/query/useAdminMembers";
import { toAdminMembersParams } from "@/services/customers/toAdminMembersParams";

import { ConfirmModal } from "./modals/ConfirmModal";

function toUiStatus(status: string): CustomerRow["status"] {
  if (status === "ACTIVE") return "정상";
  if (status === "BANNED") return "정지";
  if (status === "DELETED") return "탈퇴";
  return "가입중";
}

function toUiGender(gender: string): CustomerRow["gender"] {
  return gender === "M" ? "남" : "여";
}

function toUiGrade(membership: string): CustomerRow["grade"] {
  if (membership === "VIP") return "VIP";
  if (membership === "VVIP") return "VVIP";
  return "우수";
}

function dotDate(date: string): string {
  return date?.replaceAll("-", ".") ?? "";
}

type Props = {
  keyword: string;
  filters: CustomerFilters;
  page: number;
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

  const rows: CustomerRow[] = members.map((member) => ({
    id: String(member.id),
    grade: toUiGrade(member.membership),
    gender: toUiGender(member.gender),
    name: member.name,
    birth: dotDate(member.birthDate),
    phone: member.phone,
    email: member.email,
    planText: member.planName,
    status: toUiStatus(member.status),
  }));

  const selectedIds = Object.keys(rowSelection).filter((id) => rowSelection[id]);
  const selectedCount = selectedIds.length;
  const customerById = new Map(rows.map((customer) => [customer.id, customer]));
  const selectedStatuses = new Set<CustomerRow["status"]>();

  for (const id of selectedIds) {
    const customer = customerById.get(id);
    if (customer) selectedStatuses.add(customer.status);
  }

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
    onSuccess: () => {
      toast.success("상태를 변경하였습니다.");
      onRowSelectionChange({});
      queryClient.invalidateQueries({ queryKey: ["adminMembers"] });
    },
    onError: () => {
      toast.error("상태 변경에 실패했습니다.");
    },
  });

  const openConfirm = (to: "BANNED" | "ACTIVE", ids: string[]) => {
    if (ids.length === 0) return;
    setPendingAction({ to, ids });
    setConfirmOpen(true);
  };

  const columns = getColumns({
    bulkAction,
    onBulkAction: (to) => openConfirm(to, selectedIds),
    onRowAction: (to, id) => openConfirm(to, [id]),
    isMutating: statusMutation.isPending,
  });

  const totalCount = data?.pagination.totalCount ?? 0;

  if (isLoading) {
    return <TableCardSkeleton />;
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

      {confirmOpen && pendingAction ? (
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
      ) : null}
    </div>
  );
}
