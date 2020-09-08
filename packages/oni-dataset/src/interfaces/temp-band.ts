import { Temperature } from '@sweepy-bot/physics';

export interface TempBand<T extends Temperature> {
  low: T;
  high: T;
}
