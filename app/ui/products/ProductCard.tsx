'use client';

import type { Product } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const { addToCart } = useCart();
    const placeholderImage = '/file.svg';

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    return (
        <div 
            className="bg-background dark:bg-primary/10 rounded-xl overflow-hidden shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-300 border border-secondary/20 group flex flex-col h-full"
        >
            <Link href={`/products/${product._id}`} className="flex flex-col flex-grow">
                <div className="relative overflow-hidden h-48">
                    <Image 
                        src={product.imageUrl || placeholderImage} 
                        alt={product.name} 
                        fill
                        style={{ objectFit: 'cover' }}
                        className="group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-md font-bold text-text mb-2 flex-grow">{product.name}</h3>
                    <p className="text-sm text-text/80 mb-3">
                        {product.description ? `${product.description.substring(0, 50)}...` : ''}
                    </p>
                    <div className="text-xs text-text/60 mb-3">
                        <p>Fornecedor: {product.supplier?.name || 'N/A'}</p>
                        <p>Unidade: {product.unit}</p>
                    </div>
                    <div className="mt-auto">
                        <p className="text-xl font-extrabold text-text">
                            R$ {product.unitPrice.toFixed(2).replace('.', ',')}
                        </p>
                    </div>
                </div>
            </Link>
            <div className="p-4 pt-0">
                <button 
                    onClick={handleAddToCart}
                    className="w-full flex items-center justify-center gap-2 bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-secondary/90 transition-all cursor-pointer"
                >
                    <ShoppingCart size={16} />
                    Adicionar
                </button>
            </div>
        </div>
    );
};