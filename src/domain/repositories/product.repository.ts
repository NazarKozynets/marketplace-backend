import { ProductCondition, ProductStatus } from '@prisma/client';

export interface CreateProductVariantParams {
  size?: string;
  color?: string;
  stock?: number;
  price?: string;
}

export interface CreateProductImageParams {
  url: string;
  alt?: string;
  sortOrder?: number;
}

export interface CreateProductParams {
  title: string;
  description: string;
  price: string;
  brand: string;
  category: string;
  style?: string;
  condition?: ProductCondition;
  status?: ProductStatus;
  tags?: string[];
  attributes?: Record<string, unknown>;
  shopId: string;
  variants?: CreateProductVariantParams[];
  images?: CreateProductImageParams[];
}

export interface UpdateProductParams {
  title?: string;
  description?: string;
  price?: string;
  brand?: string;
  category?: string;
  style?: string;
  condition?: ProductCondition;
  status?: ProductStatus;
  tags?: string[];
  attributes?: Record<string, unknown>;
}

export interface ProductSummary {
  id: string;
  shortId: string;
  shopId: string;
  title: string;
  price: string;
  status: ProductStatus;
}

export interface ProductRepository {
  findById(id: string): Promise<{ id: string; shortId: string; shopId: string; title: string; price: string; status: ProductStatus } | null>;
  findByShopId(shopId: string): Promise<ProductSummary[]>;
  create(params: CreateProductParams): Promise<{ id: string; shortId: string }>;
  update(id: string, params: UpdateProductParams): Promise<{ id: string; shortId: string }>;
  delete(id: string): Promise<void>;
}
