export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
    creationAt?: string;
    updatedAt?: string;
  };
  images: string[];
  creationAt?: string;
  updatedAt?: string;
}

export interface ProductFormValues {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export type ProductCreatePayload = Omit<ProductFormValues, "id">;
export type ProductUpdatePayload = Partial<ProductCreatePayload>;

export interface ProductQueryParams {
  title?: string;
  price_min?: number;
  price_max?: number;
  categoryId?: number;
  offset?: number;
  limit?: number;
}