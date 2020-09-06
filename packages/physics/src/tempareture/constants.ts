export const ZeroDegree = {
  Kelvin: 0,
  Celsius: -273.15,
  Fahrenheit: -459.67,
} as const;
export type ZeroDegree = typeof ZeroDegree[keyof typeof ZeroDegree];

export const TemparetureUnit = {
  Kelvin: 'K',
  Celsius: '°C',
  Fahrenheit: '°F',
} as const;
export type TemparetureUnit = typeof TemparetureUnit[keyof typeof TemparetureUnit];
