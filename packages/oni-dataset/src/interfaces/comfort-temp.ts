import { Celsius } from '@sweepy-bot/physics';

/**
 * 適温の範囲。摂氏基準
 */
export type ConfortTemp = {
  lower: Celsius;
  upper: Celsius;
};
