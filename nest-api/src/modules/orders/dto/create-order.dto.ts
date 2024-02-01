import { Type } from "class-transformer";
import { ArrayNotEmpty, IsInt, IsNotEmpty, IsPositive, IsString, MaxLength, ValidateNested } from "class-validator";

export class OrderItemDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(36)
  product_id: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  quantity: number;
}

export class CreateOrderDto {
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  card_hash: string;
}
