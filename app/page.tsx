import { ThemeSwitcher } from "@/app/components/ThemeSwitcher";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-col h-screen w-full items-center justify-center bg-background">
      <div className="absolute inset-0 w-full h-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="absolute top-4 right-4">
        <ThemeSwitcher />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-text to-text/70 pb-4">
          Marketplace ConstructionCon
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl">
          A solução completa para encontrar os melhores materiais e fornecedores para a sua obra, tudo em um só lugar.
        </p>
        <Link href="/products" className="mt-8">
          <span className="inline-block bg-primary text-primary-foreground font-bold text-lg py-3 px-8 rounded-lg shadow-lg hover:bg-primary/90 transition-transform duration-200 ease-in-out hover:scale-105">
            Explorar Catálogo
          </span>
        </Link>
      </main>
    </div>
  );
}
