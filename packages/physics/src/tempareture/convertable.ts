import { Celsius as C } from './celsius';
import {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  kelvinToCelsius,
  kelvinToFahrenheit,
} from './convert';
import { Fahrenheit as F } from './fahrenheit';
import { Kelvin as K } from './kelvin';
import { Tempareture } from './tempareture-interface';

export interface Convertable extends Tempareture {
  toKelvin: Kelvin;
  toCelsius: Celsius;
  toFahrenheit: Fahrenheit;
}

export class Kelvin extends K implements Convertable {
  get toKelvin(): Kelvin {
    return this;
  }
  get toCelsius(): Celsius {
    return Celsius.fromKelvin(this);
  }
  get toFahrenheit(): Fahrenheit {
    return Fahrenheit.fromKelvin(this);
  }
}

export class Celsius extends C implements Convertable {
  static fromKelvin<T extends K>(k: T): Celsius {
    return new Celsius(kelvinToCelsius(k.value));
  }
  get toKelvin(): Kelvin {
    return new Kelvin(this.kelvin);
  }
  get toCelsius(): Celsius {
    return this;
  }
  get toFahrenheit(): Fahrenheit {
    return new Fahrenheit(celsiusToFahrenheit(this.value));
  }
}

export class Fahrenheit extends F implements Convertable {
  static fromKelvin<T extends K>(k: T): Fahrenheit {
    return new Fahrenheit(kelvinToFahrenheit(k.value));
  }
  get toKelvin(): Kelvin {
    return new Kelvin(this.kelvin);
  }
  get toCelsius(): Celsius {
    return new Celsius(fahrenheitToCelsius(this.value));
  }
  get toFahrenheit(): Fahrenheit {
    return this;
  }
}
