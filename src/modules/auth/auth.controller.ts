import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { LoginDto } from '../../application/dto/auth/login.dto';
import { RegisterDto } from '../../application/dto/auth/register.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.auth.register(dto.email, dto.password);
    res.cookie('refreshToken', result.refreshToken, this.auth.getRefreshCookieOptions());
    return { user: result.user, accessToken: result.accessToken };
  }

  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.auth.login(dto.email, dto.password);
    res.cookie('refreshToken', result.refreshToken, this.auth.getRefreshCookieOptions());
    return { user: result.user, accessToken: result.accessToken };
  }

  @ApiCookieAuth('refreshToken')
  @Post('refresh')
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = req.cookies?.refreshToken as string | undefined;
    const result = await this.auth.refresh(token ?? '');
    res.cookie('refreshToken', result.refreshToken, this.auth.getRefreshCookieOptions());
    return { user: result.user, accessToken: result.accessToken };
  }

  @ApiCookieAuth('refreshToken')
  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = req.cookies?.refreshToken as string | undefined;
    await this.auth.logout(token);
    res.clearCookie('refreshToken', { path: '/auth' });
    return { ok: true };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('me')
  me(@Req() req: Request) {
    return { user: req.user };
  }
}

