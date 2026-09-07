import type { FastifyInstance } from "fastify";
import { CategoryController } from "../controllers/CategoryController.js";

export async function categoryRoutes(
  fastify: FastifyInstance,
  controller: CategoryController,
) {
  fastify.get(
    "/categories",
    controller.findMany.bind(controller),
  );

  fastify.get(
    "/categories/slug/:slug",
    controller.findBySlug.bind(controller),
  );

  fastify.get(
    "/categories/:id",
    controller.findById.bind(controller),
  );

  fastify.post(
    "/categories",
    controller.create.bind(controller),
  );

  fastify.put(
    "/categories/:id",
    controller.update.bind(controller),
  );

  fastify.delete(
    "/categories/:id",
    controller.delete.bind(controller),
  );
}
