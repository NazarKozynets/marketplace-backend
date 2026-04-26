import { Injectable } from '@nestjs/common';
import { CreateOutfitParams, OutfitRepository, OutfitSummary } from '../../domain/repositories/outfit.repository';
import { PrismaService } from '../prisma/prisma.service';

const select = {
  id: true,
  title: true,
  description: true,
  coverImage: true,
  shopId: true,
  createdAt: true,
} as const;

@Injectable()
export class PrismaOutfitRepository implements OutfitRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<OutfitSummary | null> {
    return this.prisma.outfit.findUnique({ where: { id }, select }) ?? null;
  }

  async findByShop(shopId: string, limit: number, offset: number): Promise<OutfitSummary[]> {
    return this.prisma.outfit.findMany({
      where: { shopId },
      select,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });
  }

  async findAll(limit: number, offset: number): Promise<OutfitSummary[]> {
    return this.prisma.outfit.findMany({
      select,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });
  }

  async create(params: CreateOutfitParams): Promise<{ id: string }> {
    const outfit = await this.prisma.outfit.create({
      data: {
        title: params.title,
        description: params.description,
        coverImage: params.coverImage,
        shopId: params.shopId,
        items: params.items?.length
          ? {
              create: params.items.map((item) => ({
                productId: item.productId,
                position: item.position,
                sortOrder: item.sortOrder ?? 0,
              })),
            }
          : undefined,
      },
      select: { id: true },
    });
    return { id: outfit.id };
  }

  async delete(id: string): Promise<void> {
    await this.prisma.outfit.delete({ where: { id } });
  }
}
