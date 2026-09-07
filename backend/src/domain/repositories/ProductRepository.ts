import { Product } from "../entities/Product.js";

export interface ProductFilters {
  search?: string;
  categoryId?: number;
  featured?: boolean;
  active?: boolean;
  page?: number;
  limit?: number;
}

export interface PaginatedProducts {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductRepository {
  // CREATE
  create(product: Product): Promise<Product>;

  // READ
  findById(id: number): Promise<Product | null>;
  findBySlug(slug: string): Promise<Product | null>;
  findMany(filters?: ProductFilters): Promise<PaginatedProducts>;

  // UPDATE
  update(product: Product): Promise<Product>;

  // DELETE
  delete(id: number): Promise<void>;

  // VALIDATION
  existsById(id: number): Promise<boolean>;
  existsBySlug(
    slug: string,
    excludeId?: number,
  ): Promise<boolean>;
}
