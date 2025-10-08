'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';
import { CartProvider } from '@/app/context/CartContext';

interface ProvidersProps extends ThemeProviderProps {
  children: React.ReactNode;
}

export function Providers({ children, ...themeProps }: ProvidersProps) {
  return (
    <NextThemesProvider {...themeProps}>
      <CartProvider>{children}</CartProvider>
    </NextThemesProvider>
  );
}
