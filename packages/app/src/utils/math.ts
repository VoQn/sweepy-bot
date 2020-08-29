const decimalShift = (x: number, p: number): number => {
  const xs = `${x}`.split('e');
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  return parseFloat(`${xs[0]}e${xs[1] ? parseFloat(xs[1]) + p : p}`);
  // return +(xs[0] + 'e' + (xs[1] ? +xs[1] + p : p));
};

/**
 * round a number to any digit.
 * @param x target number
 * @param precision precision digits
 */
export const round = (x: number, precision: number): number => {
  return decimalShift(Math.round(decimalShift(x, precision)), -precision);
};
