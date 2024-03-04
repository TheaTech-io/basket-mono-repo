import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { addToCart } from '../dto/addToCart.dto';
import { removeFromCart } from '../dto/removeFromCart.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  getProducts(): Promise<any> {
    return this.productsService.getProducts();
  }

  @Post()
  addToCart(@Body() addToCart: addToCart): Promise<void> {
    return this.productsService.addToCart(addToCart);
  }

  @Delete()
  removeFromCart(
    @Body() removeFromCart: removeFromCart,
  ): Promise<Record<string, string>> {
    return this.productsService.removeFromCart(removeFromCart);
  }
}
