import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api/api-client";
import { ICategory } from "@/lib/models/product";

export function useCategories() {
  return useQuery<ICategory[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000,
  });
}