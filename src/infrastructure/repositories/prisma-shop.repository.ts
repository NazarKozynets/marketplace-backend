import { Injectable } from '@nestjs/common';
import { CreateShopParams, ShopRepository } from '../../domain/repositories/shop.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaShopRepository implements ShopRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const shop = await this.prisma.shop.findUnique({ where: { id } });
    if (!shop) return null;
    return { id: shop.id, name: shop.name, description: shop.description, ownerId: shop.ownerId };
  }

  async create(params: CreateShopParams) {
    const shop = await this.prisma.shop.create({
      data: {
        name: params.name,
        description: params.description,
        ownerId: params.ownerId,
      },
    });
    return { id: shop.id, name: shop.name, description: shop.description, ownerId: shop.ownerId };
  }
}

