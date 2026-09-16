import type { Category } from "./category";

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  buyUrl: string | null;
  featured: boolean;
  active: boolean;
  categoryId: number;
  category?: Category;
  createdAt?: string;
  updatedAt?: string;
}