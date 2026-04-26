import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateOrderParams, OrderRepository } from '../../domain/repositories/order.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(params: CreateOrderParams): Promise<{ id: string }> {
    const order = await this.prisma.order.create({
      data: {
        userId: params.userId,
        status: params.status ?? 'PENDING',
        totalPrice: new Prisma.Decimal(params.totalPrice),
        items: {
          create: params.items.map((it) => ({
            productId: it.productId,
            variantId: it.variantId ?? null,
            quantity: it.quantity,
            price: new Prisma.Decimal(it.price),
          })),
        },
      },
      select: { id: true },
    });
    return { id: order.id };
  }
}
