import { IProduct } from "../models/product";
import axiosClient from "./axios-client";

export const getProducts = async (params?: {
  title?: string;
  offset?: number;
  limit?: number;
}): Promise<IProduct[]> => {
  const response = await axiosClient.get("/products", { params });
  return response.data;
};

export const getProduct = async (id: number): Promise<IProduct> => {
  const response = await axiosClient.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (product: Omit<IProduct, "id">): Promise<IProduct> => {
  const response = await axiosClient.post("/products", product);
  return response.data;
};

export const updateProduct = async (
  id: number,
  product: Partial<IProduct>
): Promise<IProduct> => {
  const response = await axiosClient.put(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axiosClient.delete(`/products/${id}`);
};