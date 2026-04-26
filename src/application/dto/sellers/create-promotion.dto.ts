import { IsDateString, IsInt, IsOptional, IsUUID, Min } from 'class-validator';

export class CreatePromotionDto {
  @IsUUID()
  productId!: string;

  @IsDateString()
  startsAt!: string;

  @IsDateString()
  endsAt!: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  priority?: number;
}
