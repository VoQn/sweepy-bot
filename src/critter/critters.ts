import { Critter } from './critter';

export const morb: Critter = Critter.register({
  id: 'glom',
  imageURL: 'https://oni-assistant.com/database/critters/glom',
  name: {
    en: 'Morb',
    ja: 'モーブ',
  },
  flavorText: {
    en:
      'Morbs are attracted to unhygienic conditions and frequently excrete bursts of Polluted Oxygen.',
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
    en:
      'Hatches excrete solid Coal as waste and may be uncovered by digging up Buried Objects.',
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
  layAnEgg: 3600,
  hatches: 12000,
  lifeSpan: 60000,
});

export const sageHatch: Critter = Critter.register(hatch, {
  id: 'hatchveggie',
  imageURL: 'https://oni-db.com/static/media/hatchveggie.43f08b29.png',
  flavorText: {
    en:
      'Sage Hatches excrete solid Coal as waste and enjoy burrowing into the ground.',
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
    en:
      'Stone Hatches excrete solid Coal as waste and enjoy burrowing into the ground.',
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
    en:
      'Smooth Hatches enjoy burrowing into the ground and excrete Refined Metal when fed Metal Ore.',
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
    en:
      'Pufts are non-aggressive critters that excrete lumps of Slime with each breath.',
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
  layAnEgg: 2700,
  hatches: 9000,
  lifeSpan: 45000,
});

export const puftPrince: Critter = Critter.register(puft, {
  id: 'puftalpha',
  imageURL: 'https://oni-db.com/static/media/puftalpha.863f5c27.png',
  flavorText: {
    en:
      'The Puft Prince is a lazy critter that excretes little lumps of Slime with each breath.',
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
    en:
      'Squeaky Pufts are non-aggressive critters that excrete lumps of Bleachstone with each breath.',
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
    en:
      'Dense Pufts are non-aggressive critters that excrete condensed Oxylite with each breath.',
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
    en: [
      'Pips are pesky, nonhostile critters that subsist on the branches of Arbor Trees.',
      'They are known to bury Seeds in the ground whenever they can find a suitable area with enough space.',
    ].join('\n'),
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
  layAnEgg: 3600,
  hatches: 12000,
  lifeSpan: 60000,
});

export const poleShell: Critter = Critter.register({
  id: 'crab',
  imageURL: 'https://oni-db.com/static/media/crab.49f7a55b.png',
  flavorText: {
    en:
      'Pokeshells are nonhostile critters that eat Polluted Dirt and Rot Piles.\n' +
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
  layAnEgg: 3600,
  hatches: 12000,
  lifeSpan: 60000,
});

export const shoveVole = Critter.register({
  id: 'mole',
  imageURL: 'https://oni-db.com/static/media/mole.047061d6.png',
  flavorText: {
    en: [
      'Shove Voles are burrowing critters that eat the Regolith collected on terrestrial surfaces.',
      'They cannot burrow through Refined Metals.',
    ].join('\n'),
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
  layAnEgg: 3600,
  hatches: 12000,
  lifeSpan: 60000,
});

export const gassyMoo = Critter.register({
  id: 'moo',
  imageURL: 'https://oni-db.com/static/media/moo.64332eff.png',
  flavorText: {
    en:
      'Moos are extraterrestrial critters that feed on Gas Grass and excrete Natural Gas.',
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
  lifeSpan: 45000,
});

export const drecko = Critter.register({
  id: 'drecko',
  imageURL: 'https://oni-db.com/static/media/drecko.13441e24.png',
  flavorText: {
    en: [
      'Dreckos are nonhostile critters that graze only on live Mealwood Plants.',
      'Their backsides are covered in thick woolly fibers that only grow in Hydrogen climates.',
    ].join('\n'),
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
  layAnEgg: 5400,
  hatches: 18000,
  lifeSpan: 90000,
});

export const glossyDrecko = Critter.register(drecko, {
  id: 'dreckoplastic',
  imageURL: 'https://oni-db.com/static/media/dreckoplastic.8a5171c9.png',
  flavorText: {
    en: [
      'Glossy Dreckos are nonhostile critters that graze only on live Mealwood Plants.',
      'Their backsides are covered in bioplastic scales that only grow in Hydrogen climates.',
    ].join('\n'),
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
  imageURL:
    'https://oni-assistant.com/assets/elements/oilfloater-edf4ba0749925568d5dddb3de4121a67655211d0088baa4115f425b8b0344c19.png',
  flavorText: {
    en:
      'Slicksters are slimy critters that consume Carbon Dioxide and exude Crude Oil.',
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
  layAnEgg: 3600,
  hatches: 12000,
  lifeSpan: 60000,
});

export const moltenSlickster = Critter.register(slickster, {
  id: 'oilfloaterhightemp',
  imageURL:
    'https://oni-assistant.com/assets/elements/oilfloaterhightemp-5aaf984823606cdb18452bc94373edadcfc471bd627ec21e3ec5488f3cd2113c.png',
  flavorText: {
    en:
      'Molten Slicksters are slimy critters that consume Carbon Dioxide and exude Petroleum.',
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
  imageURL:
    'https://oni-assistant.com/assets/elements/oilfloaterdecor-0fe382ede364d89d9edc455a589338b6da3e82c5d0c3084bb5ab4322a47e3604.png',
  flavorText: {
    en: [
      'Longhair Slicksters are friendly critters that consume Oxygen and thrive in close contact with Duplicant companions.',
      'Longhairs have extremely beautiful and luxurious coats.',
    ].join('\n'),
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
  layAnEgg: 5400,
  hatches: 18000,
  lifeSpan: 90000,
});

export const pacu = Critter.register({
  id: 'pacu',
  imageURL:
    'https://oni-assistant.com/assets/elements/pacu-fa8d5c7f61c0cb2999b18bd695df51d0a5c40c0d69ce5bc94027de489c0ba11f.png',
  flavorText: {
    en:
      'Pacus are aquatic creatures that cannot live outside of Water or Contaminated Water.\n' +
      'Every organism in the known universe finds the Pacu extremely delicious.',
  },
  name: {
    en: 'Pacu',
    ja: 'パクー',
  },
  livableTemp: {
    lower: -20,
    upper: 80,
  },
  decor: {
    radius: 1,
    value: 10,
  },
  caloriesNeeded: 166.67,
  hitPoint: 25,
  spaceRequired: 8,
  layAnEgg: 900,
  hatches: 3000,
  lifeSpan: 15000,
});

export const gulpFish = Critter.register(pacu, {
  id: 'pacucleaner',
  imageURL:
    'https://oni-assistant.com/assets/elements/pacucleaner-21e4f8471460384a5380607e819711738452e5e71ca7cdf5aaef1856aace812f.png',
  flavorText: {
    en:
      'Every organism in the known universe finds the Pacu extremely delicious.',
  },
  name: {
    en: 'Gulp Fish',
    ja: 'がぶ飲みフィッシュ',
  },
  livableTemp: {
    lower: -50,
    upper: 25,
  },
});

export const tropicalPacu = Critter.register(pacu, {
  id: 'pacutropical',
  imageURL:
    'https://oni-assistant.com/assets/elements/pacutropical-0c786e3ed85f8d9d2e42c5af9d45fecc6cf1d1bb27c0e44288a4368dfe5fa93b.png',
  flavorText: {
    en:
      'Every organism in the known universe finds the Pacu extremely delicious.',
  },
  name: {
    en: 'Tropical Pacu',
    ja: '熱帯パクー',
  },
  livableTemp: {
    lower: 10,
    upper: 100,
  },
  decor: {
    radius: 5,
    value: 25,
  },
});

export const shineBug = Critter.register({
  id: 'lightbug',
  imageURL:
    'https://oni-assistant.com/assets/elements/lightbug-605a1ef77042284ad82c3d5e50e2abb693ceaedcee29366705c5999f6e7928a1.png',
  flavorText: {
    en:
      'Shine Bugs emit a soft Light in hopes of attracting more of their kind for company.',
  },
  name: {
    en: 'Shine Bug',
    ja: 'シャインバグ',
  },
  livableTemp: {
    lower: -20.15,
    upper: 49.85,
  },
  decor: {
    radius: 5,
    value: 30,
  },
  caloriesNeeded: 66.67,
  hitPoint: 5,
  spaceRequired: 12,
  layAnEgg: 900,
  hatches: 3000,
  lifeSpan: 15000,
  lightEmitter: {
    range: 5,
    lux: 1800,
  },
});

export const sunBug = Critter.register(shineBug, {
  id: 'lightbugorange',
  imageURL:
    'https://oni-assistant.com/assets/elements/lightbugorange-6ceb9fc4c6faeb91e695f69b928536092b50a70ba4a450657ef37125f1828510.png',
  flavorText: {
    en:
      'Shine Bugs emit a soft Light in hopes of attracting more of their kind for company.\n' +
      'The light of the Sun morph has been turned orange through selective breeding.',
  },
  name: {
    en: 'Sun Bug',
    ja: '太陽バグ',
  },
  decor: {
    radius: 7,
    value: 50,
  },
});

export const coralBug = Critter.register(shineBug, {
  id: 'lightbugpink',
  imageURL:
    'https://oni-assistant.com/assets/elements/lightbugpink-1f57547a1156e465b9561cb5b1a711a92682e6be9cc026ecca9f6ea011e75988.png',
  flavorText: {
    en:
      'Shine Bugs emit a soft Light in hopes of attracting more of their kind for company.\n' +
      'The light of the Coral morph has been turned pink through selective breeding.',
  },
  name: {
    en: 'Coral Bug',
    ja: '珊瑚バグ',
  },
  decor: {
    radius: 7,
    value: 50,
  },
});

export const royalBug = Critter.register(shineBug, {
  id: 'lightbugpurple',
  imageURL:
    'https://oni-assistant.com/assets/elements/lightbugpurple-a546797c1be64f9cf0c8c02498c906d3c3c18d157c77e393701079d49c58f476.png',
  flavorText: {
    en:
      'Shine Bugs emit a soft Light in hopes of attracting more of their kind for company.\n' +
      'The light of the Royal morph has been turned purple through selective breeding.',
  },
  name: {
    en: 'Royal Bug',
    ja: 'ロイヤルバグ',
  },
  decor: {
    radius: 7,
    value: 50,
  },
});

export const abyssBug = Critter.register(shineBug, {
  id: 'lightbugblack',
  imageURL:
    'https://oni-assistant.com/assets/elements/lightbugblack-d0d01483be33464c7eb4b7be87e7c81a8a9e15b48327ce96883394bbaaeacf8c.png',
  flavorText: {
    en:
      'This Shine Bug emits no Light, but it makes up for it by having an excellent personality.',
  },
  name: {
    en: 'Abyss Bug',
    ja: 'アビスバグ',
  },
  decor: {
    radius: 7,
    value: 80,
  },
  layAnEgg: 2700,
  hatches: 9000,
  lifeSpan: 45000,
  lightEmitter: null,
});

export const azureBug = Critter.register(shineBug, {
  id: 'lightbugblue',
  imageURL: '',
  flavorText: {
    en: '',
  },
  name: {
    en: 'Azure Bug',
    ja: '青空バグ',
  },
  decor: {
    radius: 7,
    value: 50,
  },
});

export const radiantBug = Critter.register(shineBug, {
  id: 'lightbugcrystal',
  // tslint:disable-next-line: max-line-length
  imageURL:
    'https://oni-assistant.com/assets/elements/lightbugcrystal-c8f4e64126ebdfdedde73dc153a7215e0549d553f12de93fb4500baa5593ffd6.png',
  flavorText: {
    en:
      'Shine Bugs emit a soft Light in hopes of attracting more of their kind for company.\n' +
      'The light of the Radiant morph has been amplified through selective breeding.',
  },
  name: {
    en: 'Radiant Bug',
    ja: '煌きバグ',
  },
  decor: {
    radius: 8,
    value: 200,
  },
  layAnEgg: 2700,
  hatches: 9000,
  lifeSpan: 45000,
});
