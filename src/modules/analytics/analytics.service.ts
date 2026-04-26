import { Inject, Injectable } from '@nestjs/common';
import type { EventRepository } from '../../domain/repositories/event.repository';
import { EVENT_REPOSITORY } from '../../infrastructure/repositories/repository.tokens';
import type { LogEventDto } from '../../application/dto/analytics/log-event.dto';

@Injectable()
export class AnalyticsService {
  constructor(@Inject(EVENT_REPOSITORY) private readonly events: EventRepository) {}

  async logEvent(dto: LogEventDto, userId?: string): Promise<void> {
    await this.events.log({ ...dto, userId });
  }
}
