"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { IndeterminateCheckbox } from "@/components/common/IndeterminateCheckbox";

export type CustomerRow = {
  id: string;
  grade: "우수" | "VIP" | "VVIP";
  gender: "남" | "여";
  name: string;
  birth: string;
  phone: string;
  email: string;
  planText: string;
};

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

  /* 3~9번째 컬럼 (사용자 기본 정보) */
  { accessorKey: "grade", header: "등급" },
  { accessorKey: "gender", header: "성별" },
  { accessorKey: "name", header: "이름" },
  { accessorKey: "birth", header: "생년월일" },
  { accessorKey: "phone", header: "연락처" },
  { accessorKey: "email", header: "이메일" },
  { accessorKey: "planText", header: "이용 요금제" },

  /* 10번째 컬럼 (정지버튼) */
  {
    id: "action",
    header: "",
    cell: ({ row }) => {
      const isSelected = row.getIsSelected();

      if (!isSelected) return <span className="text-neutral-500">-</span>;

      return (
        <button
          type="button"
          className="bg-danger-500 text-neutral-0 cursor-pointer rounded-md px-3 py-1 text-sm font-semibold hover:opacity-60"
          onClick={() => {
            // TODO: 여기서 "정지 처리" (API 붙일 때)
            console.log("정지:", row.original.id);
          }}>
          정지
        </button>
      );
    },
    enableSorting: false,
    size: 96,
  },
];
