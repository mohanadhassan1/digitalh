import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/lib/api/api-client";

export function useProduct(id: number) {
  const {
    data: product,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    product,
    isLoading,
    isError,
    error,
    refetch,
  };
}

export type UseProductReturn = ReturnType<typeof useProduct>;