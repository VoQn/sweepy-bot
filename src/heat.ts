export type TemparetureUnit = 'Kelvin' | 'Celsius' | 'Fahrenheit';

const decimalShift = (x: number, p: number) => {
  const xs = ('' + x).split('e');
  return +(xs[0] + 'e' + (xs[1] ? (+xs[1] + p) : p));
};

const round = (x: number, p: number) => {
  return decimalShift(Math.round(decimalShift(x, p)), -p);
};

export const convertKelvinTemp = (temp: number, unit: TemparetureUnit = 'Celsius') => {
  switch (unit) {
    case 'Celsius':
      return round(temp - 273.15, 2);
    case 'Fahrenheit':
      return round((9 / 5) * temp - 459.67, 2);
    case 'Kelvin':
    default:
      return temp;
  }
};
