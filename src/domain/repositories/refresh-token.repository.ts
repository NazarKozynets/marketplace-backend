import { RefreshTokenEntity } from '../entities/refresh-token.entity';

export interface CreateRefreshTokenParams {
  userId: string;
  token: string;
  expiresAt: Date;
}

export interface RefreshTokenRepository {
  create(params: CreateRefreshTokenParams): Promise<RefreshTokenEntity>;
  findActiveByToken(token: string): Promise<RefreshTokenEntity | null>;
  revokeByToken(token: string): Promise<void>;
  revokeAllForUser(userId: string): Promise<void>;
}

