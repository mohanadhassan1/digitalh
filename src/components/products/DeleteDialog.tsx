"use client";

import { useProductStore } from "@/lib/store/product-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { useDeleteProduct } from "@/hooks";

export function DeleteDialog() {
  const { selectedProduct, isDeleteDialogOpen, setDeleteDialogOpen, setSelectedProduct } = useProductStore();
  const deleteMutation = useDeleteProduct();

  const handleDelete = async () => {
    if (selectedProduct?.id) {
      try {
        await deleteMutation.mutateAsync(selectedProduct.id);
        setDeleteDialogOpen(false);
        setSelectedProduct(null);
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  if (!selectedProduct) return null;

  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            Are you sure you want to delete <strong>{selectedProduct?.title}</strong>?
            This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleteMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
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