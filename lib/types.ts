
export type Supplier = {
    _id: string;
    name: string;
};

export type Product = {
    id: string;
    _id: string;
    name: string;
    description?: string;
    category: string;
    imageUrl?: string;
    unit: string;
    unitPrice: number;
    price: number;
    supplier: Supplier;
    createdAt: string;
    updatedAt: string;
};

export type OrderItemDTO = {
    productId: string;
    quantity: number;
    unitPrice: number;
};

export type OrderRequestDTO = {
    customerId: string;
    items: OrderItemDTO[];
};
