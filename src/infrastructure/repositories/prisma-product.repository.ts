import { Injectable } from '@nestjs/common';
import { Prisma, ProductStatus } from '@prisma/client';
import {
  CreateProductParams,
  ProductRepository,
  ProductSummary,
  UpdateProductParams,
} from '../../domain/repositories/product.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const p = await this.prisma.product.findUnique({
      where: { id },
      select: { id: true, shortId: true, shopId: true, title: true, price: true, status: true },
    });
    if (!p) return null;
    return { id: p.id, shortId: p.shortId, shopId: p.shopId, title: p.title, price: p.price.toString(), status: p.status };
  }

  async findByShopId(shopId: string): Promise<ProductSummary[]> {
    const products = await this.prisma.product.findMany({
      where: { shopId },
      select: { id: true, shortId: true, shopId: true, title: true, price: true, status: true },
      orderBy: { createdAt: 'desc' },
    });
    return products.map((p) => ({
      id: p.id,
      shortId: p.shortId,
      shopId: p.shopId,
      title: p.title,
      price: p.price.toString(),
      status: p.status,
    }));
  }

  async create(params: CreateProductParams): Promise<{ id: string; shortId: string }> {
    const product = await this.prisma.product.create({
      data: {
        title: params.title,
        description: params.description,
        price: new Prisma.Decimal(params.price),
        brand: params.brand,
        category: params.category,
        style: params.style,
        condition: params.condition,
        status: params.status ?? 'DRAFT',
        tags: params.tags ?? [],
        attributes: (params.attributes ?? {}) as Prisma.InputJsonValue,
        shopId: params.shopId,
        variants: params.variants?.length
          ? {
              create: params.variants.map((v) => ({
                size: v.size,
                color: v.color,
                stock: v.stock ?? 1,
                price: v.price != null ? new Prisma.Decimal(v.price) : undefined,
              })),
            }
          : undefined,
        images: params.images?.length
          ? {
              create: params.images.map((img) => ({
                url: img.url,
                alt: img.alt,
                sortOrder: img.sortOrder ?? 0,
              })),
            }
          : undefined,
      },
      select: { id: true, shortId: true },
    });
    return { id: product.id, shortId: product.shortId };
  }

  async update(id: string, params: UpdateProductParams): Promise<{ id: string; shortId: string }> {
    const product = await this.prisma.product.update({
      where: { id },
      data: {
        title: params.title,
        description: params.description,
        price: params.price != null ? new Prisma.Decimal(params.price) : undefined,
        brand: params.brand,
        category: params.category,
        style: params.style,
        condition: params.condition,
        status: params.status,
        tags: params.tags,
        attributes: params.attributes != null ? (params.attributes as Prisma.InputJsonValue) : undefined,
      },
      select: { id: true, shortId: true },
    });
    return { id: product.id, shortId: product.shortId };
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }
}
