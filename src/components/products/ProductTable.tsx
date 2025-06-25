"use client";

import { DataTable } from "@/UI/data-table";
import { ProductTableHeader } from "./ProductTableHeader";
import { ProductTableLoading } from "./ProductTableLoading";
import { ProductTableEmptyState } from "./ProductTableEmptyState";
import { useProductTable } from "@/hooks/useProductTable";
import { productTableColumns } from "./productTableColumns";
import { useRouter, useSearchParams } from "next/navigation";

export function ProductTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || undefined;
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = 10;
    
  const { products, totalCount, isLoading, isFetching, handleSearch, handleAddProduct } = useProductTable({ 
    searchQuery,
    offset: (page - 1) * pageSize,
    limit: pageSize,
  });

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    if (newPage > 1) {
      params.set('page', newPage.toString());
    } else {
      params.delete('page');
    }
    router.push(`/products?${params.toString()}`);
  };

  if (isLoading) {
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
        currentPage={page}
        onPageChange={handlePageChange}
      />

      {products.length === 0 && !isLoading && (
        <ProductTableEmptyState searchQuery={searchQuery} onAddProduct={handleAddProduct} />
      )}
    </div>
  );
}