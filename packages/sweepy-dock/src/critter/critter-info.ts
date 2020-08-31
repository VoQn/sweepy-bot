import { Decor, ID, OniEntity } from '../interfaces';

/**
 * 生存可能な体温の範囲。摂氏基準
 */
export type LivableTemp = {
  lower: number;
  upper: number;
};

/**
 * 周囲に与える光源影響
 * (現在ではシャインバグ種のみ)
 */
export type LightEmitter = {
  range: number;
  lux: number;
};

export interface CritterInfoBase extends OniEntity {
  /** 生存可能な体温の範囲 (℃) */
  livableTemp: LivableTemp;

  /** 装飾値影響 */
  decor: Decor;

  /** 生存中消費されるカロリー (テイム時かつ幸福の状態を基準) (cal/sec) */
  caloriesNeeded: number;

  /** 体力の最大値 (０になったら死亡) */
  hitPoint: number;

  /** 過密判定される１匹あたりに必要な空間スペース (tile) */
  spaceRequired?: number;

  /** 1匹あたり卵を産むペース (テイム時かつ幸福の状態を基準) (sec) */
  layAnEgg?: number;

  /** 卵から孵化するまでの長さ (sec) */
  hatches?: number;

  /** 孵化から寿命を迎えるまでの長さ (sec) */
  lifeSpan?: number;

  /** 周囲に与える光源影響 */
  lightEmitter?: LightEmitter;
}

export interface CritterInfo extends CritterInfoBase {
  isBaseType: boolean;
  baseTypeName: ID;
}

export type FamiliyCritterInfo = Partial<CritterInfoBase> & OniEntity;
