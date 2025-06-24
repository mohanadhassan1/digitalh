"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { IProduct, ProductFormValues } from "@/lib/models/product";
import { useProductStore } from "@/lib/store/product-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, updateProduct } from "@/lib/api/api-client";
import { useRouter, useSearchParams } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { showToast } from "@/lib";
import { TOAST_TYPES } from "@/enums";
import { productSchema } from "@/utils";

export function ProductForm() {
  const {
    selectedProduct,
    isAddDialogOpen,
    isEditDialogOpen,
    setAddDialogOpen,
    setEditDialogOpen,
  } = useProductStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema()),
    defaultValues: {
      title: selectedProduct?.title || "",
      price: selectedProduct?.price || 0,
      description: selectedProduct?.description || "",
      categoryId: selectedProduct?.category.id || 1,
    },
  });

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showToast(TOAST_TYPES.SUCCESS, "Product created successfully")
      setAddDialogOpen(false);
      form.reset();
    },
    onError: (error) => {
      showToast(TOAST_TYPES.ERROR, "Failed to create product")
      console.error(error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<IProduct>) =>
      updateProduct(selectedProduct?.id || 0, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showToast(TOAST_TYPES.SUCCESS, "Product updated successfully")
      setEditDialogOpen(false);
    },
    onError: (error) => {
      showToast(TOAST_TYPES.ERROR, "Failed to update product")
      console.error(error);
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    if (isAddDialogOpen) {
      createMutation.mutate(data);
    } else if (isEditDialogOpen) {
      updateMutation.mutate(data);
    }
  };

  const isOpen = isAddDialogOpen || isEditDialogOpen;
  const setIsOpen = isAddDialogOpen ? setAddDialogOpen : setEditDialogOpen;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isAddDialogOpen ? "Add Product" : "Edit Product"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Product title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Product description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category ID</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {isAddDialogOpen ? "Create Product" : "Update Product"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}