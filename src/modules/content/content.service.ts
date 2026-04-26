import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { PostRepository } from '../../domain/repositories/post.repository';
import type { CollectionRepository } from '../../domain/repositories/collection.repository';
import type { OutfitRepository } from '../../domain/repositories/outfit.repository';
import {
  POST_REPOSITORY,
  COLLECTION_REPOSITORY,
  OUTFIT_REPOSITORY,
} from '../../infrastructure/repositories/repository.tokens';
import type { CreatePostDto } from '../../application/dto/content/create-post.dto';
import type { CreateCollectionDto } from '../../application/dto/content/create-collection.dto';
import type { CreateOutfitDto } from '../../application/dto/content/create-outfit.dto';
import { Role } from '../../domain/entities/role';

@Injectable()
export class ContentService {
  constructor(
    @Inject(POST_REPOSITORY) private readonly posts: PostRepository,
    @Inject(COLLECTION_REPOSITORY) private readonly collections: CollectionRepository,
    @Inject(OUTFIT_REPOSITORY) private readonly outfits: OutfitRepository,
  ) {}

  // ── Posts ────────────────────────────────────────────────────────────────

  async getFeed(limit = 20, offset = 0) {
    return this.posts.findPublished(limit, offset);
  }

  async getShopPosts(shopId: string, limit = 20, offset = 0) {
    return this.posts.findByShop(shopId, limit, offset);
  }

  async getPost(id: string) {
    const post = await this.posts.findById(id);
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async createPost(authorId: string, dto: CreatePostDto) {
    return this.posts.create({ ...dto, authorId });
  }

  async publishPost(authorId: string, role: Role, postId: string) {
    const post = await this.posts.findById(postId);
    if (!post) throw new NotFoundException('Post not found');
    if (role !== Role.ADMIN && post.authorId !== authorId) {
      throw new ForbiddenException('Not your post');
    }
    await this.posts.publish(postId);
    return { ok: true };
  }

  async deletePost(authorId: string, role: Role, postId: string) {
    const post = await this.posts.findById(postId);
    if (!post) throw new NotFoundException('Post not found');
    if (role !== Role.ADMIN && post.authorId !== authorId) {
      throw new ForbiddenException('Not your post');
    }
    await this.posts.delete(postId);
    return { ok: true };
  }

  async likePost(userId: string, postId: string) {
    const post = await this.posts.findById(postId);
    if (!post) throw new NotFoundException('Post not found');
    return this.posts.likeToggle(userId, postId);
  }

  // ── Collections ──────────────────────────────────────────────────────────

  async getCollections(limit = 20, offset = 0) {
    return this.collections.findAll(limit, offset);
  }

  async getFeaturedCollections() {
    return this.collections.findFeatured();
  }

  async getCollection(id: string) {
    const col = await this.collections.findById(id);
    if (!col) throw new NotFoundException('Collection not found');
    return col;
  }

  async createCollection(dto: CreateCollectionDto) {
    return this.collections.create(dto);
  }

  async addProductToCollection(collectionId: string, productId: string, sortOrder?: number) {
    await this.getCollection(collectionId);
    await this.collections.addProduct(collectionId, productId, sortOrder);
    return { ok: true };
  }

  async removeProductFromCollection(collectionId: string, productId: string) {
    await this.getCollection(collectionId);
    await this.collections.removeProduct(collectionId, productId);
    return { ok: true };
  }

  async deleteCollection(id: string) {
    await this.getCollection(id);
    await this.collections.delete(id);
    return { ok: true };
  }

  // ── Outfits ───────────────────────────────────────────────────────────────

  async getOutfits(limit = 20, offset = 0) {
    return this.outfits.findAll(limit, offset);
  }

  async getShopOutfits(shopId: string, limit = 20, offset = 0) {
    return this.outfits.findByShop(shopId, limit, offset);
  }

  async getOutfit(id: string) {
    const outfit = await this.outfits.findById(id);
    if (!outfit) throw new NotFoundException('Outfit not found');
    return outfit;
  }

  async createOutfit(dto: CreateOutfitDto) {
    return this.outfits.create(dto);
  }

  async deleteOutfit(id: string) {
    await this.getOutfit(id);
    await this.outfits.delete(id);
    return { ok: true };
  }
}
