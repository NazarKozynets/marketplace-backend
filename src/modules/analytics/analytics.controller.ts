import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LogEventDto } from '../../application/dto/analytics/log-event.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import type { JwtPayload } from '../../infrastructure/auth/jwt-payload';
import { AnalyticsService } from './analytics.service';

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analytics: AnalyticsService) {}

  /** Authenticated users attach their userId automatically. */
  @UseGuards(JwtAuthGuard)
  @Post('events')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logAuthenticated(@CurrentUser() user: JwtPayload, @Body() dto: LogEventDto) {
    await this.analytics.logEvent(dto, user.sub);
  }

  /** Anonymous / guest events — no auth required. */
  @Post('events/anonymous')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logAnonymous(@Body() dto: LogEventDto) {
    await this.analytics.logEvent(dto);
  }
}
