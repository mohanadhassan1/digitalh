import { useRouter, useSearchParams } from "next/navigation";
import { useProductStore } from "@/lib/store/product-store";
import { useProducts } from "@/hooks";
import { IProduct } from "@/lib/models/product";

interface UseProductTableProps {
  propProducts?: IProduct[];
  propTotalCount?: number;
  pageSize?: number;
}

export function useProductTable({ 
  propProducts, 
  propTotalCount, 
  pageSize = 10 
}: UseProductTableProps = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAddDialogOpen } = useProductStore();

  // URL parameters
  const searchQuery = searchParams.get("search") || undefined;
  const page = parseInt(searchParams.get("page") || "1");
  const offset = (page - 1) * pageSize;

  // Fetch products using hook
  const {
    products: hookProducts,
    totalCount: hookTotalCount,
    isLoading,
    isFetching,
  } = useProducts({
    title: searchQuery,
    offset,
    limit: pageSize,
  });

  // Use prop data if provided, otherwise use hook data
  const products = propProducts || hookProducts;
  const totalCount = propTotalCount || hookTotalCount;

  // Handlers
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    params.delete("page"); // Reset to first page on search
    router.replace(`/products?${params.toString()}`);
  };

  const handleAddProduct = () => {
    setAddDialogOpen(true);
  };

  return {
    // Data
    products,
    totalCount,
    
    // UI state
    searchQuery,
    page,
    pageSize,
    
    // Loading states
    isLoading,
    isFetching,
    
    // Handlers
    handleSearch,
    handleAddProduct,
    
    // Computed states
    isEmpty: products.length === 0,
    isLoadingInitial: isLoading && products.length === 0,
  };
}