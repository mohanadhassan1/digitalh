"use client";

import { IProduct } from "@/lib/models/product";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal, Trash2, Edit, Eye, Loader2 } from "lucide-react";
import { useProductStore } from "@/lib/store/product-store";
import { useDeleteProduct } from "@/hooks";
import { useState } from "react";

interface ProductActionsCellProps {
  product: IProduct;
}

export function ProductActionsCell({ product }: ProductActionsCellProps) {
  const { setSelectedProduct, setViewDialogOpen, setEditDialogOpen } = useProductStore();
  const { deleteProduct, isDeleting } = useDeleteProduct();
  const [isDeletingThis, setIsDeletingThis] = useState(false);
  
  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${product.title}"?`)) {
      return;
    }

    setIsDeletingThis(true);
    try {
      deleteProduct(product.id);
    } catch (error) {
      console.error("Failed to delete product:", error);
    } finally {
      setIsDeletingThis(false);
    }
  };

  const handleView = () => {
    setSelectedProduct(product);
    setViewDialogOpen(true);
  };

  const handleEdit = () => {
    setSelectedProduct(product);
    setEditDialogOpen(true);
  };

  const isLoading = isDeletingThis || isDeleting;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleView}>
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleDelete}
          disabled={isLoading}
          className="text-red-600 focus:text-red-600"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="mr-2 h-4 w-4" />
          )}
          {isLoading ? "Deleting..." : "Delete"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}