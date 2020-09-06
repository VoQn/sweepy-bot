import { TemparetureUnit, ZeroDegree } from './constants';
import { Kelvin } from './kelvin';
import { Temp } from './tempareture-base';

export class Celsius extends Temp {
  static readonly unit = TemparetureUnit.Celsius; // '°C';
  static readonly zero = ZeroDegree.Celsius; // -273.15;

  static fromKelvin<K extends Kelvin>(k: K): Celsius {
    return new Celsius(this.valueByKelvin(k.value));
  }
}
