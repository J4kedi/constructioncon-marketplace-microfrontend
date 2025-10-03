'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'

import { CartProvider } from '@/app/context/CartContext';

interface ProvidersProps extends ThemeProviderProps {
  features: string[];
  children: React.ReactNode;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <CartProvider>{children}</CartProvider>
    </NextThemesProvider>
  );
}
