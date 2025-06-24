"use client";

import { IProduct } from "@/lib/models/product";
import { DataTable } from "@/UI/data-table";
import { ProductTableHeader } from "./ProductTableHeader";
import { ProductTableLoading } from "./ProductTableLoading";
import { ProductTableEmptyState } from "./ProductTableEmptyState";
import { useProductTable } from "@/hooks/useProductTable";
import { productTableColumns } from "./productTableColumns";

interface ProductTableProps {
  products?: IProduct[];
  totalCount?: number;
  pageSize?: number;
}

export function ProductTable({ 
  products: propProducts, 
  totalCount: propTotalCount,
  pageSize = 10
}: ProductTableProps) {
  const {
    products,
    totalCount,
    searchQuery,
    isLoadingInitial,
    isFetching,
    isEmpty,
    handleSearch,
    handleAddProduct,
  } = useProductTable({ 
    propProducts, 
    propTotalCount, 
    pageSize 
  });

  // Show loading skeleton on initial load
  if (isLoadingInitial) {
    return <ProductTableLoading />;
  }

  return (
    <div className="space-y-4">
      <ProductTableHeader
        searchQuery={searchQuery}
        isFetching={isFetching}
        onSearch={handleSearch}
        onAddProduct={handleAddProduct}
      />
      
      <DataTable
        columns={productTableColumns}
        data={products}
        totalCount={totalCount}
        pageSize={pageSize}
      />

      {isEmpty && (
        <ProductTableEmptyState
          searchQuery={searchQuery}
          onAddProduct={handleAddProduct}
        />
      )}
    </div>
  );
}