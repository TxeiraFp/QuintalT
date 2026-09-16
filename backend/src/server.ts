import Fastify from "fastify";
import dotenv from "dotenv";
import cors from "@fastify/cors";

import { PrismaCategoryRepository } from "./infrastructure/PrismaCategoryRepository.js";
import { PrismaProductRepository } from "./infrastructure/PrismaProductRepository.js";

import { CategoryService } from "./services/CategoryService.js";
import { ProductService } from "./services/ProductService.js";

import { CategoryController } from "./controllers/CategoryController.js";
import { ProductController } from "./controllers/ProductController.js";

import { categoryRoutes } from "./routes/Category.routes.js";
import { productRoutes } from "./routes/Product.routes.js";

dotenv.config();

const app = Fastify({
  logger: true,
});

await app.register(cors, {
  origin: "http://localhost:3000",
});

// ======================================================
// DEPENDENCIES
// ======================================================

const categoryRepository =
  new PrismaCategoryRepository();

const productRepository =
  new PrismaProductRepository();

// ======================================================
// SERVICES
// ======================================================

const categoryService =
  new CategoryService(
    categoryRepository,
  );

const productService =
  new ProductService(
    productRepository,
    categoryRepository,
  );

// ======================================================
// CONTROLLERS
// ======================================================

const categoryController =
  new CategoryController(
    categoryService,
  );

const productController =
  new ProductController(
    productService,
  );

// ======================================================
// ROUTES
// ======================================================

app.register(async (fastify) => {
  await categoryRoutes(
    fastify,
    categoryController,
  );

  await productRoutes(
    fastify,
    productController,
  );
});

// ======================================================
// HEALTH CHECK
// ======================================================

app.get("/", async () => {
  return {
    message: "API QuintalT funcionando!",
  };
});

// ======================================================
// SERVER
// ======================================================

const start = async () => {
  try {
    const port =
      Number(process.env.PORT) || 3333;

      console.log(app.printRoutes());


    await app.listen({
      port,
      host: "0.0.0.0",
    });

    console.log(
      `🚀 Servidor rodando em http://localhost:${port}`,
    );
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();