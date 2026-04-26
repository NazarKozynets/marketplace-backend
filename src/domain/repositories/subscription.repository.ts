import { SubscriptionPlan, SubscriptionStatus } from '@prisma/client';

export interface CreateSubscriptionParams {
  sellerId: string;
  plan: SubscriptionPlan;
  endsAt?: Date;
}

export interface SubscriptionSummary {
  id: string;
  sellerId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startsAt: Date;
  endsAt: Date | null;
}

export interface SubscriptionRepository {
  findActive(sellerId: string): Promise<SubscriptionSummary | null>;
  findAll(sellerId: string): Promise<SubscriptionSummary[]>;
  create(params: CreateSubscriptionParams): Promise<{ id: string }>;
  cancel(id: string): Promise<void>;
}
