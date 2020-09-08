/** 多言語対応されているテキスト */
export type Multilingal<T> = {
  /** 言語設定が英語の場合の表示 */
  en: T;
  /** 言語設定が日本語の場合の表示 */
  ja: T | undefined;
};
