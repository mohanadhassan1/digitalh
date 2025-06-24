import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "@/lib/api/api-client";
import { IProduct } from "@/lib/models/product";
import { showToast } from "@/lib";
import { TOAST_TYPES } from "@/enums";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onMutate: async (deletedId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["products"] });
      
      // Snapshot the previous value for all products queries
      const previousProductsQueries = queryClient.getQueriesData({ 
        queryKey: ["products"] 
      });
      
      // Optimistically remove the product from all products queries
      queryClient.setQueriesData(
        { queryKey: ["products"] },
        (old: IProduct[] | undefined) =>
          old?.filter((product) => product.id !== deletedId) || []
      );
      
      return { previousProductsQueries };
    },
    onError: (error: any, deletedId, context) => {
      // Rollback on error
      if (context?.previousProductsQueries) {
        context.previousProductsQueries.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      console.error("Failed to delete product:", error);
      showToast(
        TOAST_TYPES.ERROR, 
        error?.response?.data?.message || "Failed to delete product"
      );
    },
    onSuccess: (_, deletedId) => {
      // Remove from individual product cache
      queryClient.removeQueries({ queryKey: ["product", deletedId] });
      showToast(TOAST_TYPES.SUCCESS, "Product deleted successfully");
    },
    onSettled: () => {
      // Always refetch after error or success to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    deleteProduct: mutation.mutate,
    deleteProductAsync: mutation.mutateAsync,
    isDeleting: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
}

export type UseDeleteProductReturn = ReturnType<typeof useDeleteProduct>;