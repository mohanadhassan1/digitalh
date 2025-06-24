import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProduct, getProducts } from "@/lib/api/api-client";
import { IProduct, ProductQueryParams } from "@/lib/models/product";

export function useProducts(params?: ProductQueryParams) {
  const queryClient = useQueryClient();
  
  // Query key factory for consistent caching
  const getQueryKey = (queryParams?: ProductQueryParams) => 
    ["products", queryParams || {}];

  /**
   * Fetch products with optional filtering and pagination
   */
  const {
    data: products = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching
  } = useQuery({
    queryKey: getQueryKey(params),
    queryFn: () => getProducts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });

  /**
   * Prefetch product for optimistic navigation
   */
  const prefetchProduct = (id: number) => {
    queryClient.prefetchQuery({
      queryKey: ["product", id],
      queryFn: () => getProduct(id),
      staleTime: 5 * 60 * 1000,
    });
  };

  /**
   * Invalidate all product queries
   */
  const invalidateProducts = () => {
    queryClient.invalidateQueries({ queryKey: ["products"] });
  };

  /**
   * Get cached product data without triggering a request
   */
  const getCachedProduct = (id: number): IProduct | undefined => {
    return queryClient.getQueryData(["product", id]);
  };

  return {
    // Data
    products,
    totalCount: products.length, // Note: API doesn't return total count
    
    // Loading states
    isLoading,
    isFetching,
    isError,
    error,
    
    // Utility functions
    refetch,
    prefetchProduct,
    invalidateProducts,
    getCachedProduct,
  };
}

export type UseProductsParams = ProductQueryParams;
export type UseProductsReturn = ReturnType<typeof useProducts>;