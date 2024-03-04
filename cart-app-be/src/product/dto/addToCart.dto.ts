import { IsString, IsNumber } from 'class-validator';

export class addToCart {
  @IsString()
  productId: string;

  @IsNumber()
  quantity: number;

  @IsString()
  userId: string;
}
