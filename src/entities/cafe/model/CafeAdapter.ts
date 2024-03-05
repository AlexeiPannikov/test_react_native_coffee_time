import { GetCafeResponse } from '@/shared';
import { Cafe } from '@entities/cafe/model/Cafe.ts';

export class CafeAdapter {
  private static parseCoordinates(coordinates: string) {
    const arr = coordinates.split(',').map((item) => Number(item));
    return { lat: arr[0], lon: arr[1] };
  }

  static listToDomain(dto: GetCafeResponse[]): Cafe[] {
    return dto.map((item) => ({ ...item, ...CafeAdapter.parseCoordinates(item.coordinates) }));
  }

  static toDomain(dto: GetCafeResponse): Cafe {
    return { ...dto, ...CafeAdapter.parseCoordinates(dto.coordinates) };
  }
}
