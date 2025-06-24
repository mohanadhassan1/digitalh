"use client";

import { useProductStore } from "@/lib/store/product-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { deleteProduct } from "@/lib/api/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TOAST_TYPES } from "@/enums";
import { showToast } from "@/lib";

export function DeleteDialog() {
  const {
    selectedProduct,
    isDeleteDialogOpen,
    setDeleteDialogOpen,
    setSelectedProduct,
  } = useProductStore();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteProduct(selectedProduct?.id || 0),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showToast(TOAST_TYPES.SUCCESS, "Product deleted successfully")
      setDeleteDialogOpen(false);
      setSelectedProduct(null);
    },
    onError: (error) => {
      showToast(TOAST_TYPES.ERROR, "Failed to delete product")
      console.error(error);
    },
  });

  if (!selectedProduct) return null;

  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            Are you sure you want to delete <strong>{selectedProduct.title}</strong>?
            This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteMutation.mutate()}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}