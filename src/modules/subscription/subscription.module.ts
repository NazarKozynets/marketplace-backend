import { Module } from '@nestjs/common';
import { PrismaPromotionRepository } from '../../infrastructure/repositories/prisma-promotion.repository';
import { PrismaSellerRepository } from '../../infrastructure/repositories/prisma-seller.repository';
import { PrismaShopRepository } from '../../infrastructure/repositories/prisma-shop.repository';
import { PrismaSubscriptionRepository } from '../../infrastructure/repositories/prisma-subscription.repository';
import {
  PROMOTION_REPOSITORY,
  SELLER_REPOSITORY,
  SHOP_REPOSITORY,
  SUBSCRIPTION_REPOSITORY,
} from '../../infrastructure/repositories/repository.tokens';
import { SubscriptionController, PromotionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';

@Module({
  controllers: [SubscriptionController, PromotionController],
  providers: [
    SubscriptionService,
    { provide: SUBSCRIPTION_REPOSITORY, useClass: PrismaSubscriptionRepository },
    { provide: PROMOTION_REPOSITORY, useClass: PrismaPromotionRepository },
    { provide: SELLER_REPOSITORY, useClass: PrismaSellerRepository },
    { provide: SHOP_REPOSITORY, useClass: PrismaShopRepository },
  ],
})
export class SubscriptionModule {}
