import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateSubscriptionDto } from '../../application/dto/sellers/create-subscription.dto';
import { CreatePromotionDto } from '../../application/dto/sellers/create-promotion.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Role } from '../../domain/entities/role';
import type { JwtPayload } from '../../infrastructure/auth/jwt-payload';
import { SubscriptionService } from './subscription.service';

@ApiTags('subscriptions')
@ApiBearerAuth()
@Roles(Role.SELLER, Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('sellers/subscriptions')
export class SubscriptionController {
  constructor(private readonly subs: SubscriptionService) {}

  @Get()
  async list(@CurrentUser() user: JwtPayload) {
    return this.subs.getMySubscriptions(user.sub);
  }

  @Get('active')
  async getActive(@CurrentUser() user: JwtPayload) {
    return this.subs.getActiveSubscription(user.sub);
  }

  @Post()
  async subscribe(@CurrentUser() user: JwtPayload, @Body() dto: CreateSubscriptionDto) {
    return this.subs.subscribe(user.sub, dto);
  }

  @Delete(':subscriptionId')
  async cancel(@Param('subscriptionId') subscriptionId: string, @CurrentUser() user: JwtPayload) {
    return this.subs.cancelSubscription(user.sub, subscriptionId);
  }
}

@ApiTags('promotions')
@ApiBearerAuth()
@Roles(Role.SELLER, Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('shops/:shopId/promotions')
export class PromotionController {
  constructor(private readonly subs: SubscriptionService) {}

  @Get()
  async list(@Param('shopId') shopId: string, @CurrentUser() user: JwtPayload) {
    return this.subs.getShopPromotions(user.sub, user.role, shopId);
  }

  @Post()
  async create(
    @Param('shopId') shopId: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: CreatePromotionDto,
  ) {
    return this.subs.createPromotion(user.sub, user.role, shopId, dto);
  }

  @Patch(':promotionId/pause')
  async pause(
    @Param('shopId') shopId: string,
    @Param('promotionId') promotionId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.subs.pausePromotion(user.sub, user.role, shopId, promotionId);
  }

  @Patch(':promotionId/finish')
  async finish(
    @Param('shopId') shopId: string,
    @Param('promotionId') promotionId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.subs.finishPromotion(user.sub, user.role, shopId, promotionId);
  }
}
