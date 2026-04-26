export interface CreateShopParams {
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  instagram?: string;
  telegram?: string;
  ownerId: string;
}

export interface ShopSummary {
  id: string;
  shortId: string;
  name: string;
  slug: string;
  description: string | null;
  logoUrl: string | null;
  ownerId: string;
}

export interface ShopRepository {
  findById(id: string): Promise<ShopSummary | null>;
  findBySlug(slug: string): Promise<ShopSummary | null>;
  create(params: CreateShopParams): Promise<ShopSummary>;
}
