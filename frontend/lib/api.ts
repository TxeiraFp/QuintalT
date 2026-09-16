import type { Product } from "@/types/product";
import type { Category } from "@/types/category";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL não está configurada");
}

async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const isMutation =
    options?.method &&
    options.method !== "GET";

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers ?? {}),
      },

      ...(isMutation
        ? {
            cache: "no-store",
          }
        : {
            next: {
              revalidate: 60,
            },
          }),
    },
  );

  if (!response.ok) {
    let message = `Erro na API: ${response.status}`;

    try {
      const data = await response.json();

      if (data?.message) {
        message = data.message;
      }
    } catch {
      // resposta sem JSON
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}


// ===============================
// TYPES
// ===============================

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: number;
  featured?: boolean;
  active?: boolean;
}

export interface CreateProductInput {
  name: string;
  slug: string;
  description?: string;
  price: number;
  imageUrl?: string;
  buyUrl?: string;
  featured?: boolean;
  active?: boolean;
  categoryId: number;
}

export interface UpdateProductInput {
  name?: string;
  slug?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  buyUrl?: string;
  featured?: boolean;
  active?: boolean;
  categoryId?: number;
}

// ===============================
// CATEGORIES
// ===============================

export async function getCategories(): Promise<Category[]> {
  return apiFetch<Category[]>("/categories");
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category> {
  return apiFetch<Category>(
    `/categories/slug/${encodeURIComponent(slug)}`,
  );
}

// ===============================
// PRODUCTS
// ===============================

export async function getProducts(
  params?: GetProductsParams,
): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams();

  if (params?.page !== undefined) {
    searchParams.set("page", String(params.page));
  }

  if (params?.limit !== undefined) {
    searchParams.set("limit", String(params.limit));
  }

  if (params?.search) {
    searchParams.set("search", params.search);
  }

  if (params?.categoryId !== undefined) {
    searchParams.set(
      "categoryId",
      String(params.categoryId),
    );
  }

  if (params?.featured !== undefined) {
    searchParams.set(
      "featured",
      String(params.featured),
    );
  }

  if (params?.active !== undefined) {
    searchParams.set(
      "active",
      String(params.active),
    );
  }

  const query = searchParams.toString();

  return apiFetch<ProductsResponse>(
    `/products${query ? `?${query}` : ""}`,
  );
}

export async function getProductById(
  id: number,
): Promise<Product> {
  return apiFetch<Product>(`/products/${id}`);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const response = await apiFetch<ProductsResponse>(
    "/products/featured",
  );

  return response.products;
}

export async function getActiveProducts(): Promise<Product[]> {
  const response = await apiFetch<ProductsResponse>(
    "/products/active",
  );

  return response.products;
}

export async function getProductBySlug(
  slug: string,
): Promise<Product> {
  return apiFetch<Product>(
    `/products/slug/${encodeURIComponent(slug)}`,
  );
}

// ===============================
// ADMIN - PRODUCTS
// ===============================

export async function createProduct(
  input: CreateProductInput,
): Promise<Product> {
  return apiFetch<Product>("/products", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateProduct(
  id: number,
  input: UpdateProductInput,
): Promise<Product> {
  return apiFetch<Product>(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export async function deleteProduct(
  id: number,
): Promise<void> {
  await apiFetch<void>(`/products/${id}`, {
    method: "DELETE",
  });
}

export async function activateProduct(
  id: number,
): Promise<Product> {
  return apiFetch<Product>(
    `/products/${id}/activate`,
    {
      method: "PATCH",
    },
  );
}

export async function deactivateProduct(
  id: number,
): Promise<Product> {
  return apiFetch<Product>(
    `/products/${id}/deactivate`,
    {
      method: "PATCH",
    },
  );
}

export async function featureProduct(
  id: number,
): Promise<Product> {
  return apiFetch<Product>(
    `/products/${id}/feature`,
    {
      method: "PATCH",
    },
  );
}

export async function unfeatureProduct(
  id: number,
): Promise<Product> {
  return apiFetch<Product>(
    `/products/${id}/unfeature`,
    {
      method: "PATCH",
    },
  );
}