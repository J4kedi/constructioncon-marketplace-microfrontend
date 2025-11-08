'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PagamentoPage() {
  const [metodo, setMetodo] = useState<string | null>(null);
  const router = useRouter();

  const handlePagamento = () => {
    if (!metodo) {
      alert("Selecione um método de pagamento!");
      return;
    }

    // Redireciona para a página específica
    if (metodo === "Pix") router.push("/pagamento/pix");
    if (metodo === "Cartão") router.push("/pagamento/cartao");
    if (metodo === "Boleto") router.push("/pagamento/boleto");
  };

  const baseButton =
    "w-full py-3 px-6 rounded-lg border transition-colors shadow-sm";

  return (
    <div className="p-6 bg-[var(--color-background)] text-[var(--color-text)] min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Pagamento</h1>

      <div className="space-y-4 mb-6 max-w-md mx-auto">
        <button
          onClick={() => setMetodo("Pix")}
          className={`${baseButton} ${
            metodo === "Pix"
              ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
              : "bg-[var(--color-accent)] text-[var(--color-text)] hover:bg-[var(--color-secondary)] hover:text-white"
          }`}
        >
          Pix
        </button>

        <button
          onClick={() => setMetodo("Cartão")}
          className={`${baseButton} ${
            metodo === "Cartão"
              ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
              : "bg-[var(--color-accent)] text-[var(--color-text)] hover:bg-[var(--color-secondary)] hover:text-white"
          }`}
        >
          Cartão de Crédito/Débito
        </button>

        <button
          onClick={() => setMetodo("Boleto")}
          className={`${baseButton} ${
            metodo === "Boleto"
              ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
              : "bg-[var(--color-accent)] text-[var(--color-text)] hover:bg-[var(--color-secondary)] hover:text-white"
          }`}
        >
          Boleto Bancário
        </button>
      </div>

      <div className="text-center">
        <button
          onClick={handlePagamento}
          className="bg-[var(--color-success)] text-white px-6 py-3 rounded-lg hover:bg-green-700 shadow-md"
        >
          Confirmar Pagamento
        </button>
      </div>
    </div>
  );
}