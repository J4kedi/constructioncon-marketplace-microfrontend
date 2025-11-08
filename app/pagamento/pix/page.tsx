'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PixPage() {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [processando, setProcessando] = useState(false);
  const router = useRouter();

  const gerarQrCode = () => {
    setQrCode("00020126580014BR.GOV.BCB.PIX0136pix-chave-exemplo...");
  };

  const confirmarPagamento = () => {
    setProcessando(true);
    // Simula processamento do pagamento
    setTimeout(() => {
      router.push("/"); // volta para página inicial
    }, 1500);
  };

  return (
    <div className="p-6 bg-[var(--color-background)] text-[var(--color-text)] min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Pagamento via Pix</h1>

      <button
        onClick={gerarQrCode}
        className="bg-[var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[var(--color-secondary)]"
      >
        Gerar QR Code
      </button>

      {qrCode && (
        <div className="mt-6 bg-[var(--color-success)]/20 p-6 rounded-lg shadow-md border border-[var(--color-success)]">
          <p className="mb-2 font-semibold text-[var(--color-success)]">
            Escaneie o QR Code abaixo:
          </p>
          <pre className="bg-[var(--color-background)] text-[var(--color-text)] p-4 rounded break-all">
            {qrCode}
          </pre>

          <div className="mt-4 text-center">
            <button
              onClick={confirmarPagamento}
              disabled={processando}
              className="bg-[var(--color-success)] text-white px-6 py-3 rounded hover:bg-green-700 disabled:opacity-60"
            >
              {processando ? "Finalizando..." : "Já paguei — finalizar compra"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
