
export type Supplier = {
    _id: string;
    name: string;
};

export type Product = {
    _id: string;
    name: string;
    description?: string;
    unit: string;
    unitPrice: number;
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
