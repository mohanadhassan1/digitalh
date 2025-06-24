import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "@/lib/api/api-client";
import { ProductUpdatePayload } from "@/lib/models/product";
import { showToast } from "@/lib";
import { TOAST_TYPES } from "@/enums";

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductUpdatePayload }) =>
      updateProduct(id, data),
    onSuccess: (updatedProduct) => {
      queryClient.setQueryData(["product", updatedProduct.id], updatedProduct);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showToast(TOAST_TYPES.SUCCESS, "Product updated successfully");
    },
    onError: (error: any) => {
      console.error("Failed to update product:", error);
      showToast(
        TOAST_TYPES.ERROR, 
        error?.response?.data?.message || "Failed to update product"
      );
    },
  });

  return {
    updateProduct: mutation.mutate,
    updateProductAsync: mutation.mutateAsync,
    isUpdating: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
}

export type UseUpdateProductReturn = ReturnType<typeof useUpdateProduct>;