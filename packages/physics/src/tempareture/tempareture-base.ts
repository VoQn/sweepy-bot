import { Tempareture } from './tempareture-interface';

export abstract class Temp implements Tempareture {
  static readonly unit: string = 'K';
  static readonly zero: number = 0;

  static valueByKelvin(kelvin: number): number {
    return kelvin + this.zero;
  }

  readonly existable: boolean;

  get static(): typeof Temp {
    return this.constructor as typeof Temp;
  }

  constructor(public readonly value: number) {
    const zero = this.static.zero;
    this.existable = value >= zero;
    this.value = value;
  }

  get unit(): string {
    return this.static.unit;
  }

  get zero(): number {
    return this.static.zero;
  }

  get kelvin(): number {
    return this.value - this.zero;
  }

  deltaKelvin<T extends Temp>(other: T): number {
    return this.kelvin - other.kelvin;
  }

  valueOf(): number {
    return this.kelvin;
  }

  toString(): string {
    return `${this.value}${this.unit}`;
  }
}
