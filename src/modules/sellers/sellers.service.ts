import { BadRequestException, Inject, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Role } from '../../domain/entities/role';
import type { SellerRepository } from '../../domain/repositories/seller.repository';
import type { UserRepository } from '../../domain/repositories/user.repository';
import { SELLER_REPOSITORY, USER_REPOSITORY } from '../../infrastructure/repositories/repository.tokens';

@Injectable()
export class SellersService {
  constructor(
    @Inject(SELLER_REPOSITORY) private readonly sellers: SellerRepository,
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
  ) {}

  async becomeSeller(userId: string) {
    const existing = await this.sellers.findByUserId(userId);
    if (existing) return existing;

    const user = await this.users.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    return this.sellers.createForUser(userId);
  }

  async approveSeller(adminUserRole: Role, sellerId: string) {
    if (adminUserRole !== Role.ADMIN) throw new ForbiddenException();
    const seller = await this.sellers.findById(sellerId);
    if (!seller) throw new NotFoundException('Seller not found');
    if (seller.status === 'APPROVED') throw new BadRequestException('Already approved');
    await this.sellers.setStatus(sellerId, 'APPROVED');
    return { ok: true };
  }
}

