import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const price = Number(product.price);

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Imagem */}
      <Link
        href={`/produtos/${product.slug}`}
        className="block"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 sm:aspect-square">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="
                (max-width: 640px) 100vw,
                (max-width: 1024px) 50vw,
                25vw
              "
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-sm text-gray-400">
                Sem imagem
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Conteúdo */}
      <div className="p-4 sm:p-5">
        {/* Categoria */}
        {product.category && (
          <Link
            href={`/categorias/${product.category.slug}`}
            className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 transition hover:text-gray-700"
          >
            {product.category.name}
          </Link>
        )}

        {/* Nome */}
        <Link
          href={`/produtos/${product.slug}`}
          className="mt-1 block"
        >
          <h2 className="line-clamp-1 text-base font-semibold text-gray-900 sm:text-lg">
            {product.name}
          </h2>
        </Link>

        {/* Descrição */}
        {product.description && (
          <p className="mt-2 hidden line-clamp-2 text-sm leading-5 text-gray-500 sm:block">
            {product.description}
          </p>
        )}

        {/* Rodapé */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-base font-bold text-gray-900 sm:text-lg">
            {Number.isFinite(price)
              ? `R$ ${price.toFixed(2).replace(".", ",")}`
              : "Preço indisponível"}
          </span>

          <Link
            href={`/produtos/${product.slug}`}
            aria-label={`Ver detalhes de ${product.name}`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white transition-all duration-300 hover:bg-gray-700 sm:h-auto sm:w-auto sm:rounded-lg sm:px-4 sm:py-2 sm:text-sm sm:font-medium"
          >
            <span className="hidden sm:inline">
              Ver detalhes
            </span>

            <span className="text-lg sm:hidden">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
