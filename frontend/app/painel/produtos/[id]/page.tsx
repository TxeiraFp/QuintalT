import { notFound } from "next/navigation";

import { getProductById } from "@/lib/api";
import ProductEditForm from "./ProductEditForm";

interface ProductEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductEditPage({
  params,
}: ProductEditPageProps) {
  const { id } = await params;

  const productId = Number(id);

  if (!Number.isInteger(productId) || productId <= 0) {
    notFound();
  }

  let product;

  try {
    product = await getProductById(productId);
  } catch {
    notFound();
  }

  if (!product) {
    notFound();
  }

  return <ProductEditForm product={product} />;
}
