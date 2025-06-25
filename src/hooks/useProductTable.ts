import { useRouter, useSearchParams } from "next/navigation";
import { useProductStore } from "@/lib/store/product-store";
import { useProducts } from "@/hooks";
import { IProduct } from "@/lib/models/product";

interface UseProductTableProps {
  propProducts?: IProduct[];
  propTotalCount?: number;
  pageSize?: number;
  searchQuery?: string;
  offset?: number;
  limit?: number;
}

export function useProductTable({ 
  propProducts, 
  propTotalCount, 
  pageSize = 10,
  searchQuery: initialSearchQuery,
  offset: initialOffset,
  limit: initialLimit,
}: UseProductTableProps = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAddDialogOpen } = useProductStore();

  const urlSearchQuery = searchParams.get("search") || undefined;
  const urlPage = parseInt(searchParams.get("page") || "1");

  const searchQuery = initialSearchQuery ?? urlSearchQuery;
  const page = initialOffset !== undefined ? Math.floor(initialOffset / pageSize) + 1 : urlPage;
  const offset = initialOffset ?? (page - 1) * pageSize;
  const limit = initialLimit ?? pageSize;

  const {
    products: hookProducts,
    totalCount: hookTotalCount,
    isLoading,
    isFetching,
  } = useProducts({
    title: searchQuery,
    offset,
    limit,
  });

  const products = propProducts || hookProducts;
  const totalCount = propTotalCount || hookTotalCount;

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    params.delete("page");
    router.replace(`/products?${params.toString()}`);
  };

  const handleAddProduct = () => {
    setAddDialogOpen(true);
  };

  return {
    products,
    totalCount,
    searchQuery,
    page,
    pageSize,
    isLoading,
    isFetching,
    handleSearch,
    handleAddProduct,
    isEmpty: products.length === 0,
    isLoadingInitial: isLoading && products.length === 0,
  };
}