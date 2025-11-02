import { getProductById } from "@/app/lib/data";
import ProductDetailClient from "@/app/ui/products/ProductDetailClient";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params; 

  const product = await getProductById(id).catch(() => null);

  return <ProductDetailClient product={product} />;
}
