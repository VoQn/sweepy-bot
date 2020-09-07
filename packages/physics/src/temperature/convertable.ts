import { Celsius } from './celsius';
import { Fahrenheit } from './fahrenheit';
import { Kelvin } from './kelvin';
import { Temperature } from './temperature-interface';

export interface Convertable extends Temperature {
  toKelvin: Kelvin;
  toCelsius: Celsius;
  toFahrenheit: Fahrenheit;
}
