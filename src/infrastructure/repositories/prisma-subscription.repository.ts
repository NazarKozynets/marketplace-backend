import { Injectable } from '@nestjs/common';
import {
  CreateSubscriptionParams,
  SubscriptionRepository,
  SubscriptionSummary,
} from '../../domain/repositories/subscription.repository';
import { PrismaService } from '../prisma/prisma.service';

const select = {
  id: true,
  sellerId: true,
  plan: true,
  status: true,
  startsAt: true,
  endsAt: true,
} as const;

@Injectable()
export class PrismaSubscriptionRepository implements SubscriptionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findActive(sellerId: string): Promise<SubscriptionSummary | null> {
    return (
      (await this.prisma.sellerSubscription.findFirst({
        where: { sellerId, status: 'ACTIVE' },
        select,
        orderBy: { startsAt: 'desc' },
      })) ?? null
    );
  }

  async findAll(sellerId: string): Promise<SubscriptionSummary[]> {
    return this.prisma.sellerSubscription.findMany({
      where: { sellerId },
      select,
      orderBy: { startsAt: 'desc' },
    });
  }

  async create(params: CreateSubscriptionParams): Promise<{ id: string }> {
    const sub = await this.prisma.sellerSubscription.create({
      data: {
        sellerId: params.sellerId,
        plan: params.plan,
        endsAt: params.endsAt,
      },
      select: { id: true },
    });
    return { id: sub.id };
  }

  async cancel(id: string): Promise<void> {
    await this.prisma.sellerSubscription.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });
  }
}
