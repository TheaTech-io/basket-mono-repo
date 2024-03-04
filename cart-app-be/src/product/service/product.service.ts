import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { addToCart } from '../dto/addToCart.dto';
import { productType } from 'src/type/productType';

@Injectable()
export class ProductService {
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

  async getProducts(): Promise<productType> {
    const productKeys = await this.redisClient.keys('*product:*'); // Assuming all product keys start with "product:"
    const products = [];

    for (const key of productKeys) {
      const productData = await this.redisClient.hgetall(key);
      const id = parseInt(productData.id);
      const name = productData.name;
      const price = parseInt(productData.price);
      const stock = parseInt(productData.stock);

      products.push({ id, name, price, stock });
    }

    return products;
  }

  async addToCart(body: addToCart) {
    const productKey = `product:${body.productId}`;
    const product = await this.redisClient.hgetall(productKey);

    if (!product.id) {
      throw new HttpException('Ürün bulunamadı', HttpStatus.NOT_FOUND);
    }

    let currentStock = +product.stock;
    let requestedQuantity = body.quantity;

    if (currentStock < requestedQuantity) {
      throw new HttpException('Stok yetersiz', HttpStatus.BAD_REQUEST);
    }

    currentStock -= requestedQuantity;

    await this.redisClient.hset(productKey, 'stock', currentStock.toString());

    const cartKey = `cart:${body.userId}`;
    const existingQuantity = await this.redisClient.hget(cartKey, productKey);

    let updatedQuantity = requestedQuantity;
    if (existingQuantity) {
      updatedQuantity += +existingQuantity;
    }

    await this.redisClient.hset(
      cartKey,
      productKey,
      updatedQuantity.toString(),
    );
  }

  async removeFromCart(body: {
    userId: string;
    productId: string;
  }): Promise<Record<string, string>> {
    const cartKey = `cart:${body.userId}`;
    const productKey = `product:${body.productId}`;

    const existingQuantity = await this.redisClient.hget(cartKey, productKey);

    if (!existingQuantity) {
      throw new HttpException(
        'Ürün sepetinizde bulunmamaktadır.',
        HttpStatus.NOT_FOUND,
      );
    }

    let updatedQuantity = +existingQuantity - 1;

    const product = await this.redisClient.hgetall(productKey);
    let currentStock = +product.stock;

    currentStock += 1;

    await this.redisClient.hset(productKey, 'stock', currentStock.toString());

    if (updatedQuantity <= 0) {
      await this.redisClient.hdel(cartKey, productKey);
    } else {
      await this.redisClient.hset(
        cartKey,
        productKey,
        updatedQuantity.toString(),
      );
    }

    const updatedCart = await this.redisClient.hgetall(cartKey);

    return updatedCart;
  }
}
