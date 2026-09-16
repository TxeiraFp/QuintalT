import { Product } from "../domain/entities/Product.js";
import type {
PaginatedProducts,
ProductFilters,
ProductRepository,
} from "../domain/repositories/ProductRepository.js";
import { prisma } from "../prisma/PrismaClient.js";

export class PrismaProductRepository
implements ProductRepository
{
async create(product: Product): Promise<Product> {
const data = await prisma.product.create({
data: {
name: product.getName(),
slug: product.getSlug(),
description: product.getDescription(),
price: product.getPrice(),
imageUrl: product.getImageUrl(),
buyUrl: product.getBuyUrl(),
featured: product.getFeatured(),
active: product.getActive(),
categoryId: product.getCategoryId(),
},
include: {
category: true,
},
});

return this.toDomain(data);


}

async findById(id: number): Promise<Product | null> {
const data = await prisma.product.findUnique({
where: {
id,
},
include: {
category: true,
},
});

if (!data) {
  return null;
}

return this.toDomain(data);


}

async findBySlug(
slug: string,
): Promise<Product | null> {
const data = await prisma.product.findUnique({
where: {
slug,
},
include: {
category: true,
},
});

if (!data) {
  return null;
}

return this.toDomain(data);


}

async findMany(
filters?: ProductFilters,
): Promise<PaginatedProducts> {
const page = Math.max(
filters?.page ?? 1,
1,
);

const limit = Math.min(
  Math.max(filters?.limit ?? 20, 1),
  100,
);

const where = {
  ...(filters?.search
    ? {
        OR: [
          {
            name: {
              contains: filters.search,
              mode: "insensitive" as const,
            },
          },
          {
            description: {
              contains: filters.search,
              mode: "insensitive" as const,
            },
          },
        ],
      }
    : {}),

  ...(filters?.categoryId !== undefined
    ? {
        categoryId: filters.categoryId,
      }
    : {}),

  ...(filters?.featured !== undefined
    ? {
        featured: filters.featured,
      }
    : {}),

  ...(filters?.active !== undefined
    ? {
        active: filters.active,
      }
    : {}),
};

const [data, total] =
  await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    }),

    prisma.product.count({
      where,
    }),
  ]);

return {
  products: data.map((product) =>
    this.toDomain(product),
  ),
  total,
  page,
  limit,
  totalPages: Math.ceil(
    total / limit,
  ),
};


}

async update(
product: Product,
): Promise<Product> {
const id = product.getId();

if (id === undefined) {
  throw new Error(
    "Cannot update a product without an id",
  );
}

const data = await prisma.product.update({
  where: {
    id,
  },
  data: {
    name: product.getName(),
    slug: product.getSlug(),
    description: product.getDescription(),
    price: product.getPrice(),
    imageUrl: product.getImageUrl(),
    buyUrl: product.getBuyUrl(),
    featured: product.getFeatured(),
    active: product.getActive(),
    categoryId: product.getCategoryId(),
  },
  include: {
    category: true,
  },
});

return this.toDomain(data);


}

async delete(id: number): Promise<void> {
await prisma.product.delete({
where: {
id,
},
});
}

async existsById(
id: number,
): Promise<boolean> {
const product =
await prisma.product.findUnique({
where: {
id,
},
select: {
id: true,
},
});

return product !== null;


}

async existsBySlug(
slug: string,
excludeId?: number,
): Promise<boolean> {
const product =
await prisma.product.findFirst({
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

return product !== null;


}

private toDomain(
data: {
id: number;
name: string;
slug: string;
description: string | null;
price: unknown;
imageUrl: string | null;
buyUrl: string | null;
featured: boolean;
active: boolean;
categoryId: number;
createdAt: Date;
updatedAt: Date;

  category?: {
    id: number;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
},


): Product {
return new Product({
id: data.id,
name: data.name,
slug: data.slug,
description:
data.description ?? undefined,
price: data.price as Product["price"],
imageUrl:
data.imageUrl ?? undefined,
buyUrl:
data.buyUrl ?? undefined,
featured: data.featured,
active: data.active,
categoryId: data.categoryId,

  category: data.category
    ? {
        id: data.category.id,
        name: data.category.name,
        slug: data.category.slug,
        createdAt:
          data.category.createdAt,
        updatedAt:
          data.category.updatedAt,
      }
    : undefined,

  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
});


}
}