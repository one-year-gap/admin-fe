"use client";

import { useState } from "react";

import type { RowSelectionState } from "@tanstack/react-table";

import { toast } from "sonner";

import { TableCardSkeleton } from "@/components/common/skeletons/TableCardSkeleton";
import { DataTable } from "@/components/domain/churn/list/DataTable";
import { CHURN_COUPONS } from "@/constants/coupons";
import { useCoupon } from "@/lib/tanstack/mutation/churn/useCoupon";
import { useChurnRiskMembers } from "@/lib/tanstack/query/churn/useChurnRiskMembers";
import { toChurnRiskMembersParams } from "@/services/churn/toChurnRiskMembersParams";

import type { ChurnRiskFilters } from "../search/FilterList";
import { CouponConfirmModal } from "./CouponConfirmModal";
import { type ChurnRiskRow, getColumns } from "./getColumns";

type Props = {
  keyword: string;
  filters: ChurnRiskFilters;
  page: number;
  size: number;
  onPageChange: (next: number) => void;
  rowSelection: RowSelectionState;
  onRowSelectionChange: (next: RowSelectionState) => void;
};

function toUiGrade(membership: string): ChurnRiskRow["grade"] {
  if (membership === "VIP") return "VIP";
  if (membership === "VVIP") return "VVIP";
  return "우수";
}

function toUiRisk(level: string): ChurnRiskRow["riskLevel"] {
  if (level === "HIGH") return "고위험군";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetIds, setTargetIds] = useState<string[]>([]);

  const couponMutation = useCoupon();
  const params = toChurnRiskMembersParams({ page, size, keyword, filters });
  const { data, isLoading, isError } = useChurnRiskMembers(params);
  const members = data?.data.members ?? [];

  const rows: ChurnRiskRow[] = members.map((member) => ({
    id: String(member.memberId),
    grade: toUiGrade(member.membership),
    name: member.name,
    riskLevel: toUiRisk(member.riskLevel),
    riskReason: member.riskReason,
    churnPercent: member.churnScore,
    phone: member.phone,
    email: member.email,
  }));

  const selectedRowIds = rows.filter((row) => rowSelection[row.id]).map((row) => row.id);
  const selectedCount = selectedRowIds.length;
  const pagination = data?.data.pagination;

  const columns = getColumns({
    selectedCount,
    onBulkCoupon: () => {
      setTargetIds(selectedRowIds);
      setIsModalOpen(true);
    },
    onSingleCoupon: (id) => {
      setTargetIds([id]);
      setIsModalOpen(true);
    },
  });

  if (isLoading) {
    return <TableCardSkeleton />;
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
      <div className="flex items-center justify-between px-5 pt-6 pb-4">
        <span className="text-lg font-medium text-neutral-900">{`전체 ${pagination?.totalCount ?? 0}건`}</span>
        <span className="text-md font-medium text-neutral-500">{`선택 ${selectedCount}건`}</span>
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

      <CouponConfirmModal
        open={isModalOpen}
        count={targetIds.length}
        coupons={CHURN_COUPONS}
        onClose={() => setIsModalOpen(false)}
        isLoading={couponMutation.isPending}
        onConfirm={(couponId) => {
          if (couponMutation.isPending) return;

          couponMutation.mutate(
            {
              memberIds: targetIds.map(Number),
              couponId,
            },
            {
              onSuccess: () => {
                toast.success("쿠폰을 발급했습니다.");
                setIsModalOpen(false);
              },
              onError: () => {
                toast.error("쿠폰 발급에 실패했습니다.");
              },
            },
          );
        }}
      />
    </div>
  );
}
