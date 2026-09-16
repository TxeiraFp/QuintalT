import Link from "next/link";

import { getProducts } from "@/lib/api";

export default async function AdminProductsPage() {
const result = await getProducts({
page: 1,
limit: 100,
});

return (
<main className="min-h-screen bg-gray-100">
<div className="mx-auto max-w-7xl px-4 py-10">
{/* Cabeçalho */}
<div className="mb-8 flex items-center justify-between">
<div>
<h1 className="text-3xl font-bold text-gray-900">
Produtos
</h1>

        <p className="mt-2 text-sm text-gray-500">
          Gerencie os produtos do catálogo.
        </p>
      </div>

      <Link
        href="/painel/produtos/novo"
        className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
      >
        + Novo produto
      </Link>
    </div>

    {/* Resumo */}
    <div className="mb-8 grid gap-4 sm:grid-cols-3">
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <p className="text-sm text-gray-500">
          Total
        </p>

        <p className="mt-2 text-3xl font-bold text-gray-900">
          {result.total}
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <p className="text-sm text-gray-500">
          Página
        </p>

        <p className="mt-2 text-3xl font-bold text-gray-900">
          {result.page}
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <p className="text-sm text-gray-500">
          Total de páginas
        </p>

        <p className="mt-2 text-3xl font-bold text-gray-900">
          {result.totalPages}
        </p>
      </div>
    </div>

    {/* Tabela */}
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-700">
                Produto
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700">
                Preço
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700">
                Categoria
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700">
                Status
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700">
                Destaque
              </th>

              <th className="px-6 py-4 text-right font-semibold text-gray-700">
                Ações
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {result.products.map((product) => {
              const price = Number(product.price);

              return (
                <tr
                  key={product.id}
                  className="transition hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {product.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        /{product.slug}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-900">
                    {Number.isFinite(price)
                      ? `R$ ${price
                          .toFixed(2)
                          .replace(".", ",")}`
                      : "—"}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {product.category?.name ?? `Categoria #${product.categoryId}`}
                  </td>

                  <td className="px-6 py-4">
                    {product.active ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        Ativo
                      </span>
                    ) : (
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                        Inativo
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    {product.featured ? (
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                        Destaque
                      </span>
                    ) : (
                      <span className="text-gray-400">
                        —
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/painel/produtos/${product.id}`}
                      className="font-medium text-gray-700 underline transition hover:text-black"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {result.products.length === 0 && (
        <div className="px-6 py-16 text-center">
          <p className="text-gray-500">
            Nenhum produto cadastrado.
          </p>

          <Link
            href="/painel/produtos/novo"
            className="mt-4 inline-block font-medium underline"
          >
            Cadastrar primeiro produto
          </Link>
        </div>
      )}
    </div>
  </div>
</main>


);
}