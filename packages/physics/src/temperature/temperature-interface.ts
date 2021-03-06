/**
 * 抽象的な『温度』を表現するオブジェクトインターフェース
 */
export interface TemperatureData {
  /**
   *  基本単位の記法表現。
   *  例えば 『摂氏』 に於いては **°C** を用いる。
   *  _`degree` でも `度` でもない_
   *  ライブラリ内部的には基本ケルビンとして Temperature の実体は取り扱うが、
   *  ユーザー側のデータ入力としては摂氏で来ると想定する
   *  つまり、未定義時は摂氏(°C)として扱う
   */
  readonly unit?: string;
  /**
   * その『単位』上での数値表現
   */
  readonly degrees: number;
}

/**
 * 抽象的な『温度』を表現するオブジェクトインターフェース
 */
export interface Temperature extends TemperatureData {
  readonly unit: string;
  /**
   * 温度の物理基本単位としてのケルビンとしての数値表現
   */
  readonly kelvin: number;
  /**
   * 絶対零度以上の、存在しえる温度であるかどうか
   * ※ 例えば「温度差」を表現する場合、 _-30K_ といった温度にはなり得る
   */
  readonly existable: boolean;

  equals: (other: Temperature, digits?: number) => boolean;
}

export interface Convertable {
  readonly unit: string;
  /**
   * その『温度単位』における絶対零度
   * 例えばケルビンであれば **0K** であり、
   * 摂氏（セルシウス度）であれば **-273.15°C** となる。
   */
  readonly absoluteZero: number;
  /**
   * 与えられた数値を その『温度単位』での値とした時の
   * ケルビン温度を計算して返す
   */
  readonly degreesByKelvin: (kelvin: number) => number;
  /**
   * 与えられた数値を ケルビン温度とした時の
   * その『温度単位』での値を計算して返す
   */
  readonly kelvinByDegrees: (degrees: number) => number;
}
