import { ICategory, IProduct, ProductCreatePayload } from "../models/product";
import axiosClient from "./axios-client";

export const getProducts = async (params?: {
  title?: string;
  offset?: number;
  limit?: number;
}): Promise<{ data: IProduct[]; total: number }> => {
  try {
    const totalResponse = await axiosClient.get("/products");
    const allProducts = totalResponse.data;

    let filteredProducts = allProducts;
    if (params?.title) {
      filteredProducts = allProducts.filter((product: IProduct) =>
        product.title.toLowerCase().includes(params.title!.toLowerCase())
      );
    }

    filteredProducts.sort((a: IProduct, b: IProduct) => {
      const dateA = a.creationAt ? new Date(a.creationAt).getTime() : 0;
      const dateB = b.creationAt ? new Date(b.creationAt).getTime() : 0;
      return dateB - dateA;
    });

    const offset = params?.offset || 0;
    const limit = params?.limit || 10;
    const paginatedData = filteredProducts.slice(offset, offset + limit);

    return {
      data: paginatedData,
      total: filteredProducts.length
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductsPaginated = async (params?: {
  title?: string;
  offset?: number;
  limit?: number;
}): Promise<{ data: IProduct[]; total: number }> => {
  try {
    if (params?.title) {
      return getProducts(params);
    }

    const response = await axiosClient.get("/products", { 
      params: {
        offset: params?.offset || 0,
        limit: params?.limit || 10,
      }
    });

    const currentPage = Math.floor((params?.offset || 0) / (params?.limit || 10)) + 1;
    const hasMoreData = response.data.length === (params?.limit || 10);
    
    const estimatedTotal = hasMoreData 
      ? (currentPage * (params?.limit || 10)) + 1
      : (params?.offset || 0) + response.data.length;

    return {
      data: response.data,
      total: estimatedTotal
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProduct = async (id: number): Promise<IProduct> => {
  const response = await axiosClient.get(`/products/${id}`);
  return response.data;
};

export const getCategories = async (): Promise<ICategory[]> => {
  const response = await axiosClient.get("/categories");
  return response.data;
};

export const createProduct = async (product: ProductCreatePayload): Promise<IProduct> => {
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
    ...product,
    images: product.images.length > 0 ? product.images : ["https://placehold.co/600x400"],
    creationAt: utcDate,
    updatedAt: utcDate
  };
  const response = await axiosClient.post("/products", payload);
  return response.data;
};

export const updateProduct = async (id: number, product: Partial<IProduct>): Promise<IProduct> => {
  const currentProduct = await getProduct(id);
  const payload = {
    ...currentProduct,
    ...product,
    categoryId: product.category?.id || currentProduct.category.id,
    images: product.images || currentProduct.images
  };
  const response = await axiosClient.put(`/products/${id}`, payload);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<boolean> => {
  try {
    const response = await axiosClient.delete(`/products/${id}`);
    return response.data === true;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};