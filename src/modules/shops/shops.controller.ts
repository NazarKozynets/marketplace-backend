import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateShopDto } from '../../application/dto/shops/create-shop.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Role } from '../../domain/entities/role';
import type { JwtPayload } from '../../infrastructure/auth/jwt-payload';
import { ShopsService } from './shops.service';

@ApiTags('shops')
@Controller('shops')
export class ShopsController {
  constructor(private readonly shops: ShopsService) {}

  @ApiBearerAuth()
  @Roles(Role.SELLER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@CurrentUser() user: JwtPayload, @Body() dto: CreateShopDto) {
    return this.shops.createShop(user.sub, user.role, {
      name: dto.name,
      description: dto.description,
    });
  }
}

