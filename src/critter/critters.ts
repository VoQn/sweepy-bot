import { Critter } from './critter';

export const morb: Critter = Critter.register({
  id: 'glom',
  imageURL:
    'https://cdn.glitch.com/90b71f4e-a02c-4bc1-aab0-41d89538239f%2Fglom.png?v=1598520527653',
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
  imageURL:
    'https://cdn.glitch.com/90b71f4e-a02c-4bc1-aab0-41d89538239f%2Fhatch.png?v=1598520584336',
  flavorText: {
    en:
      'Hatches excrete solid Coal as waste and may be uncovered by digging up Buried Objects.',
    ja:
      'ハッチは固形の **石炭** を排泄します。埋もれた物体を掘り起こすことで現れることがあります。',
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
  imageURL:
    'https://cdn.glitch.com/90b71f4e-a02c-4bc1-aab0-41d89538239f%2Fhatchveggie.png?v=1598520612706',
  flavorText: {
    en:
      'Sage Hatches excrete solid Coal as waste and enjoy burrowing into the ground.',
    ja:
      'セイジ ハッチは固形の **石炭** を排泄します。地面を掘り進むことを好みます。',
  },
  name: {
    en: 'Sage Hatch',
    ja: 'セイジハッチ',
  },
});

export const stoneHatch: Critter = Critter.register(hatch, {
  id: 'hatchhard',
  imageURL:
    'https://cdn.glitch.com/90b71f4e-a02c-4bc1-aab0-41d89538239f%2Fhatchhard.png?v=1598520676450',
  flavorText: {
    en:
      'Stone Hatches excrete solid Coal as waste and enjoy burrowing into the ground.',
    ja:
      'ごつごつ ハッチは固形の **石炭** を排泄します。地面を掘り進むことを好みます。',
  },
  name: {
    en: 'Stone Hatch',
    ja: 'ごつごつハッチ',
  },
  hitPoint: 200,
});

export const smoothHatch: Critter = Critter.register(hatch, {
  id: 'hatchmetal',
  imageURL:
    'https://cdn.glitch.com/90b71f4e-a02c-4bc1-aab0-41d89538239f%2Fhatchmetal.png?v=1598520723070',
  flavorText: {
    en:
      'Smooth Hatches enjoy burrowing into the ground and excrete Refined Metal when fed Metal Ore.',
    ja:
      'つるつるハッチは地面を掘り進むことを好み、 **金属鉱石** を食べ **精錬金属** を排出します。',
  },
  name: {
    en: 'Smooth Hatch',
    ja: 'つるつるハッチ',
  },
  hitPoint: 400,
});

export const puft: Critter = Critter.register({
  id: 'puft',
  imageURL:
    'https://cdn.glitch.com/90b71f4e-a02c-4bc1-aab0-41d89538239f%2Fpuft.png?v=1598520877070',
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
  imageURL:
    'https://cdn.glitch.com/90b71f4e-a02c-4bc1-aab0-41d89538239f%2Fpuftalpha.png?v=1598520880541',
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
  imageURL:
    'https://cdn.glitch.com/90b71f4e-a02c-4bc1-aab0-41d89538239f%2Fpuftbleachstone.png?v=1598520886300',
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
  imageURL:
    'https://cdn.glitch.com/90b71f4e-a02c-4bc1-aab0-41d89538239f%2Fpuftoxylite.png?v=1598520891699',
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
  imageURL:
    'https://cdn.glitch.com/90b71f4e-a02c-4bc1-aab0-41d89538239f%2Fsquirrel.png?v=1598520896712',
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
  imageURL:
    'https://cdn.glitch.com/90b71f4e-a02c-4bc1-aab0-41d89538239f%2Fcrab.png?v=1598520174359',
  flavorText: {
    en: [
      'Pokeshells are nonhostile critters that eat Polluted Dirt and Rot Piles.',
      'The shells they leave behind after molting can be crushed into Lime.',
    ].join('\n'),
    ja: [
      'ポークシェルは **汚染土** と **腐った塊** を食べる、非敵対的な動物です。',
      '彼らが脱皮の後に残す殻は、粉砕して **石灰** にできます。',
    ].join('\n'),
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
  imageURL:
    'https://cdn.glitch.com/90b71f4e-a02c-4bc1-aab0-41d89538239f%2Fmole.png?v=1598520211207',
  flavorText: {
    en: [
      'Shove Voles are burrowing critters that eat the Regolith collected on terrestrial surfaces.',
      'They cannot burrow through Refined Metals.',
    ].join('\n'),
    ja: [
      'ぐりぐりネズミは **表土** を掘り進みながら食べる動物です。',
      '彼らは **精錬金属** を掘ることはできません。',
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
  imageURL:
    'https://cdn.glitch.com/90b71f4e-a02c-4bc1-aab0-41d89538239f%2Fmoo.png?v=1598521115804',
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
  imageURL:
    'https://cdn.glitch.com/90b71f4e-a02c-4bc1-aab0-41d89538239f%2Fdrecko.png?v=1598521097845',
  flavorText: {
    en: [
      'Dreckos are nonhostile critters that graze only on live Mealwood Plants.',
      'Their backsides are covered in thick woolly fibers that only grow in Hydrogen climates.',
    ].join('\n'),
    ja: [
      'ドレッコは生育中の **ミールウッド** のみを食する、非敵対的な動物です',
      '彼らの背面は **水素** 下でのみ伸びる厚いウール繊維で覆われています。',
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
  imageURL:
    'https://cdn.glitch.com/90b71f4e-a02c-4bc1-aab0-41d89538239f%2Fdreckoplastic.png?v=1598521105530',
  flavorText: {
    en: [
      'Glossy Dreckos are nonhostile critters that graze only on live Mealwood Plants.',
      'Their backsides are covered in bioplastic scales that only grow in Hydrogen climates.',
    ].join('\n'),
    ja: [
      'つやつやドレッコは生育中の **ミールウッド** のみを食する、非敵対的な動物です。',
      '彼らの背面は **水素** 下でのみ成長する生体プラスチックの鱗で覆われています。',
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
    'https://cdn.glitch.com/90b71f4e-a02c-4bc1-aab0-41d89538239f%2Foilfloater.png?v=1598521124252',
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
    'https://cdn.glitch.com/90b71f4e-a02c-4bc1-aab0-41d89538239f%2Foilfloaterhightemp.png?v=1598521137195',
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
  imageURL:
    'https://cdn.glitch.com/90b71f4e-a02c-4bc1-aab0-41d89538239f%2Foilfloaterdecor.png?v=1598521130893',
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
    'https://cdn.glitch.com/90b71f4e-a02c-4bc1-aab0-41d89538239f%2Fpacu.png?v=1598521315481',
  flavorText: {
    en: [
      'Pacus are aquatic creatures that cannot live outside of Water or Contaminated Water.',
      'Every organism in the known universe finds the Pacu extremely delicious.',
    ].join('\n'),
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
    'https://cdn.glitch.com/90b71f4e-a02c-4bc1-aab0-41d89538239f%2Fpacucleaner.png?v=1598521328561',
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
    'https://cdn.glitch.com/90b71f4e-a02c-4bc1-aab0-41d89538239f%2Fpacutropical.png?v=1598521334767',
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
    'https://cdn.glitch.com/90b71f4e-a02c-4bc1-aab0-41d89538239f%2Flightbug.png?v=1598520205072',
  flavorText: {
    en:
      'Shine Bugs emit a soft Light in hopes of attracting more of their kind for company.',
    ja: 'シャインバグは仲間を引き寄せるために柔らかい **光** を放ちます。',
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
    'https://cdn.glitch.com/90b71f4e-a02c-4bc1-aab0-41d89538239f%2Flightbugorange.png?v=1598521459984',
  flavorText: {
    en: [
      'Shine Bugs emit a soft Light in hopes of attracting more of their kind for company.',
      'The light of the Sun morph has been turned orange through selective breeding.',
    ].join('\n'),
    ja: [
      'シャインバグは仲間を引き寄せるために柔らかい **光** を放ちます。',
      '太陽 バグの光の色は人為選択の結果、オレンジになりました。',
    ].join('\n'),
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
    'https://cdn.glitch.com/90b71f4e-a02c-4bc1-aab0-41d89538239f%2Flightbugpink.png?v=1598521615825',
  flavorText: {
    en: [
      'Shine Bugs emit a soft Light in hopes of attracting more of their kind for company.',
      'The light of the Coral morph has been turned pink through selective breeding.',
    ].join('\n'),
    ja: [
      'シャインバグは仲間を引き寄せるために柔らかい **光** を放ちます。',
      '珊瑚 バグの光の色は人為選択の結果、ピンクになりました。',
    ].join('\n'),
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
    'https://cdn.glitch.com/90b71f4e-a02c-4bc1-aab0-41d89538239f%2Flightbugpurple.png?v=1598521610291',
  flavorText: {
    en: [
      'Shine Bugs emit a soft Light in hopes of attracting more of their kind for company.',
      'The light of the Royal morph has been turned purple through selective breeding.',
    ].join('\n'),
    ja: [
      'シャインバグは仲間を引き寄せるために柔らかい **光** を放ちます。',
      'ロイヤル バグの光の色は人為選択の結果、紫になりました。',
    ].join('\n'),
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
    'https://cdn.glitch.com/90b71f4e-a02c-4bc1-aab0-41d89538239f%2Flightbugblack.png?v=1598520193369',
  flavorText: {
    en:
      'This Shine Bug emits no Light, but it makes up for it by having an excellent personality.',
    ja:
      'このシャインバグは **光源** になりませんが、素晴らしい個性がそれを補っています。',
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
  imageURL:
    'https://cdn.glitch.com/90b71f4e-a02c-4bc1-aab0-41d89538239f%2Flightbugblue.png?v=1598521602991',
  flavorText: {
    en: [
      'Shine Bugs emit a soft Light in hopes of attracting more of their kind for company.',
      'The light of the Azure morph has been turned blue through selective breeding.',
    ].join('\n'),
    ja: [
      'シャインバグは仲間を引き寄せるために柔らかい **光** を放ちます。',
      '青空 バグの光の色は人為選択の結果、青色になりました。',
    ].join('\n'),
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
  imageURL:
    'https://cdn.glitch.com/90b71f4e-a02c-4bc1-aab0-41d89538239f%2Flightbugcrystal.png?v=1598520187782',
  flavorText: {
    en: [
      'Shine Bugs emit a soft Light in hopes of attracting more of their kind for company.',
      'The light of the Radiant morph has been amplified through selective breeding.',
    ].join('\n'),
    ja: [
      'シャインバグは仲間を引き寄せるために柔らかい **光** を放ちます。',
      '煌き バグの光は人為選択の結果、より輝くようになりました。',
    ].join('\n'),
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
