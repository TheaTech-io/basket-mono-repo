import { HttpException, HttpStatus, Injectable, Query } from '@nestjs/common';
import Redis from 'ioredis';
import { productType } from 'src/type/productType';

@Injectable()
export class CartService {
  private readonly redisClient: Redis;
  private products: productType;

  constructor() {
    this.redisClient = new Redis();
    this.products = [
      { id: 0, name: 'Falaka', price: 10, stock: 100 },
      { id: 1, name: 'Arabam', price: 15, stock: 50 },
      { id: 2, name: 'Körlük', price: 5, stock: 25 },
      { id: 3, name: 'Simyacı', price: 3, stock: 30 },
    ];
  }
  async getCart(@Query() query: { userId: string }): Promise<GetCartType[]> {
    const cartItems = await this.redisClient.hgetall(`cart:${query.userId}`);
    let cart = [];

    Object.entries(cartItems).map(([key, value]) => {
      const productId = parseInt(key.split(':')[1]);
      const quantity = parseInt(value);
      const product = this.products.find((product) => product.id === productId);
      if (product) {
        return cart.push({ product: product, quantity: quantity });
      } else {
        return null;
      }
    });

    return cart;
  }

  async checkCoupon(
    @Query() query: { coupon: string },
  ): Promise<Record<string, string>> {
    const keys = await this.redisClient.keys('coupon:*');
    for (const key of keys) {
      const coupon = await this.redisClient.hgetall(key);

      if (coupon.coupon === query.coupon) {
        return coupon;
      }
    }
    throw new HttpException('Coupon not found', HttpStatus.NOT_FOUND);
  }
}
