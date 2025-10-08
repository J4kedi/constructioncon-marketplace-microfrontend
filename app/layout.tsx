import { inter } from "./fonts";
import "./globals.css";
import { Providers } from "@/app/providers";
import { CartProvider } from "./context/CartContext";
import Header from "./ui/components/Header";
import Footer from "./ui/components/Footer";

export const metadata = {
  title: "Marketplace - ConstructionCon",
  description: "Aqui você compra tudo relacionado a obra e se conecta com milhares de fornecedores de todo o Brasil!!",
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