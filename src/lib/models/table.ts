import { ColumnDef } from "@tanstack/react-table";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalCount: number;
  pageSize: number;
  pageIndex?: number;
  onPaginationChange?: (page: number) => void;
}

export interface TablePagination {
  pageIndex: number;
  pageSize: number;
}

export interface TableFilter {
  id: string;
  value: unknown;
}

export interface TableState {
  pagination: TablePagination;
  filters: TableFilter[];
  sorting: TableSorting[];
}

export interface TableSorting {
  id: string;
  desc: boolean;
}