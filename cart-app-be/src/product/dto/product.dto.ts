import { IsString, IsNumber } from 'class-validator';

export class ProductDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;
}
