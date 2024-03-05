import { GetProductResponse, GetProductsResponseItem } from '@/shared';
import { CafeProduct } from '@entities/product/model/CafeProduct.ts';
import { Product } from '@entities/product/model/Product.ts';

export class ProductAdapter {
  static listToDomainCafeProduct(dto: GetProductsResponseItem[]): CafeProduct[] {
    return dto.map((item) => item);
  }

  static toDomainProduct(dto: GetProductResponse): Product {
    return { ...dto, favorite: dto.favarite };
  }
}
