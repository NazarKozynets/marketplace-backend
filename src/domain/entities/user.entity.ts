import { Role } from './role';

export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly passwordHash: string,
    public readonly role: Role,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}

