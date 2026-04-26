export type SellerStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';

export interface SellerRepository {
  findById(id: string): Promise<{ id: string; userId: string; status: SellerStatus } | null>;
  findByUserId(userId: string): Promise<{ id: string; userId: string; status: SellerStatus } | null>;
  createForUser(userId: string): Promise<{ id: string; userId: string; status: SellerStatus }>;
  setStatus(id: string, status: SellerStatus): Promise<void>;
}

