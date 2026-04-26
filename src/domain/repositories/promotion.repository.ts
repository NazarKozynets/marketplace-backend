import { PromotionStatus } from '@prisma/client';

export interface CreatePromotionParams {
  productId: string;
  shopId: string;
  priority?: number;
  startsAt: Date;
  endsAt: Date;
}

export interface PromotionSummary {
  id: string;
  productId: string;
  shopId: string;
  status: PromotionStatus;
  priority: number;
  startsAt: Date;
  endsAt: Date;
}

export interface PromotionRepository {
  findActiveByShop(shopId: string): Promise<PromotionSummary[]>;
  create(params: CreatePromotionParams): Promise<{ id: string }>;
  pause(id: string): Promise<void>;
  finish(id: string): Promise<void>;
}
