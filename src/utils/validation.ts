import { LOGIN, PRODUCT } from '@/enums';
import { z } from 'zod';

export const loginSchema = () => z.object({
  [LOGIN.EMAIL]: z.string().email("Invalid email").min(1, "Email is required"),
  [LOGIN.PASSWORD]: z.string().min(6, "Password must be at least 6 characters"),
});

export const productSchema = () => z.object({

  [PRODUCT.TITLE]: z.string().min(1, 'Title must be at least 2 characters.'),
  [PRODUCT.PRICE]: z.coerce.number().min(0, 'Price must be a positive number.'),
  [PRODUCT.DESCRIPTION]: z.string().min(10, 'Description must be at least 10 characters.'),
  [PRODUCT.CATEGORY_ID]: z.coerce.number().min(1, 'Category ID must be at least 1.'),
});