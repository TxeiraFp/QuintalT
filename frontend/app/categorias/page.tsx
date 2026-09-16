import Link from "next/link";
import { getCategories } from "@/lib/api";

export default async function CategoriesPage() {
const categories = await getCategories();

return (
<main className="min-h-screen bg-white">
<section className="mx-auto max-w-7xl px-4 py-10 sm:py-16">
<div className="mb-10">
<h1 className="text-4xl font-bold tracking-tight text-gray-900">
Categorias
</h1>

      <p className="mt-2 text-gray-600">
        Explore nossos produtos por categoria.
      </p>
    </div>

    {categories.length === 0 ? (
      <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-16 text-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Nenhuma categoria encontrada
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Ainda não existem categorias cadastradas.
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categorias/${category.slug}`}
            className="group rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {category.name}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Ver produtos desta categoria
                </p>
              </div>

              <span className="text-xl text-gray-400 transition group-hover:translate-x-1 group-hover:text-gray-900">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    )}
  </section>
</main>


);
}