import { IsEnum, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';
import { EventType } from '@prisma/client';

export class LogEventDto {
  @IsEnum(EventType)
  type!: EventType;

  @IsOptional()
  @IsString()
  sessionId?: string;

  @IsOptional()
  @IsUUID()
  productId?: string;

  @IsOptional()
  @IsUUID()
  shopId?: string;

  @IsOptional()
  @IsUUID()
  postId?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
