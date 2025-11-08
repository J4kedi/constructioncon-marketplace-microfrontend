'use client';
import { useCart } from '@/app/context/CartContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CarrinhoPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  const total = cartItems.reduce(
    (sum, item) => sum + (item.unitPrice || 0) * item.quantity,
    0
  );

  return (
    <div className="p-6 bg-[var(--color-background)] text-[var(--color-text)]">
      <h1 className="text-2xl font-bold mb-4">Meu Carrinho</h1>

      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio</p>
      ) : (
        <ul className="space-y-4 mb-6">
          {cartItems.map(item => (
            <li
              key={item._id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div className="flex items-center space-x-4">
                <div className="relative w-20 h-20">
                  <Image
                    src={item.imageUrl || '/file.svg'}
                    alt={item.name}
                    fill
                    style={{ objectFit: 'contain' }}
                    className="rounded-md"
                  />
                </div>
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm text-[var(--color-text)]/70">
                    Quantidade: {item.quantity}
                  </p>
                  <p className="text-sm text-[var(--color-text)]/70">
                    Preço unitário: R$ {item.unitPrice.toFixed(2).replace('.', ',')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-[var(--color-destructive)] hover:underline"
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}

      {cartItems.length > 0 && (
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold">
            Total: R$ {total.toFixed(2).replace('.', ',')}
          </span>
          <div className="space-x-4">
            <button
              onClick={clearCart}
              className="bg-[var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[var(--color-secondary)]"
            >
              Limpar carrinho
            </button>
            <button
              onClick={() => router.push('/pagamento')}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Finalizar compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
