import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { EventRepository, LogEventParams } from '../../domain/repositories/event.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaEventRepository implements EventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async log(params: LogEventParams): Promise<void> {
    await this.prisma.userEvent.create({
      data: {
        type: params.type,
        userId: params.userId,
        sessionId: params.sessionId,
        productId: params.productId,
        shopId: params.shopId,
        postId: params.postId,
        metadata: (params.metadata ?? {}) as Prisma.InputJsonValue,
      },
    });
  }
}
