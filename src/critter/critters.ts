import { Critter } from './critter';

export const morb: Critter = Critter.register({
  id: 'glom',
  name: {
    en: 'Morb',
    ja: 'モーブ',
  },
  livableTemp: {
    lower: 273.15,
    upper: 423.15,
  },
  decor: {
    radius: 1,
    value: 10,
  },
  hitPoint: 25,
  caloriesNeeded: 0,
});

export const hatch: Critter = Critter.register({
  id: 'hatch',
  name: {
    en: 'Hatch',
    ja: 'ハッチ',
  },
  livableTemp: {
    lower: 243.15,
    upper: 343.15,
  },
  decor: {
    radius: 1,
    value: 10,
  },
  hitPoint: 25,
  caloriesNeeded: 1.17,
  spaceRequired: 12,
});

export const sageHatch: Critter = Critter.register(hatch, {
  id: 'hatchveggie',
  name: {
    en: 'Sage Hatch',
    ja: 'セイジハッチ',
  },
});

export const stoneHatch: Critter = Critter.register(hatch, {
  id: 'hatchhard',
  name: {
    en: 'Stone Hatch',
    ja: 'ごつごつハッチ',
  },
  hitPoint: 200,
});

export const smoothHatch: Critter = Critter.register(hatch, {
  id: 'hatchmetal',
  name: {
    en: 'Smooth Hatch',
    ja: 'つるつるハッチ',
  },
  hitPoint: 400,
});

export const puft: Critter = Critter.register({
  id: 'puft',
  name: {
    en: 'Puft',
    ja: 'パフ',
  },
  livableTemp: {
    lower: 243.15,
    upper: 378.15,
  },
  decor: {
    radius: 1,
    value: 10,
  },
  caloriesNeeded: 333.33,
  hitPoint: 25,
  spaceRequired: 16,
});

export const puftPrince: Critter = Critter.register(puft, {
  id: 'puftalpha',
  name: {
    en: 'Puft Prince',
    ja: 'パフプリンス',
  },
  livableTemp: {
    lower: 213.15,
    upper: 388.15,
  },
});

export const spankyPuft: Critter = Critter.register(puft, {
  id: 'puftbleachstone',
  name: {
    en: 'Spakky Puft',
    ja: 'やかましパフ',
  },
  livableTemp: {
    lower: 213.15,
    upper: 358.15,
  },
});

export const densePuft: Critter = Critter.register(puft, {
  id: 'puftoxylite',
  name: {
    en: 'Dense Puft',
    ja: 'こってりパフ',
  },
  livableTemp: {
    lower: 258.15,
    upper: 388.15,
  },
});
