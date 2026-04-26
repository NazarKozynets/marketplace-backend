import { Injectable } from '@nestjs/common';
import { CreatePostParams, PostRepository, PostSummary } from '../../domain/repositories/post.repository';
import { PrismaService } from '../prisma/prisma.service';

const postSelect = {
  id: true,
  authorId: true,
  shopId: true,
  type: true,
  title: true,
  text: true,
  coverImage: true,
  published: true,
  createdAt: true,
  _count: { select: { likes: true } },
} as const;

const toSummary = (p: {
  id: string;
  authorId: string;
  shopId: string | null;
  type: PostSummary['type'];
  title: string | null;
  text: string | null;
  coverImage: string | null;
  published: boolean;
  createdAt: Date;
  _count: { likes: number };
}): PostSummary => ({
  id: p.id,
  authorId: p.authorId,
  shopId: p.shopId,
  type: p.type,
  title: p.title,
  text: p.text,
  coverImage: p.coverImage,
  published: p.published,
  createdAt: p.createdAt,
  likesCount: p._count.likes,
});

@Injectable()
export class PrismaPostRepository implements PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const p = await this.prisma.post.findUnique({ where: { id }, select: postSelect });
    return p ? toSummary(p) : null;
  }

  async findPublished(limit: number, offset: number) {
    const posts = await this.prisma.post.findMany({
      where: { published: true },
      select: postSelect,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });
    return posts.map(toSummary);
  }

  async findByShop(shopId: string, limit: number, offset: number) {
    const posts = await this.prisma.post.findMany({
      where: { shopId, published: true },
      select: postSelect,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });
    return posts.map(toSummary);
  }

  async create(params: CreatePostParams): Promise<{ id: string }> {
    const post = await this.prisma.post.create({
      data: {
        authorId: params.authorId,
        shopId: params.shopId,
        type: params.type,
        title: params.title,
        text: params.text,
        coverImage: params.coverImage,
        published: params.published ?? false,
        products: params.productIds?.length
          ? {
              create: params.productIds.map((productId) => ({ productId })),
            }
          : undefined,
      },
      select: { id: true },
    });
    return { id: post.id };
  }

  async publish(id: string): Promise<void> {
    await this.prisma.post.update({ where: { id }, data: { published: true } });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.post.delete({ where: { id } });
  }

  async likeToggle(userId: string, postId: string): Promise<{ liked: boolean }> {
    const existing = await this.prisma.postLike.findUnique({
      where: { userId_postId: { userId, postId } },
      select: { id: true },
    });

    if (existing) {
      await this.prisma.postLike.delete({ where: { userId_postId: { userId, postId } } });
      return { liked: false };
    }

    await this.prisma.postLike.create({ data: { userId, postId } });
    return { liked: true };
  }
}
