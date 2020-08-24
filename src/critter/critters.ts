import { Critter } from './critter';

export const morb: Critter = Critter.register({
  id: 'glom',
  imageURL: 'https://oni-assistant.com/database/critters/glom',
  name: {
    en: 'Morb',
    ja: 'モーブ',
  },
  flavorText: {
    en: 'Morbs are attracted to unhygienic conditions and frequently excrete bursts of Polluted Oxygen.',
    ja: null,
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
  flavorText: {
    en: 'Hatches excrete solid Coal as waste and may be uncovered by digging up Buried Objects.',
  },
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
  caloriesNeeded: 1170,
  spaceRequired: 12,
});

export const sageHatch: Critter = Critter.register(hatch, {
  id: 'hatchveggie',
  imageURL: 'https://oni-db.com/static/media/hatchveggie.43f08b29.png',
  flavorText: {
    en: 'Sage Hatches excrete solid Coal as waste and enjoy burrowing into the ground.',
  },
  name: {
    en: 'Sage Hatch',
    ja: 'セイジハッチ',
  },
});

export const stoneHatch: Critter = Critter.register(hatch, {
  id: 'hatchhard',
  imageURL: 'https://oni-db.com/static/media/hatchhard.3c68ac41.png',
  flavorText: {
    en: 'Stone Hatches excrete solid Coal as waste and enjoy burrowing into the ground.',
  },
  name: {
    en: 'Stone Hatch',
    ja: 'ごつごつハッチ',
  },
  hitPoint: 200,
});

export const smoothHatch: Critter = Critter.register(hatch, {
  id: 'hatchmetal',
  imageURL: 'https://oni-db.com/static/media/hatchmetal.81bf83ad.png',
  flavorText: {
    en: 'Smooth Hatches enjoy burrowing into the ground and excrete Refined Metal when fed Metal Ore.',
  },
  name: {
    en: 'Smooth Hatch',
    ja: 'つるつるハッチ',
  },
  hitPoint: 400,
});

export const puft: Critter = Critter.register({
  id: 'puft',
  imageURL: 'https://oni-db.com/static/media/puft.fcd3ca60.png',
  flavorText: {
    en: 'Pufts are non-aggressive critters that excrete lumps of Slime with each breath.',
  },
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
  flavorText: {
    en: 'The Puft Prince is a lazy critter that excretes little lumps of Slime with each breath.',
  },
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
  flavorText: {
    en: 'Squeaky Pufts are non-aggressive critters that excrete lumps of Bleachstone with each breath.',
  },
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
  flavorText: {
    en: 'Dense Pufts are non-aggressive critters that excrete condensed Oxylite with each breath.',
  },
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
  flavorText: {
    en: 'Pips are pesky, nonhostile critters that subsist on the branches of Arbor Trees.\n' +
      'They are known to bury Seeds in the ground whenever they can find a suitable area with enough space.',
  },
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

export const poleShell: Critter = Critter.register({
  id: 'crab',
  imageURL: 'https://oni-db.com/static/media/crab.49f7a55b.png',
  flavorText: {
    en: 'Pokeshells are nonhostile critters that eat Polluted Dirt and Rot Piles.\n' +
      'The shells they leave behind after molting can be crushed into Lime.',
  },
  name: {
    en: 'Poke Shell',
    ja: 'ポークシェル',
  },
  livableTemp: {
    lower: -30,
    upper: 100,
  },
  decor: {
    radius: 1,
    value: 10,
  },
  caloriesNeeded: 166.67,
  hitPoint: 25,
  spaceRequired: 12,
});

export const shoveVole = Critter.register({
  id: 'mole',
  imageURL: 'https://oni-db.com/static/media/mole.047061d6.png',
  flavorText: {
    en: 'Shove Voles are burrowing critters that eat the Regolith collected on terrestrial surfaces.\n' +
      'They cannot burrow through Refined Metals.',
  },
  name: {
    en: 'Shove Vole',
    ja: 'ぐりぐりネズミ',
  },
  livableTemp: {
    lower: -200,
    upper: 500,
  },
  decor: {
    radius: 1,
    value: 0,
  },
  caloriesNeeded: 8000,
  hitPoint: 25,
});

export const gassyMoo = Critter.register({
  id: 'moo',
  imageURL: 'https://oni-db.com/static/media/moo.64332eff.png',
  flavorText: {
    en: 'Moos are extraterrestrial critters that feed on Gas Grass and excrete Natural Gas.',
  },
  name: {
    en: 'Gassy Moo',
    ja: 'ぷすぷすモー',
  },
  livableTemp: {
    lower: -200,
    upper: 200,
  },
  decor: {
    radius: 1,
    value: 10,
  },
  caloriesNeeded: 333.33,
  hitPoint: 25,
  spaceRequired: 16,
});

export const drecko = Critter.register({
  id: 'drecko',
  imageURL: 'https://oni-db.com/static/media/drecko.13441e24.png',
  flavorText: {
    en: 'Dreckos are nonhostile critters that graze only on live Mealwood Plants.\n' +
      '\n' +
      'Their backsides are covered in thick woolly fibers that only grow in Hydrogen climates.',
  },
  name: {
    en: 'Drecko',
    ja: 'ドレッコ',
  },
  livableTemp: {
    lower: 15,
    upper: 110,
  },
  decor: {
    radius: 1,
    value: 10,
  },
  caloriesNeeded: 3330,
  hitPoint: 25,
  spaceRequired: 12,
});

export const glossyDrecko = Critter.register(drecko, {
  id: 'dreckoplastic',
  imageURL: 'https://oni-db.com/static/media/dreckoplastic.8a5171c9.png',
  flavorText: {
    en: 'Glossy Dreckos are nonhostile critters that graze only on live Mealwood Plants.\n' +
      'Their backsides are covered in bioplastic scales that only grow in Hydrogen climates.',
  },
  name: {
    en: 'Glossy Drecko',
    ja: 'つやつやドレッコ',
  },
  livableTemp: {
    lower: 5,
    upper: 80,
  },
});

export const slickster = Critter.register({
  id: 'oilfloater',
  imageURL: 'https://oni-assistant.com/assets/elements/oilfloater-edf4ba0749925568d5dddb3de4121a67655211d0088baa4115f425b8b0344c19.png',
  flavorText: {
    en: 'Slicksters are slimy critters that consume Carbon Dioxide and exude Crude Oil.',
  },
  name: {
    en: 'Slickster',
    ja: 'スリックスター',
  },
  livableTemp: {
    lower: 35,
    upper: 160,
  },
  decor: {
    radius: 2,
    value: 15,
  },
  caloriesNeeded: 200,
  hitPoint: 25,
  spaceRequired: 12,
});

export const moltenSlickster = Critter.register(slickster, {
  id: 'oilfloaterhightemp',
  imageURL: 'https://oni-assistant.com/assets/elements/oilfloaterhightemp-5aaf984823606cdb18452bc94373edadcfc471bd627ec21e3ec5488f3cd2113c.png',
  flavorText: {
    en: 'Molten Slicksters are slimy critters that consume Carbon Dioxide and exude Petroleum.',
  },
  name: {
    en: 'Molten Slickster',
    ja: 'とろとろスリックスター',
  },
  livableTemp: {
    lower: 75,
    upper: 270,
  },
});

export const longhairSlickster = Critter.register(slickster, {
  id: 'oilfloaterdecor',
  // tslint:disable-next-line: max-line-length
  imageURL: 'https://oni-assistant.com/assets/elements/oilfloaterdecor-0fe382ede364d89d9edc455a589338b6da3e82c5d0c3084bb5ab4322a47e3604.png',
  flavorText: {
    en: 'Longhair Slicksters are friendly critters that consume Oxygen and thrive in close contact with Duplicant companions.\n' +
      'Longhairs have extremely beautiful and luxurious coats.',
  },
  name: {
    en: 'Longhair Slickster',
    ja: 'ふさふさスリックスター',
  },
  livableTemp: {
    lower: -5,
    upper: 90,
  },
  decor: {
    radius: 7,
    value: 50,
  },
});
