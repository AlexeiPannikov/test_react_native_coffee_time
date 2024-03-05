import { GetCafeResponse } from '@/shared';

export interface Cafe extends GetCafeResponse {
  lat: number;
  lon: number;
}
