import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { SubscriptionPlan } from '@prisma/client';

export class CreateSubscriptionDto {
  @IsEnum(SubscriptionPlan)
  plan!: SubscriptionPlan;

  @IsOptional()
  @IsDateString()
  endsAt?: string;
}
