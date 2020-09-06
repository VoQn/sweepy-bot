import { Temp } from './tempareture-base';
import { Tempareture } from './tempareture-interface';

export class Kelvin extends Temp {
  get toKelvin(): Tempareture {
    return this;
  }
}
