import Link from "next/link";

import { getProducts } from "@/lib/api";
import ProductGrid from "@/components/product/ProductGrid";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const { q } = await searchParams;

  const query = q?.trim() ?? "";

  console.log("=================================");
  console.log("SEARCH PAGE");
  console.log("QUERY:", query);
  console.log("=================================");

  const result = query
    ? await getProducts({
        search: query,
        page: 1,
        limit: 12,
      })
    : null;

  console.log("SEARCH RESULT:", result);

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 pt-6">
        <nav className="text-sm text-gray-500">
          <Link
            href="/"
            className="transition hover:text-gray-900"
          >
            Início
          </Link>

          <span className="mx-2">/</span>

          <span className="text-gray-900">
            Busca
          </span>
        </nav>
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-8 pt-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {query
            ? `Resultados para "${query}"`
            : "Buscar produtos"}
        </h1>

        {result && (
          <p className="mt-2 text-sm text-gray-500">
            {result.total === 1
              ? "1 produto encontrado"
              : `${result.total} produtos encontrados`}
          </p>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        {!query ? (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-16 text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Digite algo para pesquisar
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Use a busca para encontrar produtos no catálogo.
            </p>
          </div>
        ) : result && result.products.length > 0 ? (
          <ProductGrid products={result.products} />
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-16 text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Nenhum produto encontrado
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Não encontramos produtos para{" "}
              <span className="font-medium text-gray-900">
                &quot;{query}&quot;
              </span>
              .
            </p>

            <Link
              href="/catalogo"
              className="mt-6 inline-flex rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
            >
              Ver catálogo
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}