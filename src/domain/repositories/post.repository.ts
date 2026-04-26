import { PostType } from '@prisma/client';

export interface CreatePostParams {
  authorId: string;
  shopId?: string;
  type: PostType;
  title?: string;
  text?: string;
  coverImage?: string;
  published?: boolean;
  productIds?: string[];
}

export interface PostSummary {
  id: string;
  authorId: string;
  shopId: string | null;
  type: PostType;
  title: string | null;
  text: string | null;
  coverImage: string | null;
  published: boolean;
  createdAt: Date;
  likesCount: number;
}

export interface PostRepository {
  findById(id: string): Promise<PostSummary | null>;
  findPublished(limit: number, offset: number): Promise<PostSummary[]>;
  findByShop(shopId: string, limit: number, offset: number): Promise<PostSummary[]>;
  create(params: CreatePostParams): Promise<{ id: string }>;
  publish(id: string): Promise<void>;
  delete(id: string): Promise<void>;
  likeToggle(userId: string, postId: string): Promise<{ liked: boolean }>;
}
