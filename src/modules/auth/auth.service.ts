import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import ms from 'ms';
import { Role } from '../../domain/entities/role';
import type { UserRepository } from '../../domain/repositories/user.repository';
import type { RefreshTokenRepository } from '../../domain/repositories/refresh-token.repository';
import { JwtPayload } from '../../infrastructure/auth/jwt-payload';
import {
  REFRESH_TOKEN_REPOSITORY,
  USER_REPOSITORY,
} from '../../infrastructure/repositories/repository.tokens';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
    @Inject(REFRESH_TOKEN_REPOSITORY) private readonly refreshTokens: RefreshTokenRepository,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(email: string, password: string) {
    const existing = await this.users.findByEmail(email);
    if (existing) throw new BadRequestException('Email already in use');

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.users.create({ email, passwordHash, role: Role.USER });

    const tokens = await this.issueTokens(user.id, user.role);
    await this.persistRefreshToken(user.id, tokens.refreshToken);

    return { user: { shortId: user.shortId, email: user.email, role: user.role }, ...tokens };
  }

  async login(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    await this.refreshTokens.revokeAllForUser(user.id);

    const tokens = await this.issueTokens(user.id, user.role);
    await this.persistRefreshToken(user.id, tokens.refreshToken);

    return { user: { shortId: user.shortId, email: user.email, role: user.role }, ...tokens };
  }

  async refresh(refreshToken: string) {
    const payload = await this.verifyRefreshToken(refreshToken);

    const dbToken = await this.refreshTokens.findActiveByToken(refreshToken);
    if (!dbToken) throw new UnauthorizedException('Refresh token revoked');

    await this.refreshTokens.revokeByToken(refreshToken);

    const user = await this.users.findById(payload.sub);
    if (!user) throw new UnauthorizedException('User not found');

    const tokens = await this.issueTokens(user.id, user.role);
    await this.persistRefreshToken(user.id, tokens.refreshToken);

    return { user: { shortId: user.shortId, email: user.email, role: user.role }, ...tokens };
  }

  async logout(refreshToken?: string) {
    if (refreshToken) {
      await this.refreshTokens.revokeByToken(refreshToken);
    }
    return { ok: true };
  }

  getRefreshCookieOptions() {
    const nodeEnv = this.config.get<string>('NODE_ENV', { infer: true }) ?? 'development';
    const refreshExpires = this.config.get<string>('JWT_REFRESH_EXPIRES', { infer: true }) ?? '7d';

    return {
      httpOnly: true,
      sameSite: 'lax' as const,
      secure: nodeEnv === 'production',
      path: '/auth',
      maxAge: ms(refreshExpires as ms.StringValue),
    };
  }

  private async issueTokens(userId: string, role: Role) {
    const accessSecret = this.config.get<string>('JWT_ACCESS_SECRET', { infer: true })!;
    const refreshSecret = this.config.get<string>('JWT_REFRESH_SECRET', { infer: true })!;
    const accessExpiresIn =
      (this.config.get<string>('JWT_ACCESS_EXPIRES', { infer: true }) ?? '15m') as ms.StringValue;
    const refreshExpiresIn =
      (this.config.get<string>('JWT_REFRESH_EXPIRES', { infer: true }) ?? '7d') as ms.StringValue;

    const payload: JwtPayload = { sub: userId, role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload, { secret: accessSecret, expiresIn: accessExpiresIn }),
      this.jwt.signAsync(payload, { secret: refreshSecret, expiresIn: refreshExpiresIn }),
    ]);

    return { accessToken, refreshToken };
  }

  private async verifyRefreshToken(refreshToken: string): Promise<JwtPayload> {
    try {
      const refreshSecret = this.config.get<string>('JWT_REFRESH_SECRET', { infer: true })!;
      return await this.jwt.verifyAsync<JwtPayload>(refreshToken, { secret: refreshSecret });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async persistRefreshToken(userId: string, refreshToken: string) {
    const refreshExpiresIn =
      (this.config.get<string>('JWT_REFRESH_EXPIRES', { infer: true }) ?? '7d') as ms.StringValue;
    await this.refreshTokens.create({
      userId,
      token: refreshToken,
      expiresAt: new Date(Date.now() + ms(refreshExpiresIn)),
    });
  }
}

