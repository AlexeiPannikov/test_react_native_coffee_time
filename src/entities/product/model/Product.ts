import { GetProductResponse } from '@/shared';

export interface Product extends GetProductResponse {
  favorite: boolean;
}
