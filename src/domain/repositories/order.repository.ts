export type OrderStatus = 'PENDING' | 'PAID' | 'CANCELLED';

export interface CreateOrderItemInput {
  productId: string;
  quantity: number;
}

export interface CreateOrderParams {
  userId: string;
  status?: OrderStatus;
  items: { productId: string; quantity: number; price: string }[];
  totalPrice: string;
}

export interface OrderRepository {
  create(params: CreateOrderParams): Promise<{ id: string }>;
}

