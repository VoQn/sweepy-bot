export type ID = string;

export type HasId = {
  /** ONIのゲーム内部で使われている内部登録名 */
  id: ID;
};

export type CritterName = {
  en: string;
  ja?: string;
};

export type FlavorText = {
  en: string;
  ja?: string;
};

export type HasName<N> = { name: N };

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

export interface CritterInfoBase extends HasId, HasName<CritterName> {
  imageURL: string;

  /** フレーバーテキスト */
  flavorText: FlavorText;

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

export type FamilyCritterRequired = {
  id: ID;
  name: CritterName,
  imageURL: string,
  flavorText: FlavorText;
};

export interface CritterInfo extends CritterInfoBase {
  isBaseType: boolean;
  baseTypeName: ID;
}

export type FamiliyCritterInfo = Partial<CritterInfoBase> & FamilyCritterRequired;

export class Critter implements CritterInfo {
  public static readonly table: Map<ID, Critter> = new Map<ID, Critter>();

  public readonly isBaseType: boolean;
  public readonly baseTypeName: ID;
  public readonly id: ID;
  public readonly name: CritterName;

  private base: CritterInfoBase;
  private override?: FamiliyCritterInfo;

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
    for (const [_id, critter] of this.table) {
      if (critter.name[lang].replace(/[^\S\n]+/, '').match(pattern)) {
        matched.push(critter);
      }
    }
    if (matched.length === 0) {
      return null;
    }
    const sort = (a: Critter, b: Critter): number => {
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
    };
    return matched.sort(sort)[0];
  }

  public static register(origin: CritterInfoBase, override?: FamiliyCritterInfo): Critter {
    const id = override?.id || origin.id;
    const cache = this.table.get(id);
    if (cache) {
      return cache;
    }
    const critter = new Critter(origin, override);
    this.table.set(id, critter);
    return critter;
  }

  public static getEmojiCode(critter: string | Critter): string {
    if (typeof critter === 'string') {
      return this.findByName(critter)?.emojiCode;
    }
    return critter.emojiCode;
  }

  private constructor(origin: CritterInfoBase, override?: FamiliyCritterInfo) {
    const isBaseType = override == null || Object.keys(override).length < 1;
    this.isBaseType = isBaseType;
    this.baseTypeName = origin.id;

    if (isBaseType) {
      this.id = origin.id;
      this.name = origin.name;
    } else {
      this.id = override.id;
      this.name = override.name;
    }

    this.base = origin;
    this.override = override;

    if (isBaseType) {
      this.id = origin.id;
      this.name = origin.name;
      return;
    }

    this.id = override.id;
    this.name = override.name;
  }

  public get emojiName(): string {
    return this.name.en.toLowerCase().replace(/\s+/, '');
  }

  public get emojiCode(): string {
    return `:${this.emojiName}:`;
  }

  public get imageURL(): string {
    if (!this.isBaseType && this.override?.imageURL) {
      return this.override.imageURL;
    }
    return this.base.imageURL;
  }

  public get flavorText(): { en: string, ja?: string } {
    if (!this.isBaseType && this.override?.flavorText) {
      return this.override.flavorText;
    }
    return this.base.flavorText;
  }

  public get livableTemp(): LivableTemp {
    if (!this.isBaseType && this.override?.livableTemp) {
      return this.override.livableTemp;
    }
    return this.base.livableTemp;
  }

  public get decor(): Decor {
    if (!this.isBaseType && this.override?.decor) {
      return this.override.decor;
    }
    return this.base.decor;
  }

  public get caloriesNeeded(): number {
    if (!this.isBaseType && this.override?.caloriesNeeded != null) {
      return this.override.caloriesNeeded;
    }
    return this.base.caloriesNeeded;
  }

  public get hitPoint(): number {
    if (!this.isBaseType && this.override.hitPoint != null) {
      return this.override.hitPoint;
    }
    return this.base.hitPoint;
  }

  public get spaceRequired(): number | null {
    if (!this.isBaseType && this.override?.spaceRequired != null) {
      return this.override.spaceRequired;
    }
    return this.base.spaceRequired;
  }

  public get layAnEgg(): number | null {
    if (!this.isBaseType && this.override?.layAnEgg != null) {
      return this.override.layAnEgg;
    }
    return this.base.layAnEgg;
  }

  public get hatches(): number | null {
    if (!this.isBaseType && this.override?.hatches != null) {
      return this.override.hatches;
    }
    return this.base.hatches;
  }

  public get lifeSpan(): number | null {
    if (!this.isBaseType && this.override?.lifeSpan != null) {
      return this.override.lifeSpan;
    }
    return this.base.lifeSpan;
  }

  public get lightEmitter(): LightEmitter | null {
    if (!this.isBaseType && this.override?.lightEmitter != null) {
      return this.override.lightEmitter;
    }
    return this.base.lightEmitter;
  }
}
