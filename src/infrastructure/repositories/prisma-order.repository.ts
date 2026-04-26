import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateOrderParams, OrderRepository } from '../../domain/repositories/order.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(params: CreateOrderParams) {
    const order = await this.prisma.order.create({
      data: {
        userId: params.userId,
        status: (params.status ?? 'PENDING') as any,
        totalPrice: new Prisma.Decimal(params.totalPrice),
        items: {
          create: params.items.map((it) => ({
            productId: it.productId,
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

