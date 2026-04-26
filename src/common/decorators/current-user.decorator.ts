import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../../infrastructure/auth/jwt-payload';

export const CurrentUser = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as JwtPayload | undefined;
});

