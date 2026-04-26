import { OrderStatus } from '@prisma/client';

export interface CreateOrderItemInput {
  productId: string;
  variantId?: string;
  quantity: number;
  price: string;
}

export interface CreateOrderParams {
  userId: string;
  status?: OrderStatus;
  items: CreateOrderItemInput[];
  totalPrice: string;
}

export interface OrderRepository {
  create(params: CreateOrderParams): Promise<{ id: string }>;
}
