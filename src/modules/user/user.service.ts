import { Inject, Injectable } from '@nestjs/common';
import type { UserRepository } from '../../domain/repositories/user.repository';
import { USER_REPOSITORY } from '../../infrastructure/repositories/repository.tokens';

@Injectable()
export class UserService {
  constructor(@Inject(USER_REPOSITORY) private readonly users: UserRepository) {}

  async findById(id: string) {
    const user = await this.users.findById(id);
    if (!user) return null;
    return { id: user.id, email: user.email, role: user.role, createdAt: user.createdAt };
  }
}

