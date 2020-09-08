export interface TemperatureConvertable {
  readonly unit: string;
  readonly absoluteZero: number;
  readonly degreesByKelvin: (kelvin: number) => number;
  readonly kelvinByDegrees: (degrees: number) => number;
}
