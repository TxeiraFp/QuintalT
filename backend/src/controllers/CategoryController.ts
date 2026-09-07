import type {
  FastifyReply,
  FastifyRequest,
} from "fastify";

import type { CategoryService } from "../services/CategoryService.js";

interface CategoryParams {
  id: string;
  slug: string;
}

interface CreateCategoryBody {
  name: string;
  slug: string;
}

interface UpdateCategoryBody {
  name?: string;
  slug?: string;
}

interface CategoryQuery {
  search?: string;
}

export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
  ) {}

  async create(
    request: FastifyRequest<{
      Body: CreateCategoryBody;
    }>,
    reply: FastifyReply,
  ): Promise<void> {
    const category =
      await this.categoryService.create(
        request.body,
      );

    reply.status(201).send(category);
  }

  async findById(
    request: FastifyRequest<{
      Params: CategoryParams;
    }>,
    reply: FastifyReply,
  ): Promise<void> {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      reply.status(400).send({
        message: "Invalid category id",
      });
      return;
    }

    const category =
      await this.categoryService.findById(id);

    reply.status(200).send(category);
  }

  async findBySlug(
    request: FastifyRequest<{
      Params: CategoryParams;
    }>,
    reply: FastifyReply,
  ): Promise<void> {
    const { slug } = request.params;

    if (!slug) {
      reply.status(400).send({
        message: "Category slug is required",
      });
      return;
    }

    const category =
      await this.categoryService.findBySlug(slug);

    reply.status(200).send(category);
  }

  async findMany(
    request: FastifyRequest<{
      Querystring: CategoryQuery;
    }>,
    reply: FastifyReply,
  ): Promise<void> {
    const categories =
      await this.categoryService.findMany({
        search: request.query.search,
      });

    reply.status(200).send(categories);
  }

  async update(
    request: FastifyRequest<{
      Params: CategoryParams;
      Body: UpdateCategoryBody;
    }>,
    reply: FastifyReply,
  ): Promise<void> {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      reply.status(400).send({
        message: "Invalid category id",
      });
      return;
    }

    const category =
      await this.categoryService.update(
        id,
        request.body,
      );

    reply.status(200).send(category);
  }

  async delete(
    request: FastifyRequest<{
      Params: CategoryParams;
    }>,
    reply: FastifyReply,
  ): Promise<void> {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      reply.status(400).send({
        message: "Invalid category id",
      });
      return;
    }

    await this.categoryService.delete(id);

    reply.status(204).send();
  }
}