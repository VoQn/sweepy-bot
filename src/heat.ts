import { TemparetureUnit } from './types';
import { round } from './utils';

export const convertKelvinTemp = (
  temp: number,
  unit: TemparetureUnit = TemparetureUnit.Celsius
) => {
  switch (unit) {
    case TemparetureUnit.Celsius:
      return round(temp - 273.15, 2);
    case TemparetureUnit.Fahrenheit:
      return round((9 / 5) * temp - 459.67, 2);
    case TemparetureUnit.Kelvin:
    default:
      return temp;
  }
};
