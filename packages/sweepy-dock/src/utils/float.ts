function splitFloatStr(num: number) {
  // [digits].[decimals]
  const [digits, decimals] = num.toString().split('.');

  return { digits, decimals: decimals ? `.${decimals}` : '' };
}

export type FloatLength = { digits: number; decimals: number };

const floatLengthMax = (a: FloatLength, b: FloatLength): FloatLength => {
  return {
    digits: Math.max(a.digits, b.digits),
    decimals: Math.max(a.decimals, b.decimals),
  };
};

/**
 * return best (largest) padding for numbers.
 * You can use padding to `padFloat`
 * @param numbers target float numbers
 * @returns padding
 */
export const paddingForFloats = (numbers: Array<number>): FloatLength => {
  return numbers.map(lengthFloat).reduce((max, e) => floatLengthMax(max, e));
};

/**
 * return digits-part length and decimals-part length of giving float
 * note: decimals-part including the period
 * @param number target float number
 */
export const lengthFloat = (number: number): FloatLength => {
  const { digits, decimals } = splitFloatStr(number);

  return { digits: digits.length, decimals: decimals.length };
};

/**
 * return string-expression of giving number WITH padding to each part of the float.
 * padding can calculate by `lengthFloat`
 * @param number target number
 * @param padding digits: padding to digits-part, decimals: padding to decimals-part
 */
export const padFloat = (number: number, padding: FloatLength): string => {
  const { digits, decimals } = splitFloatStr(number);

  return digits.padStart(padding.digits) + decimals.padEnd(padding.decimals);
};
