import type { FastifyInstance } from "fastify";
import { ProductController } from "../controllers/ProductController.js";

export async function productRoutes(
  fastify: FastifyInstance,
  controller: ProductController,
) {
  fastify.get(
    "/products",
    controller.findMany.bind(controller),
  );

  fastify.get(
    "/products/featured",
    controller.findFeatured.bind(controller),
  );

  fastify.get(
    "/products/active",
    controller.findActive.bind(controller),
  );

  fastify.get(
    "/products/slug/:slug",
    controller.findBySlug.bind(controller),
  );

  fastify.get(
    "/products/:id",
    controller.findById.bind(controller),
  );

  fastify.post(
    "/products",
    controller.create.bind(controller),
  );

  fastify.put(
    "/products/:id",
    controller.update.bind(controller),
  );

  fastify.patch(
    "/products/:id/activate",
    controller.activate.bind(controller),
  );

  fastify.patch(
    "/products/:id/deactivate",
    controller.deactivate.bind(controller),
  );

  fastify.patch(
    "/products/:id/feature",
    controller.feature.bind(controller),
  );

  fastify.patch(
    "/products/:id/unfeature",
    controller.unfeature.bind(controller),
  );

  fastify.delete(
    "/products/:id",
    controller.delete.bind(controller),
  );
}