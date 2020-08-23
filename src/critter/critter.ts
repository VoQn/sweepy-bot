import { TemparetureUnit, convertKelvinTemp } from '../heat';
export type ID = string;

export type HasId = {
  id: ID;
};

export type CritterName = {
  en: string;
  ja: string;
};

export type HasName<N> = { name: N };

export type LivableTemp = {
  lower: number;
  upper: number;
};

export type Decor = {
  radius: number;
  value: number;
};

export interface CritterInfoBase extends HasId, HasName<CritterName> {
  imageURL: string;
  livableTemp: LivableTemp;
  decor: Decor;
  caloriesNeeded: number;
  hitPoint: number;
  spaceRequired?: number;
}

export interface CritterInfo extends CritterInfoBase {
  isBaseType: boolean;
  baseTypeName: ID;
}

export type FamiliyCritterInfo = Partial<CritterInfoBase> & HasId & { name: CritterName, imageURL: string };

export class Critter implements CritterInfo {
  public static readonly table: Map<ID, Critter> = new Map<ID, Critter>();

  public readonly isBaseType: boolean;
  public readonly baseTypeName: ID;
  public readonly id: ID;
  public readonly name: CritterName;

  private origin: CritterInfoBase;
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

    this.origin = origin;
    this.override = override;

    if (isBaseType) {
      this.id = origin.id;
      this.name = origin.name;
      return;
    }

    this.id = override.id;
    this.name = override.name;
  }

  public get emojiCode(): string {
    const code = this.name.en.toLowerCase().replace(/\s+/, '');
    return `:${code}:`;
  }

  public get imageURL(): string {
    if (!this.isBaseType && this.override?.imageURL) {
      return this.override.imageURL;
    }
    return this.origin.imageURL;
  }

  public get livableTemp(): LivableTemp {
    if (!this.isBaseType && this.override?.livableTemp) {
      return this.override.livableTemp;
    }
    return this.origin.livableTemp;
  }

  public get decor(): Decor {
    if (!this.isBaseType && this.override?.decor) {
      return this.override.decor;
    }
    return this.origin.decor;
  }

  public get caloriesNeeded(): number {
    if (!this.isBaseType && this.override?.caloriesNeeded != null) {
      return this.override.caloriesNeeded;
    }
    return this.origin.caloriesNeeded;
  }

  public get hitPoint(): number {
    if (!this.isBaseType && this.override.hitPoint != null) {
      return this.override.hitPoint;
    }
    return this.origin.hitPoint;
  }

  public get spaceRequired(): number | null {
    if (!this.spaceRequired && this.override?.spaceRequired != null) {
      return this.override.spaceRequired;
    }
    return this.origin.spaceRequired;
  }
}
