import Link from "next/link";
import { notFound } from "next/navigation";

import {
getCategoryBySlug,
getProducts,
} from "@/lib/api";

import ProductGrid from "@/components/product/ProductGrid";

interface CategoryPageProps {
params: Promise<{
slug: string;
}>;
}

export default async function CategoryPage({
params,
}: CategoryPageProps) {
const { slug } = await params;

let category;

try {
category = await getCategoryBySlug(slug);
} catch {
notFound();
}

if (!category) {
notFound();
}

const result = await getProducts({
categoryId: category.id,
page: 1,
limit: 12,
active: true,
});

return (
<main className="min-h-screen bg-white">
{/* Breadcrumb */}
<div className="mx-auto max-w-7xl px-4 pt-6">
<nav className="text-sm text-gray-500">
<Link href="/" className="transition hover:text-gray-900" >
Início
</Link>

      <span className="mx-2">/</span>

      <Link
        href="/categorias"
        className="transition hover:text-gray-900"
      >
        Categorias
      </Link>

      <span className="mx-2">/</span>

      <span className="text-gray-900">
        {category.name}
      </span>
    </nav>
  </div>

  {/* Cabeçalho */}
  <section className="mx-auto max-w-7xl px-4 pb-8 pt-10">
    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
      {category.name}
    </h1>

    <p className="mt-2 text-sm text-gray-500">
      {result.total === 1
        ? "1 produto encontrado"
        : `${result.total} produtos encontrados`}
    </p>
  </section>

  {/* Produtos */}
  <section className="mx-auto max-w-7xl px-4 pb-16">
    {result.products.length > 0 ? (
      <ProductGrid products={result.products} />
    ) : (
      <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-16 text-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Nenhum produto encontrado
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Ainda não existem produtos nesta categoria.
        </p>

        <Link
          href="/categorias"
          className="mt-6 inline-flex rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
        >
          Ver categorias
        </Link>
      </div>
    )}
  </section>
</main>


);
}