import { TemparetureUnit, convertKelvinTemp } from './heat';

interface CritterInfoBase {
  name: {
    internal: string;
    en: string;
    ja: string;
  };
  livableTemp: {
    lower: number;
    upper: number;
  };
  hitPoint: number;
  caloriesNeeded: number;
  spaceRequired?: number;
}

export interface CritterInfo extends CritterInfoBase {
  isBaseType: boolean;
  baseTypeName: string;
}

export class Critter implements CritterInfo {
  public static readonly all: Critter[] = [];

  isBaseType: boolean;
  baseTypeName: string;
  name: {
    internal: string;
    en: string;
    ja: string;
  };
  livableTemp: {
    lower: number;
    upper: number;
  };
  hitPoint: number;
  caloriesNeeded: number;
  spaceRequired?: number;

  constructor(origin: CritterInfoBase, override?: Partial<CritterInfoBase>) {
    this.isBaseType = override == null || Object.keys(override).length < 1;
    this.baseTypeName = origin.name.internal;
    this.name = origin.name;
    this.livableTemp = origin.livableTemp;
    this.hitPoint = origin.hitPoint;
    this.caloriesNeeded = origin.caloriesNeeded;
    this.spaceRequired = origin.spaceRequired;

    if (override?.name) {
      this.name = override.name;
    }

    if (override?.livableTemp) {
      this.livableTemp = override.livableTemp;
    }

    if (override?.hitPoint != null) {
      this.hitPoint = override.hitPoint;
    }

    if (override?.caloriesNeeded != null) {
      this.caloriesNeeded = override.caloriesNeeded;
    }

    if (override?.spaceRequired != null) {
      this.spaceRequired = override.spaceRequired;
    }

    if (!Critter.all.find(critter => critter.name.internal === this.name.internal)) {
      Critter.all.push(this);
    }
  }

  public static findByName(query: string | RegExp, language?: 'en' | 'ja'): Critter {
    const result = this.all.find(critter => {
      switch (language) {
        case 'ja':
          return critter.name.ja.match(query);
        case 'en':
          const name = critter.name.en;
          if (typeof query === 'string') {
            return new Intl.Collator('en', { sensitivity: 'accent' }).compare(name, query) === 0;
          }
          return critter.name.en.match(query);
        default:
          return critter.name.internal.match(query);
      }
    });
    if (result) {
      return result;
    }
    return null;
  }

  public static getEmojiCode(critter: Critter): string {
    return critter.emojiCode;
  }

  get emojiCode(): string {
    return `:${this.name.en.replace(/\s+/, '').toLowerCase}:`;
  }

  public getLivableTemp(unit: TemparetureUnit = 'Celsius'): { lower: number, upper: number } {
    const temp = this.livableTemp;
    return {
      lower: convertKelvinTemp(temp.lower, unit),
      upper: convertKelvinTemp(temp.upper, unit),
    };
  }
}

const hatch: Critter = new Critter({
  name: {
    internal: 'hatch',
    en: 'Hatch',
    ja: 'ハッチ',
  },
  livableTemp: {
    lower: 243.15,
    upper: 343.15,
  },
  hitPoint: 25,
  caloriesNeeded: -1.17,
  spaceRequired: 12,
});

const sageHatch: Critter = new Critter(hatch, {
  name: {
    internal: 'hatchveggie',
    en: 'Sage Hatch',
    ja: 'セイジハッチ',
  },
});

const stoneHatch: Critter = new Critter(hatch, {
  name: {
    internal: 'hatchhard',
    en: 'Stone Hatch',
    ja: 'ごつごつハッチ',
  },
  hitPoint: 200,
});

const smoothHatch: Critter = new Critter(hatch, {
  name: {
    internal: 'hatchmetal',
    en: 'Smooth Hatch',
    ja: 'つるつるハッチ',
  },
  hitPoint: 400,
});

export const critters = {
  hatch,
  sageHatch,
  stoneHatch,
  smoothHatch,
};
