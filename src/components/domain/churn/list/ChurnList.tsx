"use client";

import { useState } from "react";

import type { RowSelectionState } from "@tanstack/react-table";

import { DataTable } from "@/components/domain/churn/list/DataTable";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetIds, setTargetIds] = useState<string[]>([]);

  const couponMutation = useCoupon();

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

  const selectedRowIds = rows.filter((row) => rowSelection[row.id]).map((row) => row.id);

  const pagination = data?.data.pagination;

  const selectedCount = selectedRowIds.length;

  const columns = getColumns({
    selectedCount: selectedRowIds.length,
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
      <div className="flex items-center justify-between px-5 pt-6 pb-4">
        <span className="text-lg font-medium text-neutral-900">
          전체 {pagination?.totalCount ?? 0}건
        </span>
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
        coupons={[
          { id: 1, name: "이탈 방지 쿠폰" },
          { id: 2, name: "요금제 할인 쿠폰" },
        ]}
        onClose={() => setIsModalOpen(false)}
        onConfirm={(couponId) => {
          couponMutation.mutate({
            memberIds: targetIds.map(Number),
            couponId,
          });

          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
