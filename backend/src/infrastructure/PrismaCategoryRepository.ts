import { Category } from "../domain/entities/Category.js";
import type {
  CategoryFilters,
  CategoryRepository,
} from "../domain/repositories/CategoryRepository.js";
import { prisma } from "../prisma/PrismaClient.js";

export class PrismaCategoryRepository implements CategoryRepository {
  async create(category: Category): Promise<Category> {
    const data = await prisma.category.create({
      data: {
        name: category.getName(),
        slug: category.getSlug(),
      },
    });

    return this.toDomain(data);
  }

  async findById(id: number): Promise<Category | null> {
    const data = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!data) {
      return null;
    }

    return this.toDomain(data);
  }

  async findBySlug(slug: string): Promise<Category | null> {
    const data = await prisma.category.findUnique({
      where: {
        slug,
      },
    });

    if (!data) {
      return null;
    }

    return this.toDomain(data);
  }

  async findMany(
    filters?: CategoryFilters,
  ): Promise<Category[]> {
    const data = await prisma.category.findMany({
      where: filters?.search
        ? {
            name: {
              contains: filters.search,
              mode: "insensitive",
            },
          }
        : undefined,

      orderBy: {
        name: "asc",
      },
    });

    return data.map((category) => this.toDomain(category));
  }

  async update(category: Category): Promise<Category> {
    const id = category.getId();

    if (id === undefined) {
      throw new Error(
        "Cannot update a category without an id",
      );
    }

    const data = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name: category.getName(),
        slug: category.getSlug(),
      },
    });

    return this.toDomain(data);
  }

  async delete(id: number): Promise<void> {
    await prisma.category.delete({
      where: {
        id,
      },
    });
  }

  async existsById(id: number): Promise<boolean> {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    return category !== null;
  }

  async existsBySlug(
    slug: string,
    excludeId?: number,
  ): Promise<boolean> {
    const category = await prisma.category.findFirst({
      where: {
        slug,
        ...(excludeId !== undefined
          ? {
              id: {
                not: excludeId,
              },
            }
          : {}),
      },
      select: {
        id: true,
      },
    });

    return category !== null;
  }

  private toDomain(
    data: {
      id: number;
      name: string;
      slug: string;
      createdAt: Date;
      updatedAt: Date;
    },
  ): Category {
    return new Category({
      id: data.id,
      name: data.name,
      slug: data.slug,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
