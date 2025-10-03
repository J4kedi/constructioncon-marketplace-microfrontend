import { ThemeSwitcher } from "@/app/components/ThemeSwitcher";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="absolute top-4 right-4">
        <ThemeSwitcher />
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Marketplace Frontend</h1>
        <p className="text-lg text-muted-foreground mb-8">A interface para o nosso ecossistema de microserviços.</p>
        <Link href="/products">
          <span className="inline-block bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-primary/90 transition-colors">
            Ver Catálogo de Produtos
          </span>
        </Link>
      </div>
    </main>
  );
}