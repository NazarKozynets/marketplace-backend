import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Role } from '../../domain/entities/role';
import type { JwtPayload } from '../../infrastructure/auth/jwt-payload';
import { SellersService } from './sellers.service';

@ApiTags('sellers')
@Controller('sellers')
export class SellersController {
  constructor(private readonly sellers: SellersService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('me')
  async becomeSeller(@CurrentUser() user: JwtPayload) {
    return this.sellers.becomeSeller(user.sub);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':sellerId/approve')
  async approve(@Param('sellerId') sellerId: string, @CurrentUser() user: JwtPayload) {
    return this.sellers.approveSeller(user.role, sellerId);
  }
}

