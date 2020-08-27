import { Emoji, Client } from 'discord.js';

const decimalShift = (x: number, p: number): number => {
  const xs = `${x}`.split('e');
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  return +(xs[0] + 'e' + (xs[1] ? +xs[1] + p : p));
};

/**
 * round a number to any digit.
 * @param x target number
 * @param precision precision digits
 */
export const round = (x: number, precision: number): number => {
  return decimalShift(Math.round(decimalShift(x, precision)), -precision);
};

/**
 * return new object with parameter by append values.
 * @param base base object
 * @param append partial values
 */
export const override = <T>(base: NonNullable<T>, append?: Partial<T>): T => {
  const ret: T = {} as T;
  for (const key of Object.keys(base) as (keyof T)[]) {
    ret[key] = base[key];
  }
  for (const key of Object.keys(append || {}) as (keyof T)[]) {
    ret[key] = append[key];
  }
  return ret;
};

export const getCustomEmoji = (
  name: string,
  client?: Client
): string | Emoji => {
  if (client == null) {
    return `:${name}:`;
  }
  return client.emojis.cache.find((v) => v.name === name);
};

export const blankField = (
  inline = false
): { name: string; value: string; inline?: boolean } => {
  return { name: '\u200B', value: '\u200B', inline };
};

export * from './text';
