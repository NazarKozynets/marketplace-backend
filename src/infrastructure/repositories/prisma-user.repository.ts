import { Injectable } from '@nestjs/common';
import { Role as PrismaRole, User as PrismaUser } from '@prisma/client';
import { Role } from '../../domain/entities/role';
import { UserEntity } from '../../domain/entities/user.entity';
import { CreateUserParams, UserRepository } from '../../domain/repositories/user.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? this.toEntity(user) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? this.toEntity(user) : null;
  }

  async create(params: CreateUserParams): Promise<UserEntity> {
    const user = await this.prisma.user.create({
      data: {
        email: params.email,
        passwordHash: params.passwordHash,
        role: (params.role ?? Role.USER) as unknown as PrismaRole,
      },
    });
    return this.toEntity(user);
  }

  private toEntity(user: PrismaUser): UserEntity {
    return new UserEntity(
      user.id,
      user.shortId,
      user.email,
      user.passwordHash,
      user.role as unknown as Role,
      user.createdAt,
      user.updatedAt,
    );
  }
}

