import { Module } from '@nestjs/common';
import { PrismaOrderRepository } from '../../infrastructure/repositories/prisma-order.repository';
import { PrismaProductRepository } from '../../infrastructure/repositories/prisma-product.repository';
import { ORDER_REPOSITORY, PRODUCT_REPOSITORY } from '../../infrastructure/repositories/repository.tokens';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    { provide: ORDER_REPOSITORY, useClass: PrismaOrderRepository },
    { provide: PRODUCT_REPOSITORY, useClass: PrismaProductRepository },
  ],
})
export class OrdersModule {}

