import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateProductParams, ProductRepository } from '../../domain/repositories/product.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) return null;
    return { id: product.id, shopId: product.shopId };
  }

  async create(params: CreateProductParams) {
    const product = await this.prisma.product.create({
      data: {
        title: params.title,
        description: params.description,
        price: new Prisma.Decimal(params.price),
        brand: params.brand,
        category: params.category,
        attributes: (params.attributes ?? {}) as Prisma.InputJsonValue,
        shopId: params.shopId,
      },
      select: { id: true },
    });
    return { id: product.id };
  }
}

