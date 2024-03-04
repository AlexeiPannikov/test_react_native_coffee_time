import { GetCafeListResponseItem } from '@/shared';

export interface Cafe extends GetCafeListResponseItem {
  lat: number;
  lon: number;
}
