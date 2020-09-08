import { ID } from './id';
import { Multilingal } from './multilingal';

/** ONI のゲームアイテムとして存在しているモノ */
export interface OniEntity {
  /** ゲーム内部で登録されているid */
  id: ID;
  /** オブジェクトのゲーム上の名前 */
  name: Multilingal<string>;
  /** ゲーム上表示される画像 */
  imageURL: string;
  /** フレーバーテキスト */
  flavorText: Multilingal<string[]>;
}
