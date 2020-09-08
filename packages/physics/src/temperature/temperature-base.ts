import { isNumber } from '../type-detection';
import { Temperature } from './temperature-interface';

export abstract class TemperatureBase implements Temperature {
  static readonly unit: string;
  /**
   * その『温度』単位における絶対零度
   * 例えばケルビンであれば **0K** であり、
   * 摂氏（セルシウス度）であれば **-273.15°C** となる。
   */
  static readonly absoluteZero: number;
  static readonly kelvinByDegrees: (degrees: number) => number;
  static readonly degreesByKelvin: (kelvin: number) => number;

  private get static(): typeof TemperatureBase {
    return this.constructor as typeof TemperatureBase;
  }

  readonly kelvin: number;
  readonly existable: boolean;

  constructor(t: number | { kelvin: number }) {
    let kelvin = 0;
    if (isNumber(t)) {
      kelvin = this.static.kelvinByDegrees(t);
    } else {
      kelvin = t.kelvin;
    }
    this.existable = kelvin >= 0;
    this.kelvin = kelvin;
  }

  get degrees(): number {
    return this.static.degreesByKelvin(this.kelvin);
  }

  get unit(): string {
    return this.static.unit;
  }

  deltaKelvin(other: { kelvin: number }): number {
    return this.kelvin - other.kelvin;
  }

  valueOf(): number {
    return this.kelvin;
  }

  equals(other: { kelvin: number }, digits = 3): boolean {
    if (digits) {
      return Math.abs(this.kelvin - other.kelvin) < parseFloat(`1e${-digits}`);
    }
    return this.kelvin === other.kelvin;
  }
  toString(): string {
    return `${this.degrees} ${this.unit}`;
  }
}
