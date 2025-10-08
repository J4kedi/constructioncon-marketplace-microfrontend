
'use client';

import { useState, useMemo } from 'react';
import type { Product, Supplier } from '@/lib/types';
import { SearchBar } from './SearchBar';
import { ProductFilters } from './ProductFilters';
import { ProductCard } from './ProductCard';

interface MarketplaceProps {
    initialProducts: Product[];
    suppliers: Supplier[];
}

export default function Marketplace({ initialProducts, suppliers }: MarketplaceProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ supplier: 'Todos' });

    const filteredProducts = useMemo(() => {
        return initialProducts.filter(product => {
            const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                product.supplier.name.toLowerCase().includes(searchTerm.toLowerCase());
            
            const supplierMatch = filters.supplier === 'Todos' || product.supplier.name === filters.supplier;

            return searchMatch && supplierMatch;
        });
    }, [searchTerm, filters, initialProducts]);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-theme-accent p-6 rounded-lg mb-8">
                <h1 className="text-3xl font-bold text-theme-text mb-2">Marketplace de Suprimentos</h1>
                <p className="text-theme-text/80">Encontre os melhores materiais e ferramentas para sua obra.</p>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <ProductFilters 
                    suppliers={suppliers} 
                    filters={filters} 
                    setFilters={setFilters} 
                />
                
                <main className="md:col-span-3">
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <h3 className="text-xl font-semibold">Nenhum produto encontrado</h3>
                            <p className="text-theme-text/70 mt-2">Tente ajustar sua busca ou filtros.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
