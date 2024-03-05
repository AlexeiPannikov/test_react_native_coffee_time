import { ProductResponse } from '@/shared';
import { Product } from '@entities/product/model/Product.ts';

export class ProductAdapter {
  static listToDomain(dto: ProductResponse[]): Product[] {
    return dto.map((item) => item);
  }

  static toDomain(dto: ProductResponse): Product {
    return { ...dto };
  }
}
