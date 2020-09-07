import { Celsius } from './celsius';
import { Convertable } from './convertable';
import { Fahrenheit } from './fahrenheit';
import { TemperatureBase } from './temperature-base';

export class Kelvin extends TemperatureBase implements Convertable {
  static readonly unit = 'K';
  static readonly rate = 1;
  static readonly absoluteZero = 0;

  get toKelvin(): Kelvin {
    return this;
  }
  get toCelsius(): Celsius {
    return new Celsius(this);
  }
  get toFahrenheit(): Fahrenheit {
    return new Fahrenheit(this);
  }
}
