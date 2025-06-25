import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "@/lib/api/api-client";
import { showToast } from "@/lib";
import { TOAST_TYPES } from "@/enums";
import { IProduct } from "@/lib/models";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['products'] });
      const previousProducts = queryClient.getQueryData<IProduct[]>(['products']);
      
      queryClient.setQueryData<IProduct[]>(['products'], (old) => 
        old?.filter(product => product.id !== id) || []
      );
      
      return { previousProducts };
    },
    onError: (error, id, context) => {
      console.error('Delete failed:', error);
      queryClient.setQueryData(['products'], context?.previousProducts);
      showToast(TOAST_TYPES.ERROR, 'Failed to delete product');
    },
    onSuccess: () => {
      showToast(TOAST_TYPES.SUCCESS, 'Product deleted successfully');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });
}

export type UseDeleteProductReturn = ReturnType<typeof useDeleteProduct>;