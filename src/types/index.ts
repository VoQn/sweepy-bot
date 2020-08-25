/** ゲーム内部で登録されているid */
export type ID = string;

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
