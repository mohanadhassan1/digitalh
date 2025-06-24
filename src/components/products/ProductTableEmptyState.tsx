"use client";

import { Button } from "../ui/button";

interface ProductTableEmptyStateProps {
  searchQuery?: string;
  onAddProduct: () => void;
}

export function ProductTableEmptyState({ 
  searchQuery, 
  onAddProduct 
}: ProductTableEmptyStateProps) {
  const isSearchResult = !!searchQuery;
  
  return (
    <div className="text-center py-12">
      <div className="text-gray-500 text-lg mb-2">No products found</div>
      <div className="text-gray-400 text-sm mb-4">
        {isSearchResult 
          ? `No products match your search for "${searchQuery}"`
          : "Get started by adding your first product"
        }
      </div>
      {!isSearchResult && (
        <Button onClick={onAddProduct}>
          Add Your First Product
        </Button>
      )}
    </div>
  );
}