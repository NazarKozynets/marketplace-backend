import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from '../../application/dto/content/create-post.dto';
import { CreateCollectionDto, CollectionProductDto } from '../../application/dto/content/create-collection.dto';
import { CreateOutfitDto } from '../../application/dto/content/create-outfit.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Role } from '../../domain/entities/role';
import type { JwtPayload } from '../../infrastructure/auth/jwt-payload';
import { ContentService } from './content.service';

// ── Feed / Posts ─────────────────────────────────────────────────────────────

@ApiTags('feed')
@Controller('feed')
export class FeedController {
  constructor(private readonly content: ContentService) {}

  @Get()
  async getFeed(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.content.getFeed(limit ? +limit : 20, offset ? +offset : 0);
  }

  @Get('posts/:postId')
  async getPost(@Param('postId') postId: string) {
    return this.content.getPost(postId);
  }

  @Get('shops/:shopId')
  async getShopPosts(
    @Param('shopId') shopId: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.content.getShopPosts(shopId, limit ? +limit : 20, offset ? +offset : 0);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('posts')
  async createPost(@CurrentUser() user: JwtPayload, @Body() dto: CreatePostDto) {
    return this.content.createPost(user.sub, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('posts/:postId/publish')
  async publishPost(@Param('postId') postId: string, @CurrentUser() user: JwtPayload) {
    return this.content.publishPost(user.sub, user.role, postId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('posts/:postId')
  async deletePost(@Param('postId') postId: string, @CurrentUser() user: JwtPayload) {
    return this.content.deletePost(user.sub, user.role, postId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('posts/:postId/like')
  async likePost(@Param('postId') postId: string, @CurrentUser() user: JwtPayload) {
    return this.content.likePost(user.sub, postId);
  }
}

// ── Collections ───────────────────────────────────────────────────────────────

@ApiTags('collections')
@Controller('collections')
export class CollectionsController {
  constructor(private readonly content: ContentService) {}

  @Get()
  async list(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.content.getCollections(limit ? +limit : 20, offset ? +offset : 0);
  }

  @Get('featured')
  async featured() {
    return this.content.getFeaturedCollections();
  }

  @Get(':collectionId')
  async getOne(@Param('collectionId') collectionId: string) {
    return this.content.getCollection(collectionId);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() dto: CreateCollectionDto) {
    return this.content.createCollection(dto);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':collectionId/products')
  async addProduct(@Param('collectionId') collectionId: string, @Body() dto: CollectionProductDto) {
    return this.content.addProductToCollection(collectionId, dto.productId, dto.sortOrder);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':collectionId/products/:productId')
  async removeProduct(
    @Param('collectionId') collectionId: string,
    @Param('productId') productId: string,
  ) {
    return this.content.removeProductFromCollection(collectionId, productId);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':collectionId')
  async delete(@Param('collectionId') collectionId: string) {
    return this.content.deleteCollection(collectionId);
  }
}

// ── Outfits ───────────────────────────────────────────────────────────────────

@ApiTags('outfits')
@Controller('outfits')
export class OutfitsController {
  constructor(private readonly content: ContentService) {}

  @Get()
  async list(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.content.getOutfits(limit ? +limit : 20, offset ? +offset : 0);
  }

  @Get('shops/:shopId')
  async byShop(
    @Param('shopId') shopId: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.content.getShopOutfits(shopId, limit ? +limit : 20, offset ? +offset : 0);
  }

  @Get(':outfitId')
  async getOne(@Param('outfitId') outfitId: string) {
    return this.content.getOutfit(outfitId);
  }

  @ApiBearerAuth()
  @Roles(Role.SELLER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() dto: CreateOutfitDto) {
    return this.content.createOutfit(dto);
  }

  @ApiBearerAuth()
  @Roles(Role.SELLER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':outfitId')
  async delete(@Param('outfitId') outfitId: string) {
    return this.content.deleteOutfit(outfitId);
  }
}
