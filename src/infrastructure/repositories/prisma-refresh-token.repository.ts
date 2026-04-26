import { Injectable } from '@nestjs/common';
import { RefreshToken as PrismaRefreshToken } from '@prisma/client';
import { RefreshTokenEntity } from '../../domain/entities/refresh-token.entity';
import {
  CreateRefreshTokenParams,
  RefreshTokenRepository,
} from '../../domain/repositories/refresh-token.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaRefreshTokenRepository implements RefreshTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(params: CreateRefreshTokenParams): Promise<RefreshTokenEntity> {
    const token = await this.prisma.refreshToken.create({
      data: {
        userId: params.userId,
        token: params.token,
        expiresAt: params.expiresAt,
      },
    });
    return this.toEntity(token);
  }

  async findActiveByToken(token: string): Promise<RefreshTokenEntity | null> {
    const found = await this.prisma.refreshToken.findUnique({
      where: { token },
    });
    if (!found) return null;
    if (found.revokedAt) return null;
    if (found.expiresAt.getTime() <= Date.now()) return null;
    return this.toEntity(found);
  }

  async revokeByToken(token: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: { token, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  async revokeAllForUser(userId: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  private toEntity(token: PrismaRefreshToken): RefreshTokenEntity {
    return new RefreshTokenEntity(
      token.id,
      token.userId,
      token.token,
      token.expiresAt,
      token.revokedAt ?? null,
      token.createdAt,
    );
  }
}

