export type NotLessThan<T extends number> = (T | number) & {
  readonly _brand: unique symbol;
};

export const isNotLessThan = <T extends number>(
  l: T,
  x: number
): x is NotLessThan<T> => {
  return l >= x;
};

export const makeNotLessThan = <T extends number>(l: T) => (x: number) => {
  if (!isNotLessThan(l, x)) {
    throw new RangeError(`argument ${x} is less than ${l}`);
  }
  return x as NotLessThan<T>;
};
