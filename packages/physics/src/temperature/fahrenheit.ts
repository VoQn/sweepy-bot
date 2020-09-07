import { AbsoluteZero, UnitSymbol } from '.';
import { Celsius } from './celsius';
import { ZeroDegrees } from './constants';
import { Convertable } from './convertable';
import { Kelvin } from './kelvin';
import { TemperatureBase } from './temperature-base';

export class Fahrenheit extends TemperatureBase implements Convertable {
  static readonly unit = UnitSymbol.Fahrenheit; // '°F';
  static readonly zeroDegrees = ZeroDegrees.Fahrenheit; // 255.37K
  static readonly rate = 5 / 9;
  static readonly absoluteZero = AbsoluteZero.Fahrenheit; // -459.67°F;

  get toKelvin(): Kelvin {
    return new Kelvin(this);
  }
  get toCelsius(): Celsius {
    return new Celsius(this);
  }
  get toFahrenheit(): Fahrenheit {
    return this;
  }
}
