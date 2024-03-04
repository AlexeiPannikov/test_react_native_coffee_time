import { GetCafeListResponseItem } from '@/shared';
import { Cafe } from '@entities/cafe/model/Cafe.ts';

export class CafeAdapter {
  static listToDomain(dto: GetCafeListResponseItem[]): Cafe[] {
    const parseCoordinates = (coordinates: string) => {
      const arr = coordinates.split(',').map((item) => Number(item));
      return { lat: arr[0], lon: arr[1] };
    };

    return dto.map((item) => ({ ...item, ...parseCoordinates(item.coordinates) }));
  }
}
