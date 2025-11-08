'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CartaoPage() {
  const [dados, setDados] = useState({
    tipo: "credito",
    numero: "",
    validade: "",
    cvv: "",
    nome: "",
  });
  const [processando, setProcessando] = useState(false);
  const [aprovado, setAprovado] = useState<boolean | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação: todos os campos obrigatórios
    if (!dados.numero || !dados.validade || !dados.cvv || !dados.nome) {
      setErro("Por favor, preencha todos os campos do cartão.");
      return;
    }

    setErro(null);
    setProcessando(true);

    
    setTimeout(() => {
      setAprovado(true); 
      setProcessando(false);

      if (true) {
        setTimeout(() => {
          router.push("/"); 
        }, 2000);
      }
    }, 1500);
  };

  const inputClass =
    "w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]";

  return (
    <div className="p-6 bg-[var(--color-background)] text-[var(--color-text)] min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Pagamento com Cartão</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-md mx-auto bg-[var(--color-accent)]/10 p-6 rounded-lg shadow-md"
      >
        {/* Tipo de cartão */}
        <div>
          <label className="block mb-2 font-semibold">Tipo de cartão</label>
          <select
            value={dados.tipo}
            onChange={e => setDados({ ...dados, tipo: e.target.value })}
            className={inputClass}
          >
            <option value="credito">Crédito</option>
            <option value="debito">Débito</option>
          </select>
        </div>

        {/* Nome no cartão */}
        <div>
          <label className="block mb-2 font-semibold">Nome impresso no cartão</label>
          <input
            type="text"
            placeholder="Ex: Cauê Silva"
            value={dados.nome}
            onChange={e => setDados({ ...dados, nome: e.target.value })}
            className={inputClass}
          />
        </div>

        {/* Número do cartão */}
        <div>
          <label className="block mb-2 font-semibold">Número do cartão</label>
          <input
            type="text"
            placeholder="0000 0000 0000 0000"
            value={dados.numero}
            onChange={e => setDados({ ...dados, numero: e.target.value })}
            className={inputClass}
          />
        </div>

        {/* Validade e CVV lado a lado */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-2 font-semibold">Validade (MM/AA)</label>
            <input
              type="text"
              placeholder="12/25"
              value={dados.validade}
              onChange={e => setDados({ ...dados, validade: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="w-24">
            <label className="block mb-2 font-semibold">CVV</label>
            <input
              type="text"
              placeholder="123"
              value={dados.cvv}
              onChange={e => setDados({ ...dados, cvv: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        {/* Aviso de erro */}
        {erro && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
            {erro}
          </div>
        )}

        {/* Botão de confirmar */}
        <button
          type="submit"
          disabled={processando}
          className="w-full bg-[var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[var(--color-secondary)] disabled:opacity-60"
        >
          {processando ? "Processando..." : "Confirmar Pagamento"}
        </button>
      </form>

      {/* Feedback */}
      {aprovado === true && (
        <div className="mt-6 bg-[var(--color-success)]/20 p-4 rounded border border-[var(--color-success)] text-[var(--color-success)] font-semibold text-center">
          Pagamento aprovado! Redirecionando para página inicial...
        </div>
      )}

      {aprovado === false && (
        <div className="mt-6 bg-red-100 p-4 rounded border border-red-400 text-red-700 font-semibold text-center">
          Pagamento recusado. Verifique os dados do cartão.
        </div>
      )}
    </div>
  );
}
