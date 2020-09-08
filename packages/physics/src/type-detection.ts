export const isNumber = (x: unknown): x is number => {
  return typeof x === 'number';
};

export const isString = (x: unknown): x is string => {
  return typeof x === 'string';
};
