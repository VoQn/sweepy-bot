import { MessageOptions } from 'discord.js';

/** ゲーム内部で登録されているid */
export type ID = string;

export const TemparetureUnit = {
  Kelvin: 'K',
  Celsius: '°C',
  Fahrenheit: '°F',
} as const;
export type TemparetureUnit = typeof TemparetureUnit[keyof typeof TemparetureUnit];

/** 多言語対応されているテキスト */
export type Multilingal = {
  /** 言語設定が英語の場合の表示 */
  en: string;
  /** 言語設定が英語の場合の表示 */
  ja?: string;
};

/** ONI のゲームアイテムとして存在しているモノ */
export interface OniEntity {
  /** ゲーム内部で登録されているid */
  id: ID;
  /** オブジェクトのゲーム上の名前 */
  name: Multilingal;
  /** ゲーム上表示される画像 */
  imageURL: string;
  /** フレーバーテキスト */
  flavorText: Multilingal;
}

/** 装飾値影響 */
export interface Decor {
  /** 装飾値加算がなされる範囲 (半径) */
  radius: number;
  /** 範囲内で加算される装飾値 */
  value: number;
}

export interface Response {
  content: string;
  options?: MessageOptions;
}
