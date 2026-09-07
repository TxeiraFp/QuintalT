import { Category } from "../domain/entities/Category.js";
import type {
  CategoryFilters,
  CategoryRepository,
} from "../domain/repositories/CategoryRepository.js";

export interface CreateCategoryInput {
  name: string;
  slug: string;
}

export interface UpdateCategoryInput {
  name?: string;
  slug?: string;
}

export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async create(
    input: CreateCategoryInput,
  ): Promise<Category> {
    const name = input.name.trim();
    const slug = input.slug.trim().toLowerCase();

    if (!name) {
      throw new Error("Category name is required");
    }

    if (!slug) {
      throw new Error("Category slug is required");
    }

    const slugExists =
      await this.categoryRepository.existsBySlug(slug);

    if (slugExists) {
      throw new Error(
        "A category with this slug already exists",
      );
    }

    const category = new Category({
      name,
      slug,
    });

    return this.categoryRepository.create(category);
  }

  async findById(id: number): Promise<Category> {
    const category =
      await this.categoryRepository.findById(id);

    if (!category) {
      throw new Error("Category not found");
    }

    return category;
  }

  async findBySlug(slug: string): Promise<Category> {
    const normalizedSlug = slug.trim().toLowerCase();

    if (!normalizedSlug) {
      throw new Error("Category slug is required");
    }

    const category =
      await this.categoryRepository.findBySlug(
        normalizedSlug,
      );

    if (!category) {
      throw new Error("Category not found");
    }

    return category;
  }

  async findMany(
    filters?: CategoryFilters,
  ): Promise<Category[]> {
    return this.categoryRepository.findMany({
      search: filters?.search?.trim(),
    });
  }

  async update(
    id: number,
    input: UpdateCategoryInput,
  ): Promise<Category> {
    const category = await this.findById(id);

    const name =
      input.name !== undefined
        ? input.name.trim()
        : undefined;

    const slug =
      input.slug !== undefined
        ? input.slug.trim().toLowerCase()
        : undefined;

    if (name !== undefined && !name) {
      throw new Error(
        "Category name cannot be empty",
      );
    }

    if (slug !== undefined && !slug) {
      throw new Error(
        "Category slug cannot be empty",
      );
    }

    if (slug !== undefined) {
      const slugExists =
        await this.categoryRepository.existsBySlug(
          slug,
          id,
        );

      if (slugExists) {
        throw new Error(
          "A category with this slug already exists",
        );
      }
    }

    category.update({
      name,
      slug,
    });

    return this.categoryRepository.update(category);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);

    await this.categoryRepository.delete(id);
  }
}
