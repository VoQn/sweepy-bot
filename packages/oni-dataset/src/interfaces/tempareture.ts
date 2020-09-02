interface Tempareture {
  readonly unit: string;
  readonly value: number;
  readonly zero: number;

  readonly toKelvin: Tempareture;
  readonly toCelsius: Tempareture;
  readonly toFahrenheit: Tempareture;
}

abstract class TemparetureBase implements Tempareture {
  static readonly unit: string = 'K';
  static readonly zero: number = 0;

  readonly value: number;
  abstract readonly zero: number;
  abstract readonly unit: string;
  constructor(value: number) {
    this.value = value;
  }
  valueOf(): number {
    return this.value - this.zero;
  }
  toString(): string {
    return `${this.value}${this.unit}`;
  }
  abstract readonly toKelvin: Tempareture;
  abstract readonly toCelsius: Tempareture;
  abstract readonly toFahrenheit: Tempareture;
}

export class Kelvin extends TemparetureBase {
  public static readonly unit: string = 'K';
  public static readonly zero: number = 0;

  get zero(): number {
    return 0;
  }

  get unit(): string {
    return Kelvin.unit;
  }

  constructor(value: number) {
    if (value < Kelvin.zero) {
      throw new RangeError(`${value}`);
    }
    super(value);
  }

  get toKelvin(): Kelvin {
    return this;
  }

  get toCelsius(): Tempareture {
    return Celsius.fromKelvin(this);
  }

  get toFahrenheit(): Tempareture {
    return Fahrenheit.fromKelvin(this);
  }
}

export class Celsius extends TemparetureBase {
  public static readonly unit: string = '°C';
  public static readonly zero: number = -273.15;

  static fromKelvin(k: Kelvin): Celsius {
    return new Celsius(k.value + this.zero);
  }

  get zero(): number {
    return Celsius.zero;
  }

  get unit(): string {
    return Celsius.unit;
  }

  constructor(value: number) {
    if (value < Celsius.zero) {
      throw new RangeError(`${value}`);
    }
    super(value);
  }

  get toKelvin(): Tempareture {
    return new Kelvin(this.valueOf());
  }

  get toCelsius(): Tempareture {
    return this;
  }

  get toFahrenheit(): Tempareture {
    return Fahrenheit.fromKelvin(new Kelvin(this.valueOf()));
  }
}

export class Fahrenheit extends TemparetureBase {
  public static readonly unit: string = '°F';
  public static readonly zero: number = -459.67;
  static fromKelvin(k: Kelvin): Fahrenheit {
    return new Fahrenheit((9 / 5) * k.value + this.zero);
  }

  get unit(): string {
    return Fahrenheit.unit;
  }

  get zero(): number {
    return Fahrenheit.zero;
  }

  constructor(value: number) {
    if (value < Fahrenheit.zero) {
      throw new RangeError(`${value}`);
    }
    super(value);
  }

  valueOf(): number {
    return (5 / 9) * (this.value - this.zero);
  }

  get toKelvin(): Tempareture {
    return new Kelvin(this.valueOf());
  }

  get toCelsius(): Tempareture {
    return Celsius.fromKelvin(new Kelvin(this.valueOf()));
  }

  get toFahrenheit(): Tempareture {
    return this;
  }
}

/**
 * 生存可能な体温の範囲。摂氏基準
 */
export type LivableTemp = {
  /** 生存可能な体温の下限 */
  lower: Tempareture;
  /** 生存可能な体温の上限 */
  upper: Tempareture;
};

/**
 * 適温の範囲。摂氏基準
 */
export type ConfortTemp = {
  lower: Tempareture;
  upper: Tempareture;
};
