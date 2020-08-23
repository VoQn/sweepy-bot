export interface CritterInfoBase {
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
