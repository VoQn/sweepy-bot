import { Celsius } from '@sweepy-bot/physics';

/**
 * 生存可能な体温の範囲。摂氏基準
 */
export type LivableTemp = {
  /** 生存可能な体温の下限 */
  lower: Celsius;
  /** 生存可能な体温の上限 */
  upper: Celsius;
};
