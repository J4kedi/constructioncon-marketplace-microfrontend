'use client';

import type { Product } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';

interface ProductDetailClientProps {
    product: Product | null;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    const { addToCart } = useCart();
    const placeholderImage = '/file.svg';

    if (!product) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
                <h1 className="text-2xl font-bold text-text mb-4">Produto não encontrado</h1>
                <p className="text-text/80 mb-6">O produto que você está procurando não existe ou foi removido.</p>
                <Link href="/" className="text-sm font-medium text-primary hover:underline">
                    &larr; Voltar para o marketplace
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link href="/" className="text-sm font-medium text-primary hover:underline mb-6 inline-block">
                &larr; Voltar para o marketplace
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                <div className="bg-background border border-accent rounded-lg p-4">
                    <div className="relative w-full h-96">
                        <Image 
                            src={product.imageUrl || placeholderImage} 
                            alt={product.name} 
                            fill
                            style={{ objectFit: 'contain' }}
                            className="rounded-md"
                        />
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-text my-2">{product.name}</h1>
                    <p className="text-text/60 mb-4">Fornecido por: {product.supplier?.name || 'N/A'}</p>
                    <p className="text-lg text-text/80 mb-6">{product.description || 'Sem descrição.'}</p>
                    <p className="text-text/60 mb-4">Vendido por: {product.unit}</p>
                    
                    <div className="my-6">
                        <span className="text-4xl lg:text-5xl font-extrabold text-text">R$ {product.unitPrice.toFixed(2).replace('.', ',')}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <button 
                            onClick={() => addToCart(product)}
                            className="w-full text-center bg-secondary/80 text-white font-bold py-3 px-6 rounded-lg hover:opacity-80 transition-opacity"
                        >
                            Adicionar ao Carrinho
                        </button>
                        <button className="w-full text-center bg-secondary/80 text-white font-bold py-3 px-6 rounded-lg hover:bg-secondary/60 transition-colors">
                            Comprar Agora
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}