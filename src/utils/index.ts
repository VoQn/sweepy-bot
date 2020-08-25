const decimalShift = (x: number, p: number) => {
  const xs = ('' + x).split('e');
  return +(xs[0] + 'e' + (xs[1] ? (+xs[1] + p) : p));
};

/**
 * round a number to any digit.
 * @param number target number
 * @param precision precision digits
 */
export const round = (number: number, precision: number) => {
  return decimalShift(Math.round(decimalShift(number, precision)), -precision);
};

/**
 * return new object with parameter by append values.
 * @param base base object
 * @param append partial values
 */
export const override = <T extends {}>(base: NonNullable<T>, append?: Partial<T>): T => {
  const ret = {} as T;
  for (const key of Object.keys(base) as (keyof T)[]) {
    ret[key] = base[key];
  }
  for (const key of Object.keys(append || {}) as (keyof T)[]) {
    ret[key] = append[key];
  }
  return ret;
};
