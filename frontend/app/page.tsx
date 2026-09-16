import Link from "next/link";

import {
  getFeaturedProducts,
  getCategories,
} from "@/lib/api";

import ProductGrid from "@/components/product/ProductGrid";
import CategorySection from "@/components/layout/CategorySection";

export default async function Home() {
  const products = await getFeaturedProducts();
  const categories = await getCategories();

  // ===============================
  // TESTE DA API
  // ===============================

  console.log("=================================");
  console.log("FINAL PRODUCTS:", products);
  console.log("IS ARRAY:", Array.isArray(products));
  console.log("PRODUCTS LENGTH:", products?.length);
  console.log("CATEGORIES:", categories);
  console.log("=================================");

  return (
    <main>
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Conteúdo */}
        <div className="relative mx-auto flex min-h-[240px] max-w-7xl items-center px-4 py-20">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Encontre o que você procura
            </h1>

            <p className="mt-5 text-lg text-white/90">
              Explore nosso catálogo e conheça nossos produtos.
            </p>

            <Link
              href="/catalogo"
              className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-medium text-gray-900 transition hover:bg-gray-100"
            >
              Explorar catálogo
            </Link>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <CategorySection categories={categories} />

      {/* Produtos em destaque */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Produtos em destaque
            </h2>

            <p className="mt-2 text-gray-600">
              Confira alguns dos nossos produtos.
            </p>
          </div>

          <Link
            href="/catalogo"
            className="hidden text-sm font-medium underline md:block"
          >
            Ver catálogo
          </Link>
        </div>

        <ProductGrid products={products} />

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/catalogo"
            className="text-sm font-medium underline"
          >
            Ver catálogo completo
          </Link>
        </div>
      </section>
    </main>
  );
}