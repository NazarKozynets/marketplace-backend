import { Injectable } from '@nestjs/common';
import {
  CreatePromotionParams,
  PromotionRepository,
  PromotionSummary,
} from '../../domain/repositories/promotion.repository';
import { PrismaService } from '../prisma/prisma.service';

const select = {
  id: true,
  productId: true,
  shopId: true,
  status: true,
  priority: true,
  startsAt: true,
  endsAt: true,
} as const;

@Injectable()
export class PrismaPromotionRepository implements PromotionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findActiveByShop(shopId: string): Promise<PromotionSummary[]> {
    return this.prisma.productPromotion.findMany({
      where: { shopId, status: 'ACTIVE' },
      select,
      orderBy: { priority: 'desc' },
    });
  }

  async create(params: CreatePromotionParams): Promise<{ id: string }> {
    const promo = await this.prisma.productPromotion.create({
      data: {
        productId: params.productId,
        shopId: params.shopId,
        priority: params.priority ?? 1,
        startsAt: params.startsAt,
        endsAt: params.endsAt,
      },
      select: { id: true },
    });
    return { id: promo.id };
  }

  async pause(id: string): Promise<void> {
    await this.prisma.productPromotion.update({ where: { id }, data: { status: 'PAUSED' } });
  }

  async finish(id: string): Promise<void> {
    await this.prisma.productPromotion.update({ where: { id }, data: { status: 'FINISHED' } });
  }
}
