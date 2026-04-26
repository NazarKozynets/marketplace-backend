import { EventType } from '@prisma/client';

export interface LogEventParams {
  type: EventType;
  userId?: string;
  sessionId?: string;
  productId?: string;
  shopId?: string;
  postId?: string;
  metadata?: Record<string, unknown>;
}

export interface EventRepository {
  log(params: LogEventParams): Promise<void>;
}
