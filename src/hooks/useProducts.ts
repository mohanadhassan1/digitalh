import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api/api-client";
import { IProduct, ProductQueryParams } from "@/lib/models/product";

interface ProductsResponse {
  data: IProduct[];
  total: number;
}

export function useProducts(params?: ProductQueryParams) {
  const {
    data = { data: [], total: 0 },
    isLoading,
    isFetching,
    error,
  } = useQuery<ProductsResponse>({
    queryKey: ['products', params],
    queryFn: () => getProducts({
      ...params,
      // sortBy: 'creationAt',
      // sortOrder: 'desc'
    }),
  });

  return {
    products: data.data,
    totalCount: data.total,
    isLoading,
    isFetching,
    error
  };
}

export type UseProductsParams = ProductQueryParams;
export type UseProductsReturn = ReturnType<typeof useProducts>;