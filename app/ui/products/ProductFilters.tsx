
'use client';

import type { Supplier } from '@/lib/types';

interface ProductFiltersProps {
    suppliers: Supplier[];
    filters: { supplier: string };
    setFilters: (filters: { supplier: string }) => void;
}

export const ProductFilters = ({ suppliers, filters, setFilters }: ProductFiltersProps) => {
    const allSuppliers = [{ _id: 'Todos', name: 'Todos' }, ...suppliers];

    return (
        <aside className="md:col-span-1">
            <div className="bg-theme-background border border-theme-accent p-4 rounded-lg sticky top-24">
                <h3 className="text-lg font-semibold mb-4">Filtros</h3>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="supplier" className="block text-sm font-medium text-theme-text/80 mb-1">Fornecedor</label>
                        <select 
                            id="supplier" 
                            className="w-full p-2 rounded-md bg-theme-accent border-transparent focus:ring-2 focus:ring-theme-primary focus:outline-none"
                            onChange={(e) => setFilters({ supplier: e.target.value })}
                            value={filters.supplier}
                        >
                            {allSuppliers.map(sup => <option key={sup._id} value={sup.name}>{sup.name}</option>)} 
                        </select>
                    </div>
                </div>
            </div>
        </aside>
    );
};
