'use client';

import { useTransition } from 'react';
import FilterInput from './FilterInput';
import FilterSelect from './FilterSelect';

interface ProductFiltersProps {
  categories: string[];
  suppliers: string[];
  onFilterChange: (filters: Record<string, string>) => void;
}

export default function ProductFilters({ categories, suppliers, onFilterChange }: ProductFiltersProps) {
  const [, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    startTransition(() => {
      onFilterChange({ [name]: value });
    });
  };

  return (
    <div className="bg-background border border-secondary p-4 rounded-lg sticky top-24">
      <h3 className="text-lg font-semibold mb-4">Filtros</h3>
      <div className="space-y-4">
        <FilterSelect
          label="Categoria"
          name="category"
          onChange={handleChange}
          options={categories}
        />
        <FilterSelect
          label="Fornecedor"
          name="supplier"
          onChange={handleChange}
          options={suppliers}
        />
        <FilterInput
          label="Preço Mínimo"
          name="minPrice"
          type="number"
          min="0"
          onChange={handleChange}
          placeholder="R$ 0"
        />
        <FilterInput
          label="Preço Máximo"
          name="maxPrice"
          type="number"
          min="0"
          onChange={handleChange}
          placeholder="R$ 1000"
        />
      </div>
    </div>
  );
}