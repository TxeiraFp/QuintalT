import type { Product } from "@/types/product";
import type { Category } from "@/types/category";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL não está configurada");
}

async function apiFetch<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status}`);
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

// ===============================
// CATEGORIES
// ===============================

export async function getCategories(): Promise<Category[]> {
  return apiFetch<Category[]>("/categories");
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category> {
  return apiFetch<Category>(
    `/categories/slug/${encodeURIComponent(slug)}`
  );
}

// ===============================
// PRODUCTS
// ===============================

export async function getProducts(
  params?: GetProductsParams
): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams();

  if (params?.page !== undefined) {
    searchParams.set("page", String(params.page));
  }

  if (params?.limit !== undefined) {
    searchParams.set("limit", String(params.limit));
  }

  if (params?.search !== undefined) {
    searchParams.set("search", params.search);
  }

  if (params?.categoryId !== undefined) {
    searchParams.set(
      "categoryId",
      String(params.categoryId)
    );
  }

  if (params?.featured !== undefined) {
    searchParams.set(
      "featured",
      String(params.featured)
    );
  }

  if (params?.active !== undefined) {
    searchParams.set(
      "active",
      String(params.active)
    );
  }

  const query = searchParams.toString();

  const endpoint = `/products${query ? `?${query}` : ""}`;

  console.log("=================================");
  console.log("GET PRODUCTS");
  console.log("ENDPOINT:", endpoint);
  console.log("PARAMS:", params);
  console.log("=================================");

  const response = await apiFetch<ProductsResponse>(
    endpoint
  );

  console.log("PRODUCT RESPONSE:", response);

  return response;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const response = await apiFetch<ProductsResponse>(
    "/products/featured"
  );

  return response.products;
}

export async function getActiveProducts(): Promise<Product[]> {
  const response = await apiFetch<ProductsResponse>(
    "/products/active"
  );

  return response.products;
}

export async function getProductBySlug(
  slug: string
): Promise<Product> {
  return apiFetch<Product>(
    `/products/slug/${encodeURIComponent(slug)}`
  );
}