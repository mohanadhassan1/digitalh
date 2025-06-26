"use client";

import Button from "@/UI/Button";
import { ProductSearchBar } from "./ProductSearchBar";

interface ProductTableHeaderProps {
  searchQuery?: string;
  isFetching?: boolean;
  onSearch: (term: string) => void;
  onAddProduct: () => void;
}

export function ProductTableHeader({ 
  searchQuery, 
  isFetching, 
  onSearch, 
  onAddProduct 
}: ProductTableHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <ProductSearchBar
        searchQuery={searchQuery}
        isFetching={isFetching}
        onSearch={onSearch}
      />
      <Button 
        text="Add Product"
        type="button"
        variant="default"
        onClick={onAddProduct}
        containerStyle="w-fit"
      />
    </div>
  );
}