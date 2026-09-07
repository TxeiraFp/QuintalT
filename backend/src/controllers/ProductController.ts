import type {
  FastifyReply,
  FastifyRequest,
} from "fastify";

import type { ProductService } from "../services/ProductService.js";

interface ProductParams {
  id: string;
  slug: string;
}

interface CreateProductBody {
  name: string;
  slug: string;
  description?: string;
  price: any;
  imageUrl?: string;
  buyUrl?: string;
  featured?: boolean;
  active?: boolean;
  categoryId: number;
}

interface UpdateProductBody {
  name?: string;
  slug?: string;
  description?: string;
  price?: any;
  imageUrl?: string;
  buyUrl?: string;
  featured?: boolean;
  active?: boolean;
  categoryId?: number;
}

interface ProductQuery {
  page?: string;
  limit?: string;
  search?: string;
  categoryId?: string;
  featured?: string;
  active?: string;
}

export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) {}

  async create(
    request: FastifyRequest<{
      Body: CreateProductBody;
    }>,
    reply: FastifyReply,
  ): Promise<void> {
    const product =
      await this.productService.create(
        request.body,
      );

    reply.status(201).send(product);
  }

  async findById(
    request: FastifyRequest<{
      Params: ProductParams;
    }>,
    reply: FastifyReply,
  ): Promise<void> {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      reply.status(400).send({
        message: "Invalid product id",
      });
      return;
    }

    const product =
      await this.productService.findById(id);

    reply.status(200).send(product);
  }

  async findBySlug(
    request: FastifyRequest<{
      Params: ProductParams;
    }>,
    reply: FastifyReply,
  ): Promise<void> {
    const { slug } = request.params;

    if (!slug) {
      reply.status(400).send({
        message: "Product slug is required",
      });
      return;
    }

    const product =
      await this.productService.findBySlug(slug);

    reply.status(200).send(product);
  }

  async findMany(
    request: FastifyRequest<{
      Querystring: ProductQuery;
    }>,
    reply: FastifyReply,
  ): Promise<void> {
    const page = request.query.page
      ? Number(request.query.page)
      : undefined;

    const limit = request.query.limit
      ? Number(request.query.limit)
      : undefined;

    const categoryId = request.query.categoryId
      ? Number(request.query.categoryId)
      : undefined;

    const featured =
      request.query.featured !== undefined
        ? request.query.featured === "true"
        : undefined;

    const active =
      request.query.active !== undefined
        ? request.query.active === "true"
        : undefined;

    const result =
      await this.productService.findMany({
        page,
        limit,
        search: request.query.search,
        categoryId,
        featured,
        active,
      });

    reply.status(200).send(result);
  }

  async update(
    request: FastifyRequest<{
      Params: ProductParams;
      Body: UpdateProductBody;
    }>,
    reply: FastifyReply,
  ): Promise<void> {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      reply.status(400).send({
        message: "Invalid product id",
      });
      return;
    }

    const product =
      await this.productService.update(
        id,
        request.body,
      );

    reply.status(200).send(product);
  }

  async delete(
    request: FastifyRequest<{
      Params: ProductParams;
    }>,
    reply: FastifyReply,
  ): Promise<void> {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      reply.status(400).send({
        message: "Invalid product id",
      });
      return;
    }

    await this.productService.delete(id);

    reply.status(204).send();
  }

  async activate(
    request: FastifyRequest<{
      Params: ProductParams;
    }>,
    reply: FastifyReply,
  ): Promise<void> {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      reply.status(400).send({
        message: "Invalid product id",
      });
      return;
    }

    const product =
      await this.productService.activate(id);

    reply.status(200).send(product);
  }

  async deactivate(
    request: FastifyRequest<{
      Params: ProductParams;
    }>,
    reply: FastifyReply,
  ): Promise<void> {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      reply.status(400).send({
        message: "Invalid product id",
      });
      return;
    }

    const product =
      await this.productService.deactivate(id);

    reply.status(200).send(product);
  }

  async feature(
    request: FastifyRequest<{
      Params: ProductParams;
    }>,
    reply: FastifyReply,
  ): Promise<void> {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      reply.status(400).send({
        message: "Invalid product id",
      });
      return;
    }

    const product =
      await this.productService.feature(id);

    reply.status(200).send(product);
  }

  async unfeature(
    request: FastifyRequest<{
      Params: ProductParams;
    }>,
    reply: FastifyReply,
  ): Promise<void> {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      reply.status(400).send({
        message: "Invalid product id",
      });
      return;
    }

    const product =
      await this.productService.unfeature(id);

    reply.status(200).send(product);
  }

  async findFeatured(
    request: FastifyRequest<{
      Querystring: ProductQuery;
    }>,
    reply: FastifyReply,
  ): Promise<void> {
    const page = request.query.page
      ? Number(request.query.page)
      : 1;

    const limit = request.query.limit
      ? Number(request.query.limit)
      : 20;

    const result =
      await this.productService.findFeatured(
        page,
        limit,
      );

    reply.status(200).send(result);
  }

  async findActive(
    request: FastifyRequest<{
      Querystring: ProductQuery;
    }>,
    reply: FastifyReply,
  ): Promise<void> {
    const page = request.query.page
      ? Number(request.query.page)
      : 1;

    const limit = request.query.limit
      ? Number(request.query.limit)
      : 20;

    const result =
      await this.productService.findActive(
        page,
        limit,
      );

    reply.status(200).send(result);
  }
}