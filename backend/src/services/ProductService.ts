import type { Decimal } from "../generated/prisma/internal/prismaNamespace.js";
import { Product } from "../domain/entities/Product.js";
import type {
  PaginatedProducts,
  ProductFilters,
  ProductRepository,
} from "../domain/repositories/ProductRepository.js";
import type { CategoryRepository } from "../domain/repositories/CategoryRepository.js";

export interface CreateProductInput {
  name: string;
  slug: string;
  description?: string;
  price: Decimal;
  imageUrl?: string;
  buyUrl?: string;
  featured?: boolean;
  active?: boolean;
  categoryId: number;
}

export interface UpdateProductInput {
  name?: string;
  slug?: string;
  description?: string;
  price?: Decimal;
  imageUrl?: string;
  buyUrl?: string;
  featured?: boolean;
  active?: boolean;
  categoryId?: number;
}

export interface ProductListInput
  extends ProductFilters {}

export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async create(
    input: CreateProductInput,
  ): Promise<Product> {
    const name = input.name.trim();
    const slug = input.slug.trim().toLowerCase();

    if (!name) {
      throw new Error("Product name is required");
    }

    if (!slug) {
      throw new Error("Product slug is required");
    }

    const categoryExists =
      await this.categoryRepository.existsById(
        input.categoryId,
      );

    if (!categoryExists) {
      throw new Error("Category not found");
    }

    const slugExists =
      await this.productRepository.existsBySlug(slug);

    if (slugExists) {
      throw new Error(
        "A product with this slug already exists",
      );
    }

    const product = new Product({
      name,
      slug,
      description: this.normalizeOptionalString(
        input.description,
      ),
      price: input.price,
      imageUrl: this.normalizeOptionalString(
        input.imageUrl,
      ),
      buyUrl: this.normalizeOptionalString(
        input.buyUrl,
      ),
      featured: input.featured ?? false,
      active: input.active ?? true,
      categoryId: input.categoryId,
    });

    return this.productRepository.create(product);
  }

  async findById(id: number): Promise<Product> {
    const product =
      await this.productRepository.findById(id);

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }

  async findBySlug(slug: string): Promise<Product> {
    const normalizedSlug = slug.trim().toLowerCase();

    if (!normalizedSlug) {
      throw new Error("Product slug is required");
    }

    const product =
      await this.productRepository.findBySlug(
        normalizedSlug,
      );

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }

  async findMany(
    filters?: ProductListInput,
  ): Promise<PaginatedProducts> {
    return this.productRepository.findMany({
      ...filters,
      search: filters?.search?.trim(),
    });
  }

  async update(
    id: number,
    input: UpdateProductInput,
  ): Promise<Product> {
    const product = await this.findById(id);

    const name =
      input.name !== undefined
        ? input.name.trim()
        : product.getName();

    const slug =
      input.slug !== undefined
        ? input.slug.trim().toLowerCase()
        : product.getSlug();

    const description =
      input.description !== undefined
        ? this.normalizeOptionalString(
            input.description,
          )
        : product.getDescription();

    const imageUrl =
      input.imageUrl !== undefined
        ? this.normalizeOptionalString(
            input.imageUrl,
          )
        : product.getImageUrl();

    const buyUrl =
      input.buyUrl !== undefined
        ? this.normalizeOptionalString(
            input.buyUrl,
          )
        : product.getBuyUrl();

    const price =
      input.price !== undefined
        ? input.price
        : product.getPrice();

    const categoryId =
      input.categoryId !== undefined
        ? input.categoryId
        : product.getCategoryId();

    if (!name) {
      throw new Error(
        "Product name cannot be empty",
      );
    }

    if (!slug) {
      throw new Error(
        "Product slug cannot be empty",
      );
    }

    if (input.categoryId !== undefined) {
      const categoryExists =
        await this.categoryRepository.existsById(
          input.categoryId,
        );

      if (!categoryExists) {
        throw new Error("Category not found");
      }
    }

    if (input.slug !== undefined) {
      const slugExists =
        await this.productRepository.existsBySlug(
          slug,
          id,
        );

      if (slugExists) {
        throw new Error(
          "A product with this slug already exists",
        );
      }
    }

    product.update(
      name,
      slug,
      description,
      price,
      imageUrl,
      buyUrl,
      categoryId,
    );

    if (input.featured !== undefined) {
      product.setFeatured(input.featured);
    }

    if (input.active !== undefined) {
      product.setActive(input.active);
    }

    return this.productRepository.update(product);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);

    await this.productRepository.delete(id);
  }

  async activate(id: number): Promise<Product> {
    const product = await this.findById(id);

    if (product.getActive()) {
      return product;
    }

    product.setActive(true);

    return this.productRepository.update(product);
  }

  async deactivate(id: number): Promise<Product> {
    const product = await this.findById(id);

    if (!product.getActive()) {
      return product;
    }

    product.setActive(false);

    return this.productRepository.update(product);
  }

  async feature(id: number): Promise<Product> {
    const product = await this.findById(id);

    if (product.getFeatured()) {
      return product;
    }

    product.setFeatured(true);

    return this.productRepository.update(product);
  }

  async unfeature(id: number): Promise<Product> {
    const product = await this.findById(id);

    if (!product.getFeatured()) {
      return product;
    }

    product.setFeatured(false);

    return this.productRepository.update(product);
  }

  async findFeatured(
    page = 1,
    limit = 20,
  ): Promise<PaginatedProducts> {
    return this.productRepository.findMany({
      featured: true,
      active: true,
      page,
      limit,
    });
  }

  async findActive(
    page = 1,
    limit = 20,
  ): Promise<PaginatedProducts> {
    return this.productRepository.findMany({
      active: true,
      page,
      limit,
    });
  }

  private normalizeOptionalString(
    value: string | undefined,
  ): string | undefined {
    if (value === undefined) {
      return undefined;
    }

    const normalized = value.trim();

    return normalized || undefined;
  }
}