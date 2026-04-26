export interface CreateOutfitParams {
  title: string;
  description?: string;
  coverImage?: string;
  shopId?: string;
  items?: { productId: string; position?: string; sortOrder?: number }[];
}

export interface OutfitSummary {
  id: string;
  title: string;
  description: string | null;
  coverImage: string | null;
  shopId: string | null;
  createdAt: Date;
}

export interface OutfitRepository {
  findById(id: string): Promise<OutfitSummary | null>;
  findByShop(shopId: string, limit: number, offset: number): Promise<OutfitSummary[]>;
  findAll(limit: number, offset: number): Promise<OutfitSummary[]>;
  create(params: CreateOutfitParams): Promise<{ id: string }>;
  delete(id: string): Promise<void>;
}
