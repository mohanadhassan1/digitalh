import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "@/lib/api/api-client";
import { ProductCreatePayload } from "@/lib/models/product";
import { showToast } from "@/lib";
import { TOAST_TYPES } from "@/enums";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: ProductCreatePayload) => createProduct(data),
    onSuccess: (newProduct) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.setQueryData(["product", newProduct.id], newProduct);
      showToast(TOAST_TYPES.SUCCESS, "Product created successfully");
    },
    onError: (error: any) => {
      console.error("Failed to create product:", error);
      showToast(
        TOAST_TYPES.ERROR, 
        error?.response?.data?.message || "Failed to create product"
      );
    },
  });

  return {
    createProduct: mutation.mutate,
    createProductAsync: mutation.mutateAsync,
    isCreating: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
}

export type UseCreateProductReturn = ReturnType<typeof useCreateProduct>;