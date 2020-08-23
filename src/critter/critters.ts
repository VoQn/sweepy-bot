import { Critter } from './critter';

export const morb: Critter = Critter.register({
  id: 'glom',
  imageURL: 'data:image/png;base64,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',
  name: {
    en: 'Morb',
    ja: 'モーブ',
  },
  livableTemp: {
    lower: 0,
    upper: 150,
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
  imageURL: 'https://oni-db.com/static/media/hatch.9ac84da3.png',
  name: {
    en: 'Hatch',
    ja: 'ハッチ',
  },
  livableTemp: {
    lower: -30,
    upper: 70,
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
  imageURL: 'https://oni-db.com/static/media/hatchveggie.43f08b29.png',
  name: {
    en: 'Sage Hatch',
    ja: 'セイジハッチ',
  },
});

export const stoneHatch: Critter = Critter.register(hatch, {
  id: 'hatchhard',
  imageURL: 'https://oni-db.com/static/media/hatchhard.3c68ac41.png',
  name: {
    en: 'Stone Hatch',
    ja: 'ごつごつハッチ',
  },
  hitPoint: 200,
});

export const smoothHatch: Critter = Critter.register(hatch, {
  id: 'hatchmetal',
  imageURL: 'https://oni-db.com/static/media/hatchmetal.81bf83ad.png',
  name: {
    en: 'Smooth Hatch',
    ja: 'つるつるハッチ',
  },
  hitPoint: 400,
});

export const puft: Critter = Critter.register({
  id: 'puft',
  imageURL: 'https://oni-db.com/static/media/puft.fcd3ca60.png',
  name: {
    en: 'Puft',
    ja: 'パフ',
  },
  livableTemp: {
    lower: -30,
    upper: 105,
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
  imageURL: 'https://oni-db.com/static/media/puftalpha.863f5c27.png',
  name: {
    en: 'Puft Prince',
    ja: 'パフプリンス',
  },
  livableTemp: {
    lower: -60,
    upper: 115,
  },
});

export const spankyPuft: Critter = Critter.register(puft, {
  id: 'puftbleachstone',
  imageURL: 'https://oni-db.com/static/media/puftbleachstone.ed1f806a.png',
  name: {
    en: 'Spakky Puft',
    ja: 'やかましパフ',
  },
  livableTemp: {
    lower: -60,
    upper: 85,
  },
});

export const densePuft: Critter = Critter.register(puft, {
  id: 'puftoxylite',
  imageURL: 'https://oni-db.com/static/media/puftoxylite.fd06a3d5.png',
  name: {
    en: 'Dense Puft',
    ja: 'こってりパフ',
  },
  livableTemp: {
    lower: -15,
    upper: 115,
  },
});

export const pip: Critter = Critter.register({
  id: 'squirrel',
  imageURL: 'https://oni-db.com/static/media/squirrel.cec15472.png',
  name: {
    en: 'Pip',
    ja: 'ピップ',
  },
  livableTemp: {
    lower: -30,
    upper: 70,
  },
  decor: {
    radius: 1,
    value: 10,
  },
  caloriesNeeded: 166.67,
  hitPoint: 25,
  spaceRequired: 12,
});
