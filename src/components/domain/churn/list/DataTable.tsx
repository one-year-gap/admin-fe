"use client";

import type { RowSelectionState } from "@tanstack/react-table";
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

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

  page: number;
  size: number;
  totalPage: number;
  onPageChange: (next: number) => void;

  rowSelection: RowSelectionState;
  onRowSelectionChange: (next: RowSelectionState) => void;

  onRowClick?: (row: TData) => void;
};

type PageItem = number | "ellipsis";

function getPageItems(pageIndex: number, pageCount: number): PageItem[] {
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
  rowSelection,
  onRowSelectionChange,
  onRowClick,
}: DataTableProps<TData>) {
  const pageIndex = Math.max(0, page - 1);

  const table = useReactTable({
    data,
    columns,

    state: {
      rowSelection,
      pagination: {
        pageIndex,
        pageSize: size,
      },
    },

    manualPagination: true,
    pageCount: totalPage,

    onRowSelectionChange: (updater) => {
      const next = typeof updater === "function" ? updater(rowSelection) : updater;

      onRowSelectionChange(next);
    },

    enableRowSelection: true,

    getCoreRowModel: getCoreRowModel(),
  });

  const rows = table.getRowModel().rows;

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="py-10 text-center">
                결과가 없습니다
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow
                key={row.id}
                className="cursor-pointer"
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.closest("input,button,a")) return;
                  onRowClick?.(row.original);
                }}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* pagination */}
      <div className="flex items-center justify-center gap-4 py-4">
        <button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          <ChevronLeft />
        </button>

        {getPageItems(pageIndex, totalPage).map((it, i) =>
          it === "ellipsis" ? (
            <Ellipsis key={i} />
          ) : (
            <button key={it} onClick={() => onPageChange(it)}>
              {it}
            </button>
          ),
        )}

        <button disabled={page >= totalPage} onClick={() => onPageChange(page + 1)}>
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
