import { create } from "zustand";
import { IProduct } from "@/lib/models/product";

interface ProductStore {
  selectedProduct: IProduct | null;
  isAddDialogOpen: boolean;
  isEditDialogOpen: boolean;
  isViewDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  setSelectedProduct: (product: IProduct | null) => void;
  setAddDialogOpen: (open: boolean) => void;
  setEditDialogOpen: (open: boolean) => void;
  setViewDialogOpen: (open: boolean) => void;
  setDeleteDialogOpen: (open: boolean) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  selectedProduct: null,
  isAddDialogOpen: false,
  isEditDialogOpen: false,
  isViewDialogOpen: false,
  isDeleteDialogOpen: false,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  setAddDialogOpen: (open) => set({ isAddDialogOpen: open }),
  setEditDialogOpen: (open) => set({ isEditDialogOpen: open }),
  setViewDialogOpen: (open) => set({ isViewDialogOpen: open }),
  setDeleteDialogOpen: (open) => set({ isDeleteDialogOpen: open }),
}));