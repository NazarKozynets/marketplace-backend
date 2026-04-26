import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '../../domain/entities/role';
import type { SellerRepository } from '../../domain/repositories/seller.repository';
import type { ShopRepository } from '../../domain/repositories/shop.repository';
import type { SubscriptionRepository } from '../../domain/repositories/subscription.repository';
import type { PromotionRepository } from '../../domain/repositories/promotion.repository';
import {
  SELLER_REPOSITORY,
  SHOP_REPOSITORY,
  SUBSCRIPTION_REPOSITORY,
  PROMOTION_REPOSITORY,
} from '../../infrastructure/repositories/repository.tokens';
import type { CreateSubscriptionDto } from '../../application/dto/sellers/create-subscription.dto';
import type { CreatePromotionDto } from '../../application/dto/sellers/create-promotion.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @Inject(SUBSCRIPTION_REPOSITORY) private readonly subscriptions: SubscriptionRepository,
    @Inject(PROMOTION_REPOSITORY) private readonly promotions: PromotionRepository,
    @Inject(SELLER_REPOSITORY) private readonly sellers: SellerRepository,
    @Inject(SHOP_REPOSITORY) private readonly shops: ShopRepository,
  ) {}

  // ── Subscriptions ────────────────────────────────────────────────────────

  async getMySubscriptions(userId: string) {
    const seller = await this.sellers.findByUserId(userId);
    if (!seller) throw new NotFoundException('Seller profile not found');
    return this.subscriptions.findAll(seller.id);
  }

  async getActiveSubscription(userId: string) {
    const seller = await this.sellers.findByUserId(userId);
    if (!seller) throw new NotFoundException('Seller profile not found');
    return this.subscriptions.findActive(seller.id);
  }

  async subscribe(userId: string, dto: CreateSubscriptionDto) {
    const seller = await this.sellers.findByUserId(userId);
    if (!seller) throw new NotFoundException('Seller profile not found');

    const active = await this.subscriptions.findActive(seller.id);
    if (active && active.plan === dto.plan) {
      throw new BadRequestException('Already subscribed to this plan');
    }

    return this.subscriptions.create({
      sellerId: seller.id,
      plan: dto.plan,
      endsAt: dto.endsAt ? new Date(dto.endsAt) : undefined,
    });
  }

  async cancelSubscription(userId: string, subscriptionId: string) {
    const seller = await this.sellers.findByUserId(userId);
    if (!seller) throw new NotFoundException('Seller profile not found');

    const all = await this.subscriptions.findAll(seller.id);
    const sub = all.find((s) => s.id === subscriptionId);
    if (!sub) throw new NotFoundException('Subscription not found');

    await this.subscriptions.cancel(subscriptionId);
    return { ok: true };
  }

  // ── Promotions ───────────────────────────────────────────────────────────

  async getShopPromotions(userId: string, role: Role, shopId: string) {
    await this.assertShopOwner(userId, role, shopId);
    return this.promotions.findActiveByShop(shopId);
  }

  async createPromotion(userId: string, role: Role, shopId: string, dto: CreatePromotionDto) {
    await this.assertShopOwner(userId, role, shopId);

    const startsAt = new Date(dto.startsAt);
    const endsAt = new Date(dto.endsAt);
    if (endsAt <= startsAt) throw new BadRequestException('endsAt must be after startsAt');

    return this.promotions.create({
      productId: dto.productId,
      shopId,
      priority: dto.priority,
      startsAt,
      endsAt,
    });
  }

  async pausePromotion(userId: string, role: Role, shopId: string, promotionId: string) {
    await this.assertShopOwner(userId, role, shopId);
    await this.promotions.pause(promotionId);
    return { ok: true };
  }

  async finishPromotion(userId: string, role: Role, shopId: string, promotionId: string) {
    await this.assertShopOwner(userId, role, shopId);
    await this.promotions.finish(promotionId);
    return { ok: true };
  }

  private async assertShopOwner(userId: string, role: Role, shopId: string) {
    const shop = await this.shops.findById(shopId);
    if (!shop) throw new NotFoundException('Shop not found');

    if (role !== Role.ADMIN) {
      const seller = await this.sellers.findByUserId(userId);
      if (!seller || seller.id !== shop.ownerId) throw new ForbiddenException();
    }
  }
}
