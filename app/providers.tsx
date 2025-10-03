
'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes/dist/types'

import { CartProvider } from '@/app/context/CartContext';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <CartProvider>{children}</CartProvider>
    </NextThemesProvider>
  );
}
