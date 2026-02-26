"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { IndeterminateCheckbox } from "@/components/common/IndeterminateCheckbox";

export type CustomerRow = {
  id: string;
  grade: "우수" | "VIP" | "VVIP";
  name: string;
  riskLevel: "고위험군" | "중위험군";
  riskReason: string;
  churnPercent: number;
  phone: string;
  email: string;
};

function ChurnBar({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, value));

  const barClass = pct >= 80 ? "bg-danger-500" : "bg-warning-500";

  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-28 overflow-hidden rounded-full bg-neutral-300">
        <div className={`h-full ${barClass}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-semibold text-neutral-700">{pct}%</span>
    </div>
  );
}

export const columns: ColumnDef<CustomerRow>[] = [
  /* 1번째 컬럼 (체크박스) */
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex w-full items-center justify-center">
        <IndeterminateCheckbox
          ariaLabel="전체 선택"
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={table.getIsSomePageRowsSelected()}
          onChange={(v) => table.toggleAllPageRowsSelected(v)}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex w-full items-center justify-center">
        <IndeterminateCheckbox
          ariaLabel="행 선택"
          checked={row.getIsSelected()}
          onChange={(v) => row.toggleSelected(v)}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    size: 48,
  },

  /* 2번째 컬럼 (No.) */
  {
    id: "no",
    header: "No.",
    cell: ({ table, row }) => {
      const { pageIndex, pageSize } = table.getState().pagination;
      return String(pageIndex * pageSize + row.index + 1).padStart(2, "0");
    },
    enableSorting: false,
    size: 64,
  },

  /* 3~6번째 컬럼 (사용자 기본 정보) */
  { accessorKey: "grade", header: "등급", size: 80 },
  { accessorKey: "name", header: "이름", size: 80 },
  { accessorKey: "riskLevel", header: "위험도", size: 90 },
  { accessorKey: "riskReason", header: "위험사유", size: 180 },

  /* 7번째 컬럼 (이탈확률바) */
  {
    id: "churnPercent",
    header: "이탈 확률",
    cell: ({ row }) => <ChurnBar value={row.original.churnPercent} />,
    size: 180,
  },

  /* 8~9번째 컬럼 (연락처 이메일) */
  { accessorKey: "phone", header: "연락처", size: 150 },
  { accessorKey: "email", header: "이메일", size: 180 },

  /* 10번째 컬럼 (쿠폰버튼) */
  {
    id: "action",
    header: "",
    cell: ({ row }) => {
      const isSelected = row.getIsSelected();

      if (!isSelected) return <div className="flex items-center justify-center">-</div>;

      return (
        <div className="flex items-center justify-center">
          <button
            type="button"
            className="bg-secondary-500 text-neutral-0 cursor-pointer rounded-md px-4 py-2 text-sm font-medium hover:opacity-60"
            onClick={() =>
              // TODO: 여기서 "쿠폰 발급 처리" (API 붙일 때)
              console.log("쿠폰 발급:", row.original.id)
            }>
            쿠폰 발급
          </button>
        </div>
      );
    },
    enableSorting: false,
    size: 120,
  },
];
