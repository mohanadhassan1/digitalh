"use client";

import { useProductStore } from "@/lib/store/product-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";
import Image from "next/image";

export function ViewDialog() {
  const { selectedProduct, isViewDialogOpen, setViewDialogOpen } =
    useProductStore();

  if (!selectedProduct) return null;

  return (
    <Dialog open={isViewDialogOpen} onOpenChange={setViewDialogOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h2 className="text-xl font-bold">{selectedProduct.title}</h2>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-semibold">
                ${selectedProduct.price}
              </span>
              <Badge variant="outline">{selectedProduct.category.name}</Badge>
            </div>
            <p className="text-gray-600">{selectedProduct.description}</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Images</h3>
            <div className="grid grid-cols-2 gap-2">
              {selectedProduct.images.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={image}
                    alt={`Product image ${index + 1}`}
                    fill
                    className="rounded-md object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}