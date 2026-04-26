import { Module } from '@nestjs/common';
import { PrismaProductRepository } from '../../infrastructure/repositories/prisma-product.repository';
import { PrismaSellerRepository } from '../../infrastructure/repositories/prisma-seller.repository';
import { PrismaShopRepository } from '../../infrastructure/repositories/prisma-shop.repository';
import {
  PRODUCT_REPOSITORY,
  SELLER_REPOSITORY,
  SHOP_REPOSITORY,
} from '../../infrastructure/repositories/repository.tokens';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    { provide: PRODUCT_REPOSITORY, useClass: PrismaProductRepository },
    { provide: SHOP_REPOSITORY, useClass: PrismaShopRepository },
    { provide: SELLER_REPOSITORY, useClass: PrismaSellerRepository },
  ],
})
export class ProductsModule {}

