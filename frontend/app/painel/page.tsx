import Link from "next/link";

import {
  getProducts,
  getCategories,
} from "@/lib/api";

export default async function PainelPage() {
  const [productsResult, categories] =
    await Promise.all([
      getProducts({
        page: 1,
        limit: 100,
      }),
      getCategories(),
    ]);

  const products = productsResult.products;

  const totalProducts = productsResult.total;

  const activeProducts = products.filter(
    (product) => product.active,
  ).length;

  const inactiveProducts = products.filter(
    (product) => !product.active,
  ).length;

  const featuredProducts = products.filter(
    (product) => product.featured,
  ).length;

  const totalCategories = categories.length;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Cabeçalho */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Painel
          </h1>

          <p className="mt-2 text-gray-600">
            Gerencie seus produtos e categorias.
          </p>
        </div>

        {/* Estatísticas */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Produtos
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {totalProducts}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Produtos ativos
            </p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              {activeProducts}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Em destaque
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              {featuredProducts}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Categorias
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {totalCategories}
            </p>
          </div>
        </section>

        {/* Ações */}
        <section className="mt-10">
          <h2 className="mb-5 text-xl font-bold text-gray-900">
            Gerenciamento
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href="/painel/produtos"
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-gray-300 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                Produtos
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Criar, editar, excluir e gerenciar produtos.
              </p>

              <span className="mt-5 inline-block text-sm font-medium text-gray-900">
                Gerenciar produtos →
              </span>
            </Link>

            <Link
              href="/painel/categorias"
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-gray-300 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                Categorias
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Criar, editar e gerenciar categorias.
              </p>

              <span className="mt-5 inline-block text-sm font-medium text-gray-900">
                Gerenciar categorias →
              </span>
            </Link>
          </div>
        </section>

        {/* Resumo */}
        <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">
            Resumo
          </h2>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex items-center justify-between border-b pb-3">
              <span className="text-gray-500">
                Total de produtos
              </span>

              <span className="font-semibold text-gray-900">
                {totalProducts}
              </span>
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <span className="text-gray-500">
                Produtos ativos
              </span>

              <span className="font-semibold text-gray-900">
                {activeProducts}
              </span>
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <span className="text-gray-500">
                Produtos inativos
              </span>

              <span className="font-semibold text-gray-900">
                {inactiveProducts}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500">
                Produtos em destaque
              </span>

              <span className="font-semibold text-gray-900">
                {featuredProducts}
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}