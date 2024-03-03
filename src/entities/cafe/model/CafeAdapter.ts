import { GetCafeListResponseItem } from '@/shared';
import { Cafe } from '@entities/cafe/model/Cafe.ts';

export class CafeAdapter {
  static listToDomain(dto: GetCafeListResponseItem[]): Cafe[] {
    return dto.map((item) => item);
  }
}
