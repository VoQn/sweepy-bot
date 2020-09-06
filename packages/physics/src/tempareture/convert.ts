import { ZeroDegree } from './constants';

export const kelvinToCelsius = (kelvin: number): number => {
  return kelvin + ZeroDegree.Celsius;
};

export const celsiusToKelvin = (celsius: number): number => {
  return celsius - ZeroDegree.Celsius;
};

export const kelvinToFahrenheit = (kelvin: number): number => {
  return (9 / 5) * kelvin + ZeroDegree.Fahrenheit;
};

export const fahrenheitToKelvin = (fahrenheit: number): number => {
  return (5 / 9) * (fahrenheit - ZeroDegree.Fahrenheit);
};

export const celsiusToFahrenheit = (celsius: number): number => {
  return (9 / 5) * celsius + 32;
};

export const fahrenheitToCelsius = (fahrenheit: number): number => {
  return (5 / 9) * (fahrenheit - 32);
};
