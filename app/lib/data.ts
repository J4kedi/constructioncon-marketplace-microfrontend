import { BFF_PROXY_URL } from '@/lib/constants';
import type { Product, Supplier } from '@/lib/types';
import { unstable_noStore as noStore } from 'next/cache';
import { mockProducts } from './mockProducts';

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        console.error('API Error:', errorData);
        throw new Error(`An error occurred: ${errorData.message || 'Unknown error'}`);
    }
    return response.json();
};

const apiFetch = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    noStore();
    const url = `${BFF_PROXY_URL}${endpoint}`;
    console.log(`Fetching data from: ${url}`);
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            next: { revalidate: 3600 }
        });
        return await handleResponse(response);
    } catch (error) {
        console.error(`Fetch failed for ${url}:`, error);
        throw new Error(`Network error or API fetch failed for ${endpoint}.`);
    }
};

export const getProducts = async (): Promise<Product[]> => {
    // Simulating API call for all products
    return Promise.resolve(mockProducts);
};

export const getProductById = async (id: string): Promise<Product> => {
    // Simulating API call for a single product
    const product = mockProducts.find(p => p._id === id);
    if (!product) {
        throw new Error('Product not found');
    }
    return Promise.resolve(product);
};

export const getSuppliers = async (): Promise<Supplier[]> => {
    // Simulating API call for suppliers
    const suppliers = [...new Set(mockProducts.map(p => p.supplier.name))].map((name, index) => ({
        _id: `${index + 1}`,
        name: name,
    }));
    return Promise.resolve(suppliers);
};