export interface CreateProductParams {
  title: string;
  description: string;
  price: string; // decimal string
  brand: string;
  category: string;
  attributes?: Record<string, unknown>;
  shopId: string;
}

export interface ProductRepository {
  findById(id: string): Promise<{ id: string; shopId: string } | null>;
  create(params: CreateProductParams): Promise<{ id: string }>;
}

