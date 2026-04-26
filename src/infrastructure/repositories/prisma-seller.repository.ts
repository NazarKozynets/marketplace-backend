import { Injectable } from '@nestjs/common';
import { SellerRepository, SellerStatus } from '../../domain/repositories/seller.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaSellerRepository implements SellerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const seller = await this.prisma.seller.findUnique({ where: { id } });
    if (!seller) return null;
    return { id: seller.id, userId: seller.userId, status: seller.status as SellerStatus };
  }

  async findByUserId(userId: string) {
    const seller = await this.prisma.seller.findUnique({ where: { userId } });
    if (!seller) return null;
    return { id: seller.id, userId: seller.userId, status: seller.status as SellerStatus };
  }

  async createForUser(userId: string) {
    const seller = await this.prisma.seller.create({
      data: { userId },
    });
    return { id: seller.id, userId: seller.userId, status: seller.status as SellerStatus };
  }

  async setStatus(id: string, status: SellerStatus): Promise<void> {
    await this.prisma.seller.update({ where: { id }, data: { status } });
  }
}

