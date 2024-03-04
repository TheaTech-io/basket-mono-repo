import { Module } from '@nestjs/common';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';
import { RedisService } from './redis/redis.service';
@Module({
  imports: [CartModule, ProductModule],
  providers: [RedisService],
})
export class AppModule {}
