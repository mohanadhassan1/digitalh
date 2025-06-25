"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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
import Button from "./Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalCount?: number;
  pageSize?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  totalCount = 0,
  pageSize = 10,
  currentPage = 1,
  onPageChange,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(totalCount / pageSize),
  });

  const totalPages = Math.ceil(totalCount / pageSize);
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const handlePreviousPage = () => {
    if (hasPreviousPage && onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (hasNextPage && onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {totalCount > 0 && (
        <div className="flex items-center justify-center m-2">     
          <div className="flex items-center space-x-4">
            <Button
              text="Previous"
              variant="outline"
              type="button"
              containerStyle="px-0"
              onClick={handlePreviousPage}
              disabled={!hasPreviousPage}
              icon={
                <ChevronLeft className="h-4 w-4" />
              }
            />
            <div className="text-sm font-medium text-center w-xs">
              Page {currentPage} of {totalPages}
            </div>
            
            <Button
              text="Next"
              type="button"
              variant="outline"
              containerStyle="px-0"
              onClick={handleNextPage}
              disabled={!hasNextPage}
              icon={
                <ChevronRight className="h-4 w-4" />
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}