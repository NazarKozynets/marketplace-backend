export interface CreateShopParams {
  name: string;
  description?: string;
  ownerId: string; // Seller.id
}

export interface ShopRepository {
  findById(id: string): Promise<{ id: string; name: string; description: string | null; ownerId: string } | null>;
  create(params: CreateShopParams): Promise<{ id: string; name: string; description: string | null; ownerId: string }>;
}

