import { Module } from '@nestjs/common';
import { PrismaSellerRepository } from '../../infrastructure/repositories/prisma-seller.repository';
import { PrismaShopRepository } from '../../infrastructure/repositories/prisma-shop.repository';
import { SELLER_REPOSITORY, SHOP_REPOSITORY } from '../../infrastructure/repositories/repository.tokens';
import { ShopsController } from './shops.controller';
import { ShopsService } from './shops.service';

@Module({
  controllers: [ShopsController],
  providers: [
    ShopsService,
    { provide: SHOP_REPOSITORY, useClass: PrismaShopRepository },
    { provide: SELLER_REPOSITORY, useClass: PrismaSellerRepository },
  ],
})
export class ShopsModule {}

