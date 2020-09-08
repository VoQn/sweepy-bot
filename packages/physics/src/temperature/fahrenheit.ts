import { TemperatureBase } from './temperature-base';

export class Fahrenheit extends TemperatureBase {
  static readonly unit = '°F';
  static readonly degree = 5 / 9;
  static readonly absoluteZero = -459.67;

  static degreesByKelvin(kelvin: number): number {
    return kelvin / this.degree + this.absoluteZero;
  }
  static kelvinByDegrees(degrees: number): number {
    return this.degree * (degrees - this.absoluteZero);
  }
}
