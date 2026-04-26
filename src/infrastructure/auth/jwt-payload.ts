import { Role } from '../../domain/entities/role';

export interface JwtPayload {
  sub: string;
  role: Role;
}

