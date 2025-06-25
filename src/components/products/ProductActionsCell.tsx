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

interface ProductActionsCellProps {
  product: IProduct;
}

export function ProductActionsCell({ product }: ProductActionsCellProps) {
  const { setSelectedProduct, setViewDialogOpen, setEditDialogOpen } = useProductStore();
  const deleteMutation = useDeleteProduct();
  
  const handleDelete = async () => {
    if (!confirm(`Delete "${product.title}"?`)) return;
    await deleteMutation.mutateAsync(product.id);
  };

  const handleView = () => {
    setSelectedProduct(product);
    setViewDialogOpen(true);
  };

  const handleEdit = () => {
    setSelectedProduct(product);
    setEditDialogOpen(true);
  };

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
          disabled={deleteMutation.isPending}
          className="text-red-600 focus:text-red-600"
        >
          {deleteMutation.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="mr-2 h-4 w-4" />
          )}
          {deleteMutation.isPending ? "Deleting..." : "Delete"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}