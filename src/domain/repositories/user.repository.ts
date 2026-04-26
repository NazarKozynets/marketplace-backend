import { Role } from '../entities/role';
import { UserEntity } from '../entities/user.entity';

export interface CreateUserParams {
  email: string;
  passwordHash: string;
  role?: Role;
}

export interface UserRepository {
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  create(params: CreateUserParams): Promise<UserEntity>;
}

