/**
 * 抽象的な『温度』を表現するオブジェクトインターフェース
 */
export interface Tempareture {
  /**
   *  基本単位の記法表現。
   *  例えば 『摂氏』 に於いては **°C** を用いる。
   *  _`degree` でも `度` でもない_
   */
  readonly unit: string;

  /**
   * その『温度』単位における絶対零度
   * 例えばケルビンであれば **0K** であり、
   * 摂氏（セルシウス度）であれば **-273.15°C** となる。
   */
  readonly zero: number;

  /**
   * その『単位』上での数値表現
   */
  readonly value: number;

  /**
   * 温度の物理基本単位としてのケルビンとしての数値表現
   */
  readonly kelvin: number;

  /**
   * 絶対零度以上の、存在しえる温度であるかどうか
   * ※ 例えば「温度差」を表現する場合、 _-30K_ といった温度にはなり得る
   */
  readonly existable: boolean;
}
