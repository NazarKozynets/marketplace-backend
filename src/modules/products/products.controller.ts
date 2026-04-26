import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from '../../application/dto/products/create-product.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Role } from '../../domain/entities/role';
import type { JwtPayload } from '../../infrastructure/auth/jwt-payload';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('shops/:shopId/products')
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  @ApiBearerAuth()
  @Roles(Role.SELLER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(
    @Param('shopId') shopId: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: CreateProductDto,
  ) {
    return this.products.createProduct(user.sub, user.role, shopId, dto);
  }
}

