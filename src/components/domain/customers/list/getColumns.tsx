"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { IndeterminateCheckbox } from "@/components/common/IndeterminateCheckbox";
import { cn } from "@/lib/utils";

export type CustomerRow = {
  id: string;
  grade: "우수" | "VIP" | "VVIP";
  gender: "남" | "여";
  name: string;
  birth: string;
  phone: string;
  email: string;
  planText: string;
  status: "정상" | "정지" | "가입중" | "탈퇴";
};

export function getColumns(opts: {
  bulkAction: "BANNED" | "ACTIVE" | null;
  onBulkAction: (to: "BANNED" | "ACTIVE") => void;
}): ColumnDef<CustomerRow>[] {
  const { bulkAction, onBulkAction } = opts;

  return [
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
      size: 60,
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
      size: 80,
    },

    /* 3~9번째 컬럼 (사용자 기본 정보) */
    { accessorKey: "grade", header: "등급", size: 80 },
    { accessorKey: "gender", header: "성별", size: 60 },
    { accessorKey: "name", header: "이름", size: 80 },
    { accessorKey: "birth", header: "생년월일", size: 120 },
    { accessorKey: "phone", header: "연락처", size: 150 },
    { accessorKey: "email", header: "이메일", size: 180 },
    { accessorKey: "planText", header: "이용 요금제", size: 150 },

    /* 10번째 컬럼 (사용자 상태) */
    {
      accessorKey: "status",
      header: "상태",
      size: 80,
      cell: ({ getValue }) => {
        const v = getValue<CustomerRow["status"]>();

        const classByStatus: Record<CustomerRow["status"], string> = {
          정상: "bg-success-500 text-neutral-0",
          정지: "bg-danger-500 text-neutral-0",
          가입중: "bg-warning-500 text-neutral-0",
          탈퇴: "bg-neutral-500 text-neutral-0",
        };

        return (
          <span
            className={cn(
              "inline-flex rounded-full px-3 py-1 text-sm font-semibold",
              classByStatus[v],
            )}>
            {v}
          </span>
        );
      },
    },

    /* 11번째 컬럼 (정지/해제 버튼) */
    {
      id: "action",
      header: () =>
        bulkAction ? (
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => onBulkAction(bulkAction)}
              className={cn(
                "text-neutral-0 cursor-pointer rounded-md px-4 py-2 text-sm font-semibold hover:opacity-60",
                bulkAction === "BANNED" ? "bg-danger-500" : "bg-secondary-500",
              )}>
              {bulkAction === "BANNED" ? "일괄 정지" : "일괄 정지해제"}
            </button>
          </div>
        ) : (
          <span />
        ),
      cell: ({ row }) => {
        const isSelected = row.getIsSelected();
        const status = row.original.status;

        if (!isSelected) return <div className="flex items-center justify-center">-</div>;

        if (status === "가입중" || status === "탈퇴") {
          return <div className="flex items-center justify-center">-</div>;
        }

        const isStopped = status === "정지";
        const label = isStopped ? "정지해제" : "정지";

        return (
          <div className="flex items-center justify-center">
            <button
              type="button"
              className={cn(
                "text-neutral-0 cursor-pointer rounded-md px-4 py-2 text-sm font-semibold hover:opacity-60",
                "opacity-0 group-hover:opacity-100",
                isStopped ? "bg-secondary-500" : "bg-danger-500",
              )}
              onClick={() => {
                // TODO: 여기서 "정지 처리" (API 붙일 때)
              }}>
              {label}
            </button>
          </div>
        );
      },
      enableSorting: false,
      size: 100,
    },
  ];
}
