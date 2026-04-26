export interface CreateCollectionParams {
  title: string;
  slug: string;
  description?: string;
  coverImage?: string;
  isFeatured?: boolean;
  productIds?: string[];
}

export interface CollectionSummary {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  coverImage: string | null;
  isFeatured: boolean;
  createdAt: Date;
}

export interface CollectionRepository {
  findById(id: string): Promise<CollectionSummary | null>;
  findAll(limit: number, offset: number): Promise<CollectionSummary[]>;
  findFeatured(): Promise<CollectionSummary[]>;
  create(params: CreateCollectionParams): Promise<{ id: string }>;
  addProduct(collectionId: string, productId: string, sortOrder?: number): Promise<void>;
  removeProduct(collectionId: string, productId: string): Promise<void>;
  delete(id: string): Promise<void>;
}
