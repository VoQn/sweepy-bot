import { TemparetureUnit, ZeroDegree } from './constants';
import { fahrenheitToKelvin, kelvinToFahrenheit } from './convert';
import { Kelvin } from './kelvin';
import { Temp } from './tempareture-base';

export class Fahrenheit extends Temp {
  static readonly unit = TemparetureUnit.Fahrenheit; // '°F';
  static readonly zero = ZeroDegree.Fahrenheit; // -459.67;

  static fromKelvin<K extends Kelvin>(k: K): Fahrenheit {
    return new Fahrenheit(kelvinToFahrenheit(k.value));
  }

  get kelvin(): number {
    return fahrenheitToKelvin(this.value);
  }
}
