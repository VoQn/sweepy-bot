import { TemperatureBase } from './temperature-base';

export class Kelvin extends TemperatureBase {
  static readonly unit = 'K';
  static readonly absoluteZero = 0;
  static degreesByKelvin(kelvin: number): number {
    return kelvin;
  }
  static kelvinByDegrees(degrees: number): number {
    return degrees;
  }
}
