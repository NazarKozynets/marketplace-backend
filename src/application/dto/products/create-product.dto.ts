import { IsObject, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { IsDecimal } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  title!: string;

  @IsString()
  @MinLength(10)
  @MaxLength(5000)
  description!: string;

  @IsDecimal({ decimal_digits: '0,2', force_decimal: false })
  price!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(80)
  brand!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(80)
  category!: string;

  @IsOptional()
  @IsObject()
  attributes?: Record<string, unknown>;
}

