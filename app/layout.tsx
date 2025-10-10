import { inter } from "./fonts";
import "./globals.css";
import { Providers } from "@/app/providers";
import { CartProvider } from "./context/CartContext";
import Header from "./ui/components/Header";
import Footer from "./ui/components/Footer";

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Marketplace - ConstructionCon",
  description: "Aqui você compra tudo relacionado a obra e se conecta com milhares de fornecedores de todo o Brasil!!",
  icons: {
    icon: [
      { url: '/favicon_io/favicon.ico', sizes: 'any' },
      { url: '/favicon_io/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon_io/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/favicon_io/apple-touch-icon.png', type: 'image/png', sizes: '180x180' },
    ],
  },
  manifest: '/favicon_io/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-gradient-to-br from-white to-background dark:bg-gradient-to-br dark:from-secondary/15 dark:to-background`}>
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}