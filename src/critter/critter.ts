import { ID, Multilingal, OniEntity } from '../types';
import { override } from '../utils';

export type LivableTemp = {
  lower: number;
  upper: number;
};

/** 装飾値影響 */
export type Decor = {
  /** 装飾値加算がなされる範囲 (半径) */
  radius: number;
  /** 範囲内で加算される装飾値 */
  value: number;
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

export class Critter implements CritterInfo {
  public static readonly table: Map<ID, Critter> = new Map<ID, Critter>();

  readonly isBaseType: boolean;
  readonly baseTypeName: ID;
  readonly id: ID;
  readonly name: Multilingal;
  readonly imageURL: string;
  readonly flavorText: Multilingal;
  readonly livableTemp: LivableTemp;
  readonly decor: Decor;
  readonly caloriesNeeded: number;
  readonly hitPoint: number;
  readonly spaceRequired?: number;
  readonly layAnEgg?: number;
  readonly hatches?: number;
  readonly lifeSpan?: number;
  readonly lightEmitter?: LightEmitter;

  public static compare(a: Critter, b: Critter): number {
    if (a.isBaseType && b.isBaseType) {
      return a.id.length - b.id.length;
    }
    if (b.isBaseType) {
      return 1;
    }
    if (a.isBaseType) {
      return -1;
    }
    return 0;
  }

  public static findByName(query: string | RegExp): Critter {
    let lang: 'en' | 'ja' = 'en';
    if (typeof query === 'string') {
      if (/^[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]+$/.test(query)) {
        // たぶん日本語で検索してる
        lang = 'ja';
      } else if (/^[a-zA-Z]+.?$/.test(query)) {
        // たぶん英語で探してる
        lang = 'en';
        if (this.table.has(query)) {
          return this.table.get(query);
        }
      }
    }
    const pattern = typeof query !== 'string' ? query : new RegExp(query.replace(/[^\S\n]/, '\\s?'), 'i');
    const matched: Critter[] = [];
    for (const critter of this.table.values()) {
      const name = critter.name[lang].replace(/[^\S\n]+/, '');
      if (name.match(pattern)) {
        matched.push(critter);
      }
    }
    if (matched.length === 0) {
      return null;
    }
    return matched.sort(this.compare)[0];
  }

  public static register(origin: CritterInfoBase, append?: FamiliyCritterInfo): Critter {
    const id = append?.id || origin.id;
    const cache = this.table.get(id);
    if (cache) {
      return cache;
    }
    const critter = new Critter(origin, append);
    this.table.set(id, critter);
    return critter;
  }

  public static getEmojiCode(critter: string | Critter): string {
    if (typeof critter === 'string') {
      return this.findByName(critter)?.emojiCode;
    }
    return critter.emojiCode;
  }

  private constructor(origin: CritterInfoBase, append?: FamiliyCritterInfo) {
    const isBaseType = override == null || Object.keys(override).length < 1;
    this.isBaseType = isBaseType;
    this.baseTypeName = origin.id;

    const param = override(origin, append);
    this.id = param.id;
    this.name = param.name;
    this.imageURL = param.imageURL;
    this.flavorText = param.flavorText;
    this.livableTemp = param.livableTemp;
    this.decor = param.decor;
    this.hitPoint = param.hitPoint;
    this.spaceRequired = param.spaceRequired;
    this.lifeSpan = param.lifeSpan;
    this.layAnEgg = param.layAnEgg;
    this.hatches = param.hatches;
    this.lightEmitter = param.lightEmitter;
  }

  public get emojiName(): string {
    return this.name.en.toLowerCase().replace(/\s+/, '');
  }

  public get emojiCode(): string {
    return `:${this.emojiName}:`;
  }
}
