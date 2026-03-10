"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";

import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";

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
  columns: ColumnDef<TData, unknown>[];

  page: number; // 1-based
  size: number;
  totalPage: number; // API pagination.totalPage
  onPageChange: (nextPage: number) => void;

  onRowClick?: (row: TData) => void;

  /* 서버 페이지네이션으로 확장할 때 바깥으로 뺄 수 있게 열어둠 */
  rowSelection: RowSelectionState;
  onRowSelectionChange: (next: RowSelectionState) => void;
};

type PageItem = number | "ellipsis";

function getPageItems(pageIndex: number, pageCount: number): PageItem[] {
  // pageIndex는 0-based, UI는 1-based로 표시
  if (pageCount <= 1) return [1];

  const current = pageIndex + 1;
  const first = 1;
  const last = pageCount;

  const start = Math.max(2, current - 2);
  const end = Math.min(last - 1, current + 2);

  const items: PageItem[] = [first];

  if (start > 2) items.push("ellipsis");
  for (let p = start; p <= end; p++) items.push(p);
  if (end < last - 1) items.push("ellipsis");
  if (last !== first) items.push(last);

  return items;
}

export function DataTable<TData>({
  data,
  columns,
  page,
  size,
  totalPage,
  onPageChange,
  onRowClick,
  rowSelection,
  onRowSelectionChange,
}: DataTableProps<TData>) {
  // table은 0-based pageIndex를 씀
  const pageIndex = Math.max(0, page - 1);
  const pageCount = Math.max(1, totalPage);

  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => String((row as any).id),

    state: {
      rowSelection,
      pagination: { pageIndex, pageSize: size },
    },

    onRowSelectionChange: (updater) => {
      const next = typeof updater === "function" ? updater(rowSelection) : updater;
      onRowSelectionChange(next);
    },

    manualPagination: true,
    pageCount,

    enableRowSelection: true,

    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
  });

  const rows = table.getRowModel().rows;

  return (
    <div className="w-full">
      <Table className="min-w-[880px]">
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id} className="border-b border-neutral-300 hover:bg-transparent">
              {hg.headers.map((header) => (
                <TableHead
                  key={header.id}
                  style={{
                    width: header.getSize(),
                    minWidth: header.getSize(),
                    maxWidth: header.getSize(),
                  }}
                  className="text-md h-15 px-4 text-center text-neutral-500">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody className="divide-y divide-neutral-300">
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={table.getAllLeafColumns().length}
                className="text-md px-5 py-10 text-center text-neutral-500">
                결과가 없습니다
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow
                key={row.id}
                className="group cursor-pointer hover:bg-neutral-100"
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.closest('input[type="checkbox"],button,a')) return;
                  onRowClick?.(row.original);
                }}
                data-state={row.getIsSelected() ? "selected" : undefined}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                      minWidth: cell.column.getSize(),
                      maxWidth: cell.column.getSize(),
                    }}
                    className="text-md h-15 px-4 text-center text-neutral-900">
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
        <div className="flex-1">
          <span className="text-md font-medium text-neutral-500">
            선택 {Object.keys(rowSelection).length}건
          </span>
        </div>

        <div className="flex flex-2 items-center justify-center gap-4">
          {/* 이전 */}
          <button
            type="button"
            className="enabled:hover:bg-primary-100 rounded-full p-2 enabled:hover:cursor-pointer disabled:opacity-40"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}>
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* 페이지 번호 */}
          <div className="flex items-center gap-2">
            {getPageItems(pageIndex, pageCount).map((it, idx) => {
              if (it === "ellipsis") {
                return (
                  <span key={`e-${idx}`} className="px-2 text-neutral-900">
                    <Ellipsis className="h-4 w-4" />
                  </span>
                );
              }

              const pageNumber = it;
              const isActive = pageNumber === pageIndex + 1;

              return (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => onPageChange(pageNumber)}
                  className={[
                    "h-9 min-w-9 rounded-md px-2 text-sm font-medium",
                    isActive
                      ? "font-semibold text-neutral-900"
                      : "hover:bg-primary-100 text-neutral-500 hover:cursor-pointer",
                  ].join(" ")}>
                  {pageNumber}
                </button>
              );
            })}
          </div>

          {/* 다음 */}
          <button
            type="button"
            className="enabled:hover:bg-primary-100 rounded-full p-2 enabled:hover:cursor-pointer disabled:opacity-40"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= pageCount}>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1"></div>
      </div>
    </div>
  );
}
