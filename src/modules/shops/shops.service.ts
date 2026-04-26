import { BadRequestException, ConflictException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Role } from '../../domain/entities/role';
import type { SellerRepository } from '../../domain/repositories/seller.repository';
import type { CreateShopParams, ShopRepository } from '../../domain/repositories/shop.repository';
import { SELLER_REPOSITORY, SHOP_REPOSITORY } from '../../infrastructure/repositories/repository.tokens';

@Injectable()
export class ShopsService {
  constructor(
    @Inject(SHOP_REPOSITORY) private readonly shops: ShopRepository,
    @Inject(SELLER_REPOSITORY) private readonly sellers: SellerRepository,
  ) {}

  async createShop(userId: string, role: Role, params: Omit<CreateShopParams, 'ownerId'>) {
    if (role !== Role.SELLER && role !== Role.ADMIN) {
      throw new ForbiddenException('Only sellers can create shops');
    }

    const seller = await this.sellers.findByUserId(userId);
    if (!seller) throw new BadRequestException('Seller profile not found');
    if (seller.status !== 'APPROVED' && role !== Role.ADMIN) {
      throw new ForbiddenException('Seller not approved');
    }

    const existing = await this.shops.findBySlug(params.slug);
    if (existing) throw new ConflictException('Slug already taken');

    return this.shops.create({ ...params, ownerId: seller.id });
  }

  async getShopBySlug(slug: string) {
    return this.shops.findBySlug(slug);
  }
}
