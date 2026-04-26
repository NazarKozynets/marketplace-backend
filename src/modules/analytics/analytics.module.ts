import { Module } from '@nestjs/common';
import { PrismaEventRepository } from '../../infrastructure/repositories/prisma-event.repository';
import { EVENT_REPOSITORY } from '../../infrastructure/repositories/repository.tokens';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';

@Module({
  controllers: [AnalyticsController],
  providers: [
    AnalyticsService,
    { provide: EVENT_REPOSITORY, useClass: PrismaEventRepository },
  ],
})
export class AnalyticsModule {}
