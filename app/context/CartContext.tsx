
'use client'

import { createContext, useReducer, useContext, ReactNode } from 'react';
import type { Product } from '@/lib/types';

export interface CartItem extends Product {
    quantity: number;
}

type CartState = {
    items: CartItem[];
};

type CartAction = 
    | { type: 'ADD_ITEM'; payload: Product }
    | { type: 'REMOVE_ITEM'; payload: { id: string } }
    | { type: 'CLEAR_CART' };

const CartContext = createContext<{
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItem = state.items.find(item => item._id === action.payload._id);
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(item => 
                        item._id === action.payload._id 
                        ? { ...item, quantity: item.quantity + 1 } 
                        : item
                    ),
                };
            }
            return {
                ...state,
                items: [...state.items, { ...action.payload, quantity: 1 }],
            };
        }
        case 'REMOVE_ITEM': {
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload.id),
            };
        }
        case 'CLEAR_CART': {
            return { ...state, items: [] };
        }
        default:
            return state;
    }
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, { items: [] });

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
