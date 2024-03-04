import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { mainProducts } from 'src/type/productType';

@Injectable()
export class RedisService implements OnModuleInit {
  private readonly redisClient: Redis;
  private coupons: couponsType[] = [
    {
      id: 0,
      coupon: 'XXXXX',
      discountValue: 10,
      discountType: 'discount',
    },
    {
      id: 1,
      coupon: 'YYYYY',
      discountValue: 20,
      discountType: 'discount',
    },
    {
      id: 3,
      coupon: 'ZZZZZ',
      discountValue: 30,
      discountType: 'discount',
    },
    {
      id: 4,
      coupon: 'XYXYX',
      discountValue: 'Falaka',
      discountType: 'buyoneandgetonefree',
    },
  ];

  constructor() {
    this.redisClient = new Redis();
  }

  async onModuleInit() {
    const productKeysExist = await this.checkProductKeysExist();

    if (!productKeysExist) {
      await this.setMainProducts();
    }
    await this.setCoupons();
  }

  async checkProductKeysExist(): Promise<boolean> {
    const keys = await this.redisClient.keys('product:*');
    return keys.length > 0;
  }

  async setMainProducts(): Promise<void> {
    for (const product of mainProducts) {
      await this.redisClient.hmset(`product:${product.id}`, product);
    }
  }

  async setCoupons(): Promise<void> {
    for (const coupon of this.coupons) {
      await this.redisClient.hmset(`coupon:${coupon.id}`, coupon);
    }
  }
}
