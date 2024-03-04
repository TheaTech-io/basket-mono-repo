import { IsString, IsNumber } from 'class-validator';

export class removeFromCart {
  @IsString()
  productId: string;

  @IsString()
  userId: string;
}
