import { Type } from 'class-transformer';
import { ArrayMinSize, IsInt, IsString, Min, ValidateNested } from 'class-validator';

class CreateOrderItemDto {
  @IsString()
  productId!: string;

  @IsInt()
  @Min(1)
  quantity!: number;
}

export class CreateOrderDto {
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items!: CreateOrderItemDto[];
}

