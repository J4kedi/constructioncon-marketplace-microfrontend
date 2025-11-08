'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PixConfirmacaoPage() {
  const router = useRouter();
  const [processando, setProcessando] = useState(false);

  const jaPaguei = async () => {
    // Aqui você poderia consultar sua API para verificar o status do pagamento (webhook/confirmacao)
    setProcessando(true);
    // Simulação rápida de processamento
    setTimeout(() => {
      router.push('/'); // Volta para a página inicial
    }, 1200);
  };

  return (
    <div className="p-6 bg-[var(--color-background)] text-[var(--color-text)] min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Confirmar pagamento Pix</h1>
      <div className="bg-[var(--color-accent)]/20 p-6 rounded-lg border border-[var(--color-accent)]">
        <p className="mb-3">
          Abra seu app bancário, cole o código Pix que você copiou e conclua o pagamento.
        </p>
        <p className="text-sm opacity-80">
          Depois de pagar, clique no botão abaixo para finalizar a compra e voltar à página inicial.
        </p>

        <button
          onClick={jaPaguei}
          disabled={processando}
          className="mt-4 bg-[var(--color-success)] text-white px-6 py-3 rounded hover:bg-green-700 disabled:opacity-60"
        >
          {processando ? 'Finalizando...' : 'Já paguei — finalizar compra'}
        </button>
      </div>
    </div>
  );
}