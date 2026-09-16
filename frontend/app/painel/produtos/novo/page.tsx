"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { createProduct } from "@/lib/api";

export default function NewProductPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    imageUrl: "",
    buyUrl: "",
    categoryId: "",
    featured: false,
    active: true,
  });

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
    setLoading(true);

    try {
      await createProduct({
        name: form.name.trim(),
        slug: form.slug.trim(),
        description: form.description.trim() || undefined,
        price: Number(form.price),
        imageUrl: form.imageUrl.trim() || undefined,
        buyUrl: form.buyUrl.trim() || undefined,
        categoryId: Number(form.categoryId),
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
          : "Não foi possível criar o produto.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-8">
          <Link
            href="/painel/produtos"
            className="text-sm text-gray-500 hover:text-gray-900"
          >
            ← Voltar para produtos
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Novo produto
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Cadastre um novo produto no catálogo.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
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
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
              placeholder="Ex.: Camisa Azul"
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
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
              placeholder="camisa-azul"
            />
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
              className="mt-2 w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
              placeholder="Descrição do produto..."
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

            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
              placeholder="89.90"
            />
          </div>

          {/* Categoria */}
          <div>
            <label
              htmlFor="categoryId"
              className="block text-sm font-medium text-gray-700"
            >
              ID da categoria
            </label>

            <input
              id="categoryId"
              name="categoryId"
              type="number"
              min="1"
              value={form.categoryId}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
              placeholder="2"
            />
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
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
              placeholder="https://..."
            />
          </div>

          {/* Compra */}
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
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
              placeholder="https://..."
            />
          </div>

          {/* Status */}
          <div className="space-y-4 border-t border-gray-200 pt-6">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="active"
                checked={form.active}
                onChange={handleChange}
                className="h-4 w-4"
              />

              <span className="text-sm font-medium text-gray-700">
                Produto ativo
              </span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="h-4 w-4"
              />

              <span className="text-sm font-medium text-gray-700">
                Produto em destaque
              </span>
            </label>
          </div>

          {/* Ações */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-6">
            <Link
              href="/painel/produtos"
              className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Criando..." : "Criar produto"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
