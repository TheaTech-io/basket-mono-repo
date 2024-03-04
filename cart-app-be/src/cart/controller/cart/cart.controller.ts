import { Body, Controller, Get, Query } from '@nestjs/common';
import { CartService } from 'src/cart/service/cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Query() query: { userId: string }) {
    return this.cartService.getCart(query);
  }

  @Get('coupon')
  checkCoupon(@Query() query: { coupon: string }) {
    return this.cartService.checkCoupon(query);
  }
}
