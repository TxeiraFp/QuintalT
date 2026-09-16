import { getProducts } from "@/lib/api";
import ProductGrid from "@/components/product/ProductGrid";

export default async function CatalogoPage() {
  const result = await getProducts({
    active: true,
    page: 1,
    limit: 12,
  });

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Catálogo
          </h1>

          <p className="mt-2 text-gray-600">
            Confira nossos produtos.
          </p>
        </div>

        <ProductGrid products={result.products} />
      </section>
    </main>
  );
}
