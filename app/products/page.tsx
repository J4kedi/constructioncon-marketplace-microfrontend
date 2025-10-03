
'use client';

import { Product } from "@/lib/types";
import { useCart } from "@/app/context/CartContext";
import { useEffect, useState } from "react";

async function getProducts(): Promise<Product[]> {
    const bffUrl = process.env.NEXT_PUBLIC_BFF_URL;
    try {
        const res = await fetch(`${bffUrl}/api/proxy/catalog/products`, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error(`Failed to fetch products: ${res.statusText}`);
        }
        return res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const { dispatch } = useCart();

    useEffect(() => {
        getProducts().then(setProducts);
    }, []);

    const handleAddToCart = (product: Product) => {
        dispatch({ type: 'ADD_ITEM', payload: product });
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Catálogo de Produtos</h1>
            
            {products.length === 0 ? (
                <p>Carregando produtos...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product._id} className="border rounded-lg p-6 shadow-sm bg-card text-card-foreground flex flex-col">
                            <div className="flex-grow">
                                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                                <p className="text-muted-foreground mb-4">Fornecedor: {product.supplier.name}</p>
                                <p className="text-lg font-bold">R$ {product.unitPrice.toFixed(2)} / {product.unit}</p>
                            </div>
                            <button 
                                onClick={() => handleAddToCart(product)}
                                className="mt-4 w-full bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-primary/90 transition-colors">
                                Adicionar ao Carrinho
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
