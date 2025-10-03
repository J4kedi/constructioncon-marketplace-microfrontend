
'use client'

import { useCart } from "@/app/context/CartContext";
import { OrderRequestDTO } from "@/lib/types";

async function createOrder(orderData: OrderRequestDTO) {
    const response = await fetch(`/proxy/orders/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create order');
    }

    return response.json();
}

export default function CartPage() {
    const { state, dispatch } = useCart();

    const handleCheckout = async () => {
        if (state.items.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }

        const orderData = {
            customerId: "customer-123",
            items: state.items.map(item => ({
                productId: item._id,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
            })),
        };

        try {
            await createOrder(orderData);
            alert("Pedido criado com sucesso!");
            dispatch({ type: 'CLEAR_CART' });
        } catch (error: unknown) {
            console.error(error);
            let errorMessage = 'An unknown error occurred';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            alert(`Erro ao criar pedido: ${errorMessage}`);
        }
    };

    const total = state.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Seu Carrinho</h1>
            {state.items.length === 0 ? (
                <p>O carrinho está vazio.</p>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {state.items.map(item => (
                        <div key={item._id} className="flex items-center justify-between border rounded-lg p-4 bg-card">
                            <div>
                                <h2 className="text-xl font-semibold">{item.name}</h2>
                                <p className="text-muted-foreground">Quantidade: {item.quantity}</p>
                            </div>
                            <p className="text-lg font-bold">R$ {(item.unitPrice * item.quantity).toFixed(2)}</p>
                            <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: { id: item._id } })} className="text-red-500 hover:text-red-700">Remover</button>
                        </div>
                    ))}
                    <div className="mt-8 text-right">
                        <h2 className="text-2xl font-bold">Total: R$ {total.toFixed(2)}</h2>
                        <button onClick={handleCheckout} className="mt-4 bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-primary/90 transition-colors">
                            Finalizar Pedido
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
