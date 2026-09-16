import Link from "next/link";
import type { Category } from "@/types/category";

interface CategorySectionProps {
  categories: Category[];
}

export default function CategorySection({
  categories,
}: CategorySectionProps) {
  return (
    <section className="bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4">

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Categorias
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Encontre produtos por categoria.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categorias/${category.slug}`}
              className="rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white"
            >
              {category.name}
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
