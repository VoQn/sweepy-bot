import { isNumber } from '../type-detection';
import { Temperature } from './temperature-interface';

export const valueOfKelvin = (t: number | Temperature): number => {
  return isNumber(t) ? t : t.kelvin;
};

export abstract class TemperatureBase implements Temperature {
  static readonly unit: string = undefined; // 'K';
  static readonly rate: number = undefined; // 1;
  static readonly zeroDegrees: number = undefined; // 0;
  static readonly absoluteZero: number = undefined; // 0;

  static valueByKelvin(t: number | Temperature): number {
    return valueOfKelvin(t) / this.rate + this.absoluteZero;
  }

  get static(): typeof TemperatureBase {
    return this.constructor as typeof TemperatureBase;
  }

  readonly value: number;
  readonly existable: boolean;

  constructor(t: number | Temperature) {
    const value = isNumber(t) ? t : this.static.valueByKelvin(t);
    this.existable = value >= this.static.absoluteZero;
    this.value = value;
  }

  get unit(): string {
    return this.static.unit;
  }

  get zero(): number {
    return this.static.zeroDegrees;
  }

  get absoluteZero(): number {
    return this.static.absoluteZero;
  }

  get kelvin(): number {
    return (this.value - this.static.absoluteZero) * this.static.rate;
  }

  deltaKelvin(other: Temperature): number {
    return this.kelvin - other.kelvin;
  }

  valueOf(): number {
    return this.kelvin;
  }

  toString(): string {
    return `${this.value}${this.unit}`;
  }
}
