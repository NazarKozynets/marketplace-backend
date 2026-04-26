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
import type { CreateProductDto } from '../../application/dto/products/create-product.dto';
import type { UpdateProductDto } from '../../application/dto/products/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private readonly products: ProductRepository,
    @Inject(SHOP_REPOSITORY) private readonly shops: ShopRepository,
    @Inject(SELLER_REPOSITORY) private readonly sellers: SellerRepository,
  ) {}

  private async assertShopOwner(userId: string, role: Role, shopId: string) {
    const shop = await this.shops.findById(shopId);
    if (!shop) throw new NotFoundException('Shop not found');

    if (role !== Role.ADMIN) {
      const seller = await this.sellers.findByUserId(userId);
      if (!seller) throw new ForbiddenException();
      if (seller.id !== shop.ownerId) throw new ForbiddenException('You do not own this shop');
    }

    return shop;
  }

  async createProduct(userId: string, role: Role, shopId: string, dto: CreateProductDto) {
    if (role !== Role.SELLER && role !== Role.ADMIN) throw new ForbiddenException();
    await this.assertShopOwner(userId, role, shopId);
    return this.products.create({ ...dto, shopId });
  }

  async updateProduct(userId: string, role: Role, shopId: string, productId: string, dto: UpdateProductDto) {
    if (role !== Role.SELLER && role !== Role.ADMIN) throw new ForbiddenException();
    await this.assertShopOwner(userId, role, shopId);

    const product = await this.products.findById(productId);
    if (!product || product.shopId !== shopId) throw new NotFoundException('Product not found');

    return this.products.update(productId, dto);
  }

  async deleteProduct(userId: string, role: Role, shopId: string, productId: string) {
    if (role !== Role.SELLER && role !== Role.ADMIN) throw new ForbiddenException();
    await this.assertShopOwner(userId, role, shopId);

    const product = await this.products.findById(productId);
    if (!product || product.shopId !== shopId) throw new NotFoundException('Product not found');

    await this.products.delete(productId);
    return { ok: true };
  }

  async getProduct(productId: string) {
    const product = await this.products.findById(productId);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async getShopProducts(shopId: string) {
    const shop = await this.shops.findById(shopId);
    if (!shop) throw new NotFoundException('Shop not found');
    return this.products.findByShopId(shopId);
  }
}
