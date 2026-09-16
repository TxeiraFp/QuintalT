"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getCategories,
  updateProduct,
} from "@/lib/api";

import type { Product } from "@/types/product";
import type { Category } from "@/types/category";

interface ProductEditFormProps {
  product: Product;
}

export default function ProductEditForm({
  product,
}: ProductEditFormProps) {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] =
    useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: product.name,
    slug: product.slug,
    description: product.description ?? "",
    price: String(product.price),
    imageUrl: product.imageUrl ?? "",
    buyUrl: product.buyUrl ?? "",
    categoryId: String(product.categoryId),
    featured: product.featured,
    active: product.active,
  });

  useEffect(() => {
    async function loadCategories() {
      try {
        const result = await getCategories();
        setCategories(result);
      } catch (error) {
        console.error(error);

        setError(
          "Não foi possível carregar as categorias.",
        );
      } finally {
        setLoadingCategories(false);
      }
    }

    loadCategories();
  }, []);

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value, type } = event.target;

    setForm((current) => ({
      ...current,
      [name]:
        type === "checkbox"
          ? (event.target as HTMLInputElement).checked
          : value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    const price = Number(form.price);
    const categoryId = Number(form.categoryId);

    if (!form.name.trim()) {
      setError("O nome do produto é obrigatório.");
      return;
    }

    if (!form.slug.trim()) {
      setError("O slug do produto é obrigatório.");
      return;
    }

    if (!Number.isFinite(price) || price < 0) {
      setError("Informe um preço válido.");
      return;
    }

    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      setError("Selecione uma categoria válida.");
      return;
    }

    setLoading(true);

    try {
      await updateProduct(product.id, {
        name: form.name.trim(),
        slug: form.slug.trim(),
        description:
          form.description.trim() || undefined,
        price,
        imageUrl:
          form.imageUrl.trim() || undefined,
        buyUrl:
          form.buyUrl.trim() || undefined,
        categoryId,
        featured: form.featured,
        active: form.active,
      });

      router.push("/painel/produtos");
      router.refresh();
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar o produto.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-3xl px-4 py-10">

        {/* Cabeçalho */}
        <div className="mb-8">
          <Link
            href="/admin/produtos"
            className="text-sm text-gray-500 transition hover:text-gray-900"
          >
            ← Voltar para produtos
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Editar produto
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Altere as informações de {product.name}.
          </p>
        </div>

        {/* Formulário */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >

          {/* Erro */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Nome */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nome
            </label>

            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
            />
          </div>

          {/* Slug */}
          <div>
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-gray-700"
            >
              Slug
            </label>

            <input
              id="slug"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
            />

            <p className="mt-1 text-xs text-gray-400">
              Exemplo: camisa-azul
            </p>
          </div>

          {/* Descrição */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Descrição
            </label>

            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              className="mt-2 w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
            />
          </div>

          {/* Preço */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Preço
            </label>

            <div className="relative mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                R$
              </span>

              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-gray-500"
              />
            </div>
          </div>

          {/* Categoria */}
          <div>
            <label
              htmlFor="categoryId"
              className="block text-sm font-medium text-gray-700"
            >
              Categoria
            </label>

            <select
              id="categoryId"
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              required
              disabled={loadingCategories}
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-500 disabled:cursor-not-allowed disabled:bg-gray-100"
            >
              <option value="">
                {loadingCategories
                  ? "Carregando categorias..."
                  : "Selecione uma categoria"}
              </option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Imagem */}
          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700"
            >
              URL da imagem
            </label>

            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
            />
          </div>

          {/* URL de compra */}
          <div>
            <label
              htmlFor="buyUrl"
              className="block text-sm font-medium text-gray-700"
            >
              URL para comprar
            </label>

            <input
              id="buyUrl"
              name="buyUrl"
              type="url"
              value={form.buyUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
            />
          </div>

          {/* Status */}
          <div className="space-y-4 border-t border-gray-200 pt-6">

            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                name="active"
                checked={form.active}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300"
              />

              <span className="text-sm font-medium text-gray-700">
                Produto ativo
              </span>
            </label>

            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300"
              />

              <span className="text-sm font-medium text-gray-700">
                Produto em destaque
              </span>
            </label>

          </div>

          {/* Ações */}
          <div className="flex items-center justify-between border-t border-gray-200 pt-6">

            <span className="text-xs text-gray-400">
              ID: {product.id}
            </span>

            <div className="flex gap-3">
              <Link
                href="/painel/produtos"
                className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancelar
              </Link>

              <button
                type="submit"
                disabled={loading || loadingCategories}
                className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Salvando..."
                  : "Salvar alterações"}
              </button>
            </div>

          </div>
        </form>
      </div>
    </main>
  );
}