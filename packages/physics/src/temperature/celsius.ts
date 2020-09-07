import { AbsoluteZero, UnitSymbol, ZeroDegrees } from './constants';
import { Convertable } from './convertable';
import { Fahrenheit } from './fahrenheit';
import { Kelvin } from './kelvin';
import { TemperatureBase } from './temperature-base';

export class Celsius extends TemperatureBase implements Convertable {
  static readonly unit = UnitSymbol.Celsius; // '°C';
  static readonly rate = 1;
  static readonly zeroDegrees = ZeroDegrees.Celsius; // 273.15K;
  static readonly absoluteZero = AbsoluteZero.Celsius; // -273.15°C;

  get toKelvin(): Kelvin {
    return new Kelvin(this);
  }
  get toCelsius(): Celsius {
    return this;
  }
  get toFahrenheit(): Fahrenheit {
    return new Fahrenheit(this);
  }
}
