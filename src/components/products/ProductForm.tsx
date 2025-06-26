"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { showToast } from "@/lib";
import { PRODUCT, TOAST_TYPES } from "@/enums";
import { productSchema } from "@/utils";
import { useCreateProduct, useUpdateProduct, useCategories } from "@/hooks";
import { ICategory, ProductFormValues } from "@/lib/models/product";
import { useProductStore } from "@/lib/store/product-store";
import SelectInput from "@/UI/SelectInput";
import TextInput from "@/UI/TextInput";
import Button from "@/UI/Button";
import { IMAGES } from "@/constants/images";
import Loading from "@/UI/Loading";

export function ProductForm() {
  const { selectedProduct, isAddDialogOpen, isEditDialogOpen, setAddDialogOpen, setEditDialogOpen } = useProductStore();

  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const { createProduct, isCreating } = useCreateProduct();
  const { updateProduct, isUpdating } = useUpdateProduct();
  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();

  const { register, handleSubmit, formState: { errors }, reset, watch, setValue, getValues } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema()),
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      categoryId: selectedProduct?.category?.id || (categories[0]?.id || 1),
      images: selectedProduct?.images || ["https://placehold.co/600x400"],
    },
  });

  const images = watch('images');

  useEffect(() => {
    if (selectedProduct) {
      setValue(PRODUCT.TITLE, selectedProduct[PRODUCT.TITLE]);
      setValue(PRODUCT.PRICE, selectedProduct[PRODUCT.PRICE]);
      setValue(PRODUCT.DESCRIPTION, selectedProduct[PRODUCT.DESCRIPTION]);
      setValue(PRODUCT.CATEGORY_ID, selectedProduct.category.id);
      setValue(PRODUCT.IMAGES, selectedProduct[PRODUCT.IMAGES]);
    } else {
      reset({
        title: "",
        price: 0,
        description: "",
        categoryId: categories[0]?.id || 1,
        images: ["https://placehold.co/600x400"],
      });
    }
  }, [selectedProduct, setValue, reset, categories]);

  const addImageUrl = () => {
    setValue('images', [...images, "https://placehold.co/600x400"]);
  };

  const removeImageUrl = (index: number) => {
    if (images.length <= 1) {
      showToast(TOAST_TYPES.ERROR, "At least one image is required");
      return;
    }
    setValue('images', images.filter((_, i) => i !== index));
  };

  const updateImageUrl = (index: number, url: string) => {
    const updatedImages = [...images];
    updatedImages[index] = url;
    setValue('images', updatedImages);
  };

  const onSubmit = async (data: ProductFormValues) => {
    setIsButtonLoading(true);
    try {
      const now = new Date();
      const utcDate = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds()
      )).toISOString();

      const payload = { 
        ...data, 
        images: data.images.length > 0 ? data.images : ["https://placehold.co/600x400"],
        creationAt: isAddDialogOpen ? utcDate : selectedProduct?.creationAt || utcDate,
        updatedAt: utcDate 
      };

      if (isAddDialogOpen) {
        await createProduct(payload);
      } else if (isEditDialogOpen && selectedProduct?.id) {
        await updateProduct({ id: selectedProduct.id, data: payload });
      }

      reset();
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
          <TextInput
            label={PRODUCT.TITLE}
            type="text"
            placeholder={(PRODUCT.TITLE).toLowerCase()}
            ID={PRODUCT.TITLE}
            errors={errors}
            register={register}
          />
          <TextInput
            label={PRODUCT.PRICE}
            type="number"
            placeholder={(PRODUCT.PRICE).toLowerCase()}
            errors={errors}
            register={register}
            ID={PRODUCT.PRICE}
          />
          <TextInput
            label={PRODUCT.DESCRIPTION}
            type="text-area"
            placeholder={(PRODUCT.DESCRIPTION).toLowerCase()}
            errors={errors}
            register={register}
            ID={PRODUCT.DESCRIPTION}
          />

          {isLoadingCategories ? (
            <Loading />
          ) : (
            <SelectInput
              label="Category"
              firstOption="Select a category"
              options={
                categories?.map((category: ICategory) => ({
                  value: category.id.toString(),
                  label: category.name,
                })) || []
              }
              ID={PRODUCT.CATEGORY_ID}
              register={register}
              errors={errors}
              isSelectedBasedOnLabel={true}
              optionValue="value"
              optionLabel="label"
              selectedLabel={categories.find(c => c.id === getValues(PRODUCT.CATEGORY_ID))?.name || ''}
              onChange={(val) => setValue(PRODUCT.CATEGORY_ID, Number(val))}
            />
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Images</label>
            <div className="space-y-2">
              {images.map((url, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <TextInput
                    type="text"
                    value={url}
                    onChange={(e) => updateImageUrl(index, e.target.value)}
                    placeholder="Image URL"
                    containerStyle="w-full"
                    labelStyle='hidden'
                  />
                  <Button
                    textStyle="hidden"
                    type="button"
                    variant="outline"
                    containerStyle="w-fit"
                    icon={<IMAGES.ICONS.x />}
                    onClick={() => removeImageUrl(index)}
                    disabled={images.length <= 1}
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="default"
                onClick={addImageUrl}
                containerStyle="w-fit"
                textStyle="hidden"
                icon={<IMAGES.ICONS.plus />}
              />
            </div>
            {errors.images && (
              <p className="text-sm text-red-500 mt-1">{errors.images.message}</p>
            )}
          </div> 

          <Button
            text={isAddDialogOpen ? "Create Product" : "Update Product"}
            variant="default" 
            type="submit" 
            loading={isButtonLoading || isCreating || isUpdating}
            disabled={isButtonLoading || isCreating || isUpdating || isLoadingCategories} 
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}