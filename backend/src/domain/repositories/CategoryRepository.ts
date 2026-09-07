import { Category } from "../entities/Category.js";

export interface CategoryFilters {
  search?: string;
}

export interface CategoryRepository {
  // CREATE
  create(category: Category): Promise<Category>;

  // READ
  findById(id: number): Promise<Category | null>;
  findBySlug(slug: string): Promise<Category | null>;
  findMany(filters?: CategoryFilters): Promise<Category[]>;

  // UPDATE
  update(category: Category): Promise<Category>;

  // DELETE
  delete(id: number): Promise<void>;

  // VALIDATION
  existsById(id: number): Promise<boolean>;
  existsBySlug(
    slug: string,
    excludeId?: number,
  ): Promise<boolean>;
}
