import { Critter } from './critter';

export const hatch: Critter = new Critter({
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

export const sageHatch: Critter = new Critter(hatch, {
  name: {
    internal: 'hatchveggie',
    en: 'Sage Hatch',
    ja: 'セイジハッチ',
  },
});

export const stoneHatch: Critter = new Critter(hatch, {
  name: {
    internal: 'hatchhard',
    en: 'Stone Hatch',
    ja: 'ごつごつハッチ',
  },
  hitPoint: 200,
});

export const smoothHatch: Critter = new Critter(hatch, {
  name: {
    internal: 'hatchmetal',
    en: 'Smooth Hatch',
    ja: 'つるつるハッチ',
  },
  hitPoint: 400,
});
