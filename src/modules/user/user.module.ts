import { Module } from '@nestjs/common';
import { PrismaUserRepository } from '../../infrastructure/repositories/prisma-user.repository';
import { USER_REPOSITORY } from '../../infrastructure/repositories/repository.tokens';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, { provide: USER_REPOSITORY, useClass: PrismaUserRepository }],
  exports: [UserService],
})
export class UserModule {}

