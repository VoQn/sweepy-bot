import { Celsius } from './celsius';
import { Fahrenheit } from './fahrenheit';
import { Kelvin } from './kelvin';
import { Temperature } from './temperature-interface';

const temperatureExpression = /(?<degree>-?[0-9]+(\.[0-9]+)?)[^\S\n]?(?<unit>(K|C|℃|F|℉|度|[°°][CF]))/gmu;

const normalizeUnitSymbol = (unit: string): string => {
  if ('K' === unit) {
    return 'K';
  }
  if (['F', '℉', '°F'].indexOf(unit) > 0) {
    return '°F';
  }
  if (['C', '℃', '°C', '度'].indexOf(unit) > 0) {
    return '°C';
  }
  return '°C';
};

const detectTemperature = (degrees: number, unit?: string): Temperature => {
  switch (normalizeUnitSymbol(unit)) {
    case 'K':
      return new Kelvin(degrees);
    case '°F':
      return new Fahrenheit(degrees);
    case '°C':
    default:
      return new Celsius(degrees);
  }
};

export const parseTemperatures = (text: string): Temperature[] => {
  const result: Temperature[] = [];
  const test = text.matchAll(temperatureExpression);
  if (test == null) {
    return result;
  }
  for (const match of test) {
    const degrees: number = parseFloat(match.groups.degree);
    const unit: string = match.groups.unit;
    result.push(detectTemperature(degrees, unit));
  }
  return result;
};

export const parseTemperature = (text: string): Temperature | undefined => {
  const result = parseTemperatures(text);
  if (result.length < 1) {
    return undefined;
  }
  return result[0];
};
