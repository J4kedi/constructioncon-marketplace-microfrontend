"use client";

import { useState, useMemo } from 'react';
import { SearchBar } from "./ui/products/SearchBar";
import ProductFilters from './ui/components/ProductFilters';
import { ProductCard } from './ui/products/ProductCard';
import { mockProducts } from '@/app/lib/mockProducts';
import { Pagination } from './ui/components/Pagination';

type Filters = {
  category?: string;
  supplier?: string;
  minPrice?: string;
  maxPrice?: string;
};

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Filters>({});
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const { categories, suppliers } = useMemo(() => {
    const categories = [...new Set(mockProducts.map(p => p.category))];
    const suppliers = [...new Set(mockProducts.map(p => p.supplier.name))];
    return { categories, suppliers };
  }, []);

  const handleFilterChange = (newFilters: Record<string, string>) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
    setCurrentPage(1); // Reset page when filters change
  };
  
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset page when search term changes
  }

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const searchTermMatch = searchTerm.trim() === '' ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const categoryMatch = !filters.category || filters.category === 'all' || product.category === filters.category;
      const supplierMatch = !filters.supplier || filters.supplier === 'all' || product.supplier.name === filters.supplier;
      const minPriceMatch = !filters.minPrice || product.unitPrice >= parseFloat(filters.minPrice);
      const maxPriceMatch = !filters.maxPrice || product.unitPrice <= parseFloat(filters.maxPrice);

      return searchTermMatch && categoryMatch && supplierMatch && minPriceMatch && maxPriceMatch;
    });
  }, [searchTerm, filters]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="p-6 rounded-lg mb-8">
        <h1 className="text-3xl font-bold text-text mb-2">Marketplace de Suprimentos</h1>
        <p className="text-text/80">Encontre os melhores materiais e ferramentas para sua obra.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <ProductFilters 
            categories={categories}
            suppliers={suppliers}
            onFilterChange={handleFilterChange} 
          />
        </aside>

        <main className="md:col-span-3">
          <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearchChange} />
          
          {paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {paginatedProducts.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-text/80">Nenhum produto encontrado.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}