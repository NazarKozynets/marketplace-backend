import { Injectable } from '@nestjs/common';
import {
  CollectionRepository,
  CollectionSummary,
  CreateCollectionParams,
} from '../../domain/repositories/collection.repository';
import { PrismaService } from '../prisma/prisma.service';

const select = {
  id: true,
  title: true,
  slug: true,
  description: true,
  coverImage: true,
  isFeatured: true,
  createdAt: true,
} as const;

@Injectable()
export class PrismaCollectionRepository implements CollectionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<CollectionSummary | null> {
    return this.prisma.collection.findUnique({ where: { id }, select }) ?? null;
  }

  async findAll(limit: number, offset: number): Promise<CollectionSummary[]> {
    return this.prisma.collection.findMany({
      select,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });
  }

  async findFeatured(): Promise<CollectionSummary[]> {
    return this.prisma.collection.findMany({
      where: { isFeatured: true },
      select,
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(params: CreateCollectionParams): Promise<{ id: string }> {
    const collection = await this.prisma.collection.create({
      data: {
        title: params.title,
        slug: params.slug,
        description: params.description,
        coverImage: params.coverImage,
        isFeatured: params.isFeatured ?? false,
        items: params.productIds?.length
          ? {
              create: params.productIds.map((productId, i) => ({ productId, sortOrder: i })),
            }
          : undefined,
      },
      select: { id: true },
    });
    return { id: collection.id };
  }

  async addProduct(collectionId: string, productId: string, sortOrder = 0): Promise<void> {
    await this.prisma.collectionItem.upsert({
      where: { collectionId_productId: { collectionId, productId } },
      create: { collectionId, productId, sortOrder },
      update: { sortOrder },
    });
  }

  async removeProduct(collectionId: string, productId: string): Promise<void> {
    await this.prisma.collectionItem.delete({
      where: { collectionId_productId: { collectionId, productId } },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.collection.delete({ where: { id } });
  }
}
