import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getProductBySlug } from "@/lib/api";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  let product;

  try {
    product = await getProductBySlug(slug);
  } catch {
    notFound();
  }

  if (!product) {
    notFound();
  }

  const price = Number(product.price);

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 pt-6">
        <nav className="text-sm text-gray-500">
          <Link
            href="/"
            className="transition hover:text-gray-900"
          >
            Início
          </Link>

          <span className="mx-2">/</span>

          <Link
            href="/catalogo"
            className="transition hover:text-gray-900"
          >
            Catálogo
          </Link>

          <span className="mx-2">/</span>

          <span className="text-gray-900">
            {product.name}
          </span>
        </nav>
      </div>

      {/* Produto */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          {/* Imagem */}
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                priority
                sizes="
                  (max-width: 768px) 100vw,
                  50vw
                "
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-sm text-gray-400">
                  Sem imagem
                </span>
              </div>
            )}
          </div>

          {/* Informações */}
          <div className="flex flex-col justify-center">
            {/* Categoria */}
            {product.category && (
              <Link
                href={`/categorias/${product.category.slug}`}
                className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500 transition hover:text-gray-900"
              >
                {product.category.name}
              </Link>
            )}

            {/* Nome */}
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {product.name}
            </h1>

            {/* Preço */}
            <div className="mt-6">
              <span className="text-2xl font-bold text-gray-900">
                {Number.isFinite(price)
                  ? `R$ ${price.toFixed(2).replace(".", ",")}`
                  : "Preço indisponível"}
              </span>
            </div>

            {/* Descrição */}
            {product.description && (
              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
                  Sobre o produto
                </h2>

                <p className="mt-4 whitespace-pre-line text-base leading-7 text-gray-600">
                  {product.description}
                </p>
              </div>
            )}

            {/* Onde comprar */}
            {product.buyUrl && (
              <div className="mt-10">
                <a
                  href={product.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-700 sm:w-auto"
                >
                  Onde comprar
                </a>
              </div>
            )}

            {/* Voltar */}
            <div className="mt-6">
              <Link
                href="/catalogo"
                className="text-sm font-medium text-gray-500 transition hover:text-gray-900"
              >
                ← Voltar para o catálogo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
