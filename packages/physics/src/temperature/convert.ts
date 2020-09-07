import { AbsoluteZero } from './constants';

export const kelvinToCelsius = (kelvin: number): number => {
  return kelvin + AbsoluteZero.Celsius;
};

export const celsiusToKelvin = (celsius: number): number => {
  return celsius - AbsoluteZero.Celsius;
};

export const kelvinToFahrenheit = (kelvin: number): number => {
  return (9 / 5) * kelvin + AbsoluteZero.Fahrenheit;
};

export const fahrenheitToKelvin = (fahrenheit: number): number => {
  return (5 / 9) * (fahrenheit - AbsoluteZero.Fahrenheit);
};

export const celsiusToFahrenheit = (celsius: number): number => {
  return (9 / 5) * celsius + 32;
};

export const fahrenheitToCelsius = (fahrenheit: number): number => {
  return (5 / 9) * (fahrenheit - 32);
};
