import { Injectable } from '@nestjs/common';
import { CreateShopParams, ShopRepository, ShopSummary } from '../../domain/repositories/shop.repository';
import { PrismaService } from '../prisma/prisma.service';

const toSummary = (shop: {
  id: string;
  shortId: string;
  name: string;
  slug: string;
  description: string | null;
  logoUrl: string | null;
  ownerId: string;
}): ShopSummary => ({
  id: shop.id,
  shortId: shop.shortId,
  name: shop.name,
  slug: shop.slug,
  description: shop.description,
  logoUrl: shop.logoUrl,
  ownerId: shop.ownerId,
});

const select = { id: true, shortId: true, name: true, slug: true, description: true, logoUrl: true, ownerId: true } as const;

@Injectable()
export class PrismaShopRepository implements ShopRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const shop = await this.prisma.shop.findUnique({ where: { id }, select });
    return shop ? toSummary(shop) : null;
  }

  async findBySlug(slug: string) {
    const shop = await this.prisma.shop.findUnique({ where: { slug }, select });
    return shop ? toSummary(shop) : null;
  }

  async create(params: CreateShopParams): Promise<ShopSummary> {
    const shop = await this.prisma.shop.create({
      data: {
        name: params.name,
        slug: params.slug,
        description: params.description,
        logoUrl: params.logoUrl,
        bannerUrl: params.bannerUrl,
        instagram: params.instagram,
        telegram: params.telegram,
        ownerId: params.ownerId,
      },
      select,
    });
    return toSummary(shop);
  }
}
