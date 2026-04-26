import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import type { OrderRepository } from '../../domain/repositories/order.repository';
import type { ProductRepository } from '../../domain/repositories/product.repository';
import { ORDER_REPOSITORY, PRODUCT_REPOSITORY } from '../../infrastructure/repositories/repository.tokens';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orders: OrderRepository,
    @Inject(PRODUCT_REPOSITORY) private readonly products: ProductRepository,
  ) {}

  async createOrder(userId: string, items: { productId: string; quantity: number }[]) {
    if (!items || items.length === 0) throw new BadRequestException('No items');

    // MVP: price is not derived (needs Product.price + stock checks later).
    // We keep structure ready; for now store 0.00 and require follow-up implementation.
    const detailedItems = await Promise.all(
      items.map(async (it) => {
        const p = await this.products.findById(it.productId);
        if (!p) throw new BadRequestException(`Invalid productId: ${it.productId}`);
        return { productId: it.productId, quantity: it.quantity, price: '0.00' };
      }),
    );

    const totalPrice = '0.00';
    return this.orders.create({ userId, items: detailedItems, totalPrice });
  }
}

