"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRef, useState, ChangeEvent } from "react";
import { Textarea } from "../ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { showToast } from "@/lib";
import { PRODUCT, TOAST_TYPES } from "@/enums";
import { productSchema } from "@/utils";
import { useCreateProduct, useUpdateProduct } from "@/hooks";
import { ProductFormValues } from "@/lib/models/product";
import { useProductStore } from "@/lib/store/product-store";
import Image from "next/image";
import TextInput from "@/UI/TextInput";
import Button from "@/UI/Button";

export function ProductForm() {
  const {
    selectedProduct,
    isAddDialogOpen,
    isEditDialogOpen,
    setAddDialogOpen,
    setEditDialogOpen,
  } = useProductStore();

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { createProduct, isCreating } = useCreateProduct();
  const { updateProduct, isUpdating } = useUpdateProduct();

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema()),
    defaultValues: {
      title: selectedProduct?.title || "",
      price: selectedProduct?.price || 0,
      description: selectedProduct?.description || "",
      categoryId: selectedProduct?.category.id || 1,
      images: selectedProduct?.images || ["https://placehold.co/600x400"],
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const newPreviews: string[] = [];
      
      newFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          newPreviews.push(reader.result as string);
          if (newPreviews.length === newFiles.length) {
            setPreviews([...previews, ...newPreviews]);
            setFiles([...files, ...newFiles]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    const newFiles = [...files];
    const newPreviews = [...previews];
    
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setFiles(newFiles);
    setPreviews(newPreviews);
  };

  const uploadImages = async (files: File[]) => {
    // In a real app, you would upload files to your server here
    // For the Platzi API, we'll just return placeholder URLs
    return files.map(() => `https://placehold.co/600x400?text=Uploaded+Image`);
  };

  const onSubmit = async (data: ProductFormValues) => {
    setIsButtonLoading(true);
    try {
      if (files.length === 0 && (!selectedProduct?.images || selectedProduct.images.length === 0)) {
        showToast(TOAST_TYPES.ERROR, "At least one image is required");
        return;
      }

      // Upload new images if any were added
      let imageUrls: string[] = [];
      if (files.length > 0) {
        imageUrls = await uploadImages(files);
      } else if (selectedProduct?.images) {
        // Use existing images if no new ones were uploaded
        imageUrls = selectedProduct.images;
      }

      const payload = {
        ...data,
        images: imageUrls,
      };

      if (isAddDialogOpen) {
        await createProduct(payload);
      } else if (isEditDialogOpen && selectedProduct?.id) {
        await updateProduct({ id: selectedProduct.id, data: payload });
      }

      reset();
      setFiles([]);
      setPreviews([]);
      setAddDialogOpen(false);
      setEditDialogOpen(false);
    } catch (error) {
      console.error("Error submitting product:", error);
      showToast(TOAST_TYPES.ERROR, "Failed to submit product");
    } finally {
      setIsButtonLoading(false);
    }
  };

  const isOpen = isAddDialogOpen || isEditDialogOpen;
  const setIsOpen = isAddDialogOpen ? setAddDialogOpen : setEditDialogOpen;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isAddDialogOpen ? "Add Product" : "Edit Product"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input
              placeholder="Product title"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
            )}
          </div> */}
          <TextInput
            key={PRODUCT.TITLE}
            label={PRODUCT.TITLE}
            type="text"
            placeholder={(PRODUCT.TITLE).toLowerCase()}
            ID={PRODUCT.TITLE}
            errors={errors}
            register={register}
          />

          {/* <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <Input
              type="number"
              placeholder="0.00"
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && (
              <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>
            )}
          </div> */}
          <TextInput
            label={PRODUCT.PRICE}
            type="number"
            placeholder={(PRODUCT.PRICE).toLowerCase()}
            containerStyle="w-1/2"
            errors={errors}
            register={register}
            ID={PRODUCT.PRICE}
          />
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              placeholder="Product description"
              className="resize-none"
              {...register(PRODUCT.DESCRIPTION)}
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* <div>
            <label className="block text-sm font-medium mb-1">Category ID</label>
            <Input
              type="number"
              placeholder="1"
              {...register("categoryId", { valueAsNumber: true })}
            />
            {errors.categoryId && (
              <p className="text-sm text-red-500 mt-1">{errors.categoryId.message}</p>
            )}
          </div> */}
          <TextInput
            label={PRODUCT.CATEGORY_ID}
            type="number"
            placeholder={(PRODUCT.CATEGORY_ID).toLowerCase()}
            containerStyle="w-1/2"
            errors={errors}
            register={register}
            ID={PRODUCT.CATEGORY_ID}
          />
          <div>
            <label className="block text-sm font-medium mb-1">Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
            <Button
              text="Select Images"
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            />
            <div className="grid grid-cols-3 gap-2 mt-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative group">
                  <Image
                    src={preview}
                    alt={`Preview ${index}`}
                    width={100}
                    height={100}
                    className="w-full h-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemoveImage(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            {errors.images && (
              <p className="text-sm text-red-500 mt-1">{errors.images.message}</p>
            )}
          </div>

         

          {/* <Button 
            type="submit" 
            className="w-full"
            disabled={isButtonLoading || isCreating || isUpdating}
          >
            {isButtonLoading || isCreating || isUpdating 
              ? "Processing..." 
              : isAddDialogOpen 
                ? "Create Product" 
                : "Update Product"}
          </Button> */}
          <Button
            text={isAddDialogOpen ? "Create Product" : "Update Product"}
            variant="default" 
            type="submit" 
            loading={isButtonLoading || isCreating || isUpdating}
            disabled={isButtonLoading || isCreating || isUpdating} 
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}