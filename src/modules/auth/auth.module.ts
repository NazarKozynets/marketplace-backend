import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../infrastructure/auth/jwt.strategy';
import { PrismaRefreshTokenRepository } from '../../infrastructure/repositories/prisma-refresh-token.repository';
import { PrismaUserRepository } from '../../infrastructure/repositories/prisma-user.repository';
import {
  REFRESH_TOKEN_REPOSITORY,
  USER_REPOSITORY,
} from '../../infrastructure/repositories/repository.tokens';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    { provide: USER_REPOSITORY, useClass: PrismaUserRepository },
    { provide: REFRESH_TOKEN_REPOSITORY, useClass: PrismaRefreshTokenRepository },
  ],
  exports: [AuthService],
})
export class AuthModule {}

