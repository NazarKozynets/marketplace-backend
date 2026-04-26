import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '../../domain/entities/role';
import type { ProductRepository } from '../../domain/repositories/product.repository';
import type { SellerRepository } from '../../domain/repositories/seller.repository';
import type { ShopRepository } from '../../domain/repositories/shop.repository';
import {
  PRODUCT_REPOSITORY,
  SELLER_REPOSITORY,
  SHOP_REPOSITORY,
} from '../../infrastructure/repositories/repository.tokens';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private readonly products: ProductRepository,
    @Inject(SHOP_REPOSITORY) private readonly shops: ShopRepository,
    @Inject(SELLER_REPOSITORY) private readonly sellers: SellerRepository,
  ) {}

  async createProduct(userId: string, role: Role, shopId: string, dto: {
    title: string;
    description: string;
    price: string;
    brand: string;
    category: string;
    attributes?: Record<string, unknown>;
  }) {
    if (role !== Role.SELLER && role !== Role.ADMIN) throw new ForbiddenException();

    const shop = await this.shops.findById(shopId);
    if (!shop) throw new NotFoundException('Shop not found');

    const seller = await this.sellers.findByUserId(userId);
    if (!seller && role !== Role.ADMIN) throw new ForbiddenException();

    if (role !== Role.ADMIN && seller!.id !== shop.ownerId) {
      throw new ForbiddenException('You do not own this shop');
    }

    return this.products.create({ ...dto, shopId });
  }
}

