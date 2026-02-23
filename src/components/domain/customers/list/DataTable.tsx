"use client";

import React from "react";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  type PaginationState,
  type RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type DataTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  pageSize?: number;

  /** 서버 페이지네이션으로 확장할 때 바깥으로 뺄 수 있게 열어둠 */
  onRowSelectionChange?: (next: RowSelectionState) => void;
};

export function DataTable<TData>({
  data,
  columns,
  pageSize = 10,
  onRowSelectionChange,
}: DataTableProps<TData>) {
  // TanStack이 권장하는 선택 상태 구조 (selectedIds 대체)
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  // 클라이언트 페이지네이션 상태
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const table = useReactTable({
    data,
    columns,

    state: { rowSelection, pagination },

    onRowSelectionChange: (updater) => {
      const next = typeof updater === "function" ? updater(rowSelection) : updater;
      setRowSelection(next);
      onRowSelectionChange?.(next);
    },

    onPaginationChange: setPagination,

    enableRowSelection: true,

    // 기본 row model + pagination model
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const pageRows = table.getRowModel().rows;

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[880px]">
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id} className="border-b border-neutral-300">
              {hg.headers.map((header) => (
                <TableHead key={header.id} className="text-md px-4 py-3 text-neutral-500">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody className="divide-y divide-neutral-300">
          {pageRows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={table.getAllLeafColumns().length}
                className="text-md px-5 py-10 text-center text-neutral-500">
                결과가 없습니다
              </TableCell>
            </TableRow>
          ) : (
            pageRows.map((row) => (
              <TableRow
                key={row.id}
                className="cursor-pointer hover:bg-neutral-300"
                data-state={row.getIsSelected() ? "selected" : undefined}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-md px-4 py-3 text-neutral-900">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* 페이지네이션 */}
      <div className="flex items-center justify-between px-5 py-4">
        <span className="text-md font-medium text-neutral-500">
          선택 {Object.keys(rowSelection).length}건
        </span>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium disabled:opacity-60"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            이전
          </button>

          <span className="text-sm font-medium text-neutral-900">
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </span>

          <button
            type="button"
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium disabled:opacity-60"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
