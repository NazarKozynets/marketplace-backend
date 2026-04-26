import { Module } from '@nestjs/common';
import { PrismaSellerRepository } from '../../infrastructure/repositories/prisma-seller.repository';
import { PrismaUserRepository } from '../../infrastructure/repositories/prisma-user.repository';
import { SELLER_REPOSITORY, USER_REPOSITORY } from '../../infrastructure/repositories/repository.tokens';
import { SellersController } from './sellers.controller';
import { SellersService } from './sellers.service';

@Module({
  controllers: [SellersController],
  providers: [
    SellersService,
    { provide: SELLER_REPOSITORY, useClass: PrismaSellerRepository },
    { provide: USER_REPOSITORY, useClass: PrismaUserRepository },
  ],
})
export class SellersModule {}

