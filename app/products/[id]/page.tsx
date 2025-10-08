import { getProductById } from '@/app/lib/data';
import ProductDetailClient from '@/app/ui/products/ProductDetailClient';

interface ProductDetailPageProps {
    params: { id: string };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    const { id } = params;
    const product = await getProductById(id).catch(() => null);

    return <ProductDetailClient product={product} />;
}