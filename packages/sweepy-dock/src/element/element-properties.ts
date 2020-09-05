import { ElementProperty } from './element-info';

export const elementProperties: Array<ElementProperty> = [
  {
    prop: 'name',
    name: '物質名',
    format: (e) => `${e.name}@${e.phase}`,
  },
  {
    prop: 'conductivity',
    name: '熱伝導率',
    format: (e) => `${e.conductivity} [J/(m・s・K)]`,
  },
  {
    prop: 'shc',
    name: '比熱容量',
    format: (e) => `${e.shc} [J/(kg・K)]`,
  },
  {
    prop: 'decor',
    name: '装飾ボーナス',
    format: (e) => (e.decor ? `装飾値+${e.decor}` : 'なし'),
  },
  {
    prop: 'overheat',
    name: 'オーバーヒート温度ボーナス',
    format: (e) => (e.overheat ? `耐熱温度+${e.overheat}℃` : 'なし'),
  },
  {
    prop: 'phase',
    name: '状態',
    format: (e) => `${e.phase}`,
  },
  {
    prop: 'molarMass',
    name: 'モル質量',
    format: (e) => `${e.molarMass} [kg/mol]`,
  },
  {
    prop: 'lowTemp',
    name: '凝固点',
    format: (e) => (e.lowTemp ? `${e.lowTemp} [℃]` : 'なし'),
  },
  {
    prop: 'highTemp',
    name: '沸点',
    format: (e) => (e.highTemp ? `${e.highTemp} [℃]` : 'なし'),
  },
] as Array<ElementProperty>;
