import { Atribute } from '@shared/api/product/Atribute.ts';

export interface GetProductResponse {
  id: string;
  productName: string;
  price: number;
  cofeId: string;
  cofeName: string;
  favarite: boolean;
  attribute: Atribute[];
  imagesPath: string;
}
