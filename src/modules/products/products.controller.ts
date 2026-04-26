import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from '../../application/dto/products/create-product.dto';
import { UpdateProductDto } from '../../application/dto/products/update-product.dto';
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

  @Get()
  async list(@Param('shopId') shopId: string) {
    return this.products.getShopProducts(shopId);
  }

  @Get(':productId')
  async getOne(@Param('productId') productId: string) {
    return this.products.getProduct(productId);
  }

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

  @ApiBearerAuth()
  @Roles(Role.SELLER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':productId')
  async update(
    @Param('shopId') shopId: string,
    @Param('productId') productId: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: UpdateProductDto,
  ) {
    return this.products.updateProduct(user.sub, user.role, shopId, productId, dto);
  }

  @ApiBearerAuth()
  @Roles(Role.SELLER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':productId')
  async remove(
    @Param('shopId') shopId: string,
    @Param('productId') productId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.products.deleteProduct(user.sub, user.role, shopId, productId);
  }
}
