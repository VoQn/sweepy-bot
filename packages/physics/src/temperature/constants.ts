export const UnitName = ['Kelvin', 'Celsius', 'Fahrenheit'] as const;
export type UnitName = typeof UnitName[number];

export const UnitSymbol = {
  Kelvin: 'K',
  Celsius: '°C',
  Fahrenheit: '°F',
} as const;
export type UnitSymbol = typeof UnitSymbol[UnitName];

export const ZeroDegrees = {
  Kelvin: 0,
  Celsius: 273.15,
  Fahrenheit: 255.37,
} as const;
export type ZeroDegrees = typeof ZeroDegrees[UnitName];

export const AbsoluteZero = {
  Kelvin: 0,
  Celsius: -273.15,
  Fahrenheit: -459.67,
} as const;
export type AbsoluteZero = typeof AbsoluteZero[UnitName];
