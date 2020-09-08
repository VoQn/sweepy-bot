import { TemperatureBase } from './temperature-base';

export class Celsius extends TemperatureBase {
  static readonly unit = '°C';
  static readonly absoluteZero = -273.15;

  static degreesByKelvin(kelvin: number): number {
    return kelvin + this.absoluteZero;
  }

  static kelvinByDegrees(degrees: number): number {
    return degrees - this.absoluteZero;
  }
}
