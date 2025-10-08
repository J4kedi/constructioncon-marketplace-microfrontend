'use client';

import { Search } from 'lucide-react';

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

export const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps) => {
    return (
        <div className="relative mt-6">
            <input 
                type="text" 
                placeholder="Pesquisar por item ou fornecedor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-background border border-accent/50 focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text/50">
                <Search />
            </div>
        </div>
    );
};