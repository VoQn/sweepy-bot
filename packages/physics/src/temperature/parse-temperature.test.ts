import { Celsius } from './celsius';
import { parseTemperature, parseTemperatures } from './parse-temperature';

describe('parseTemperature', () => {
  it('can not parse not temperature expression', () => {
    const result = parseTemperature('800kg');
    expect(result).toBe(undefined);
  });
  it('parse "10°C" as 10°C', () => {
    const result = parseTemperature('10°C');
    expect(result.unit).toBe('°C');
    expect(result.degrees).toBe(10);
  });
  it('parse "0℃" as 0°C', () => {
    const result = parseTemperature('0℃');
    expect(result.equals(new Celsius(0))).toBe(true);
  });
  it('parse "10 °C" as 10°C', () => {
    const result = parseTemperature('10 °C');
    expect(result.unit).toBe('°C');
    expect(result.degrees).toBe(10);
  });
  it('parse "-0.5°C" as -0.5°C', () => {
    const result = parseTemperature('-0.5°C');
    expect(result.unit).toBe('°C');
    expect(result.degrees).toBe(-0.5);
  });
});

describe('parseTemperatures', () => {
  it('different units', () => {
    const text = '0K, -10℃, 32℉';
    const result = parseTemperatures(text);
    expect(result.length).toBe(3);
    expect(result[0].unit).toBe('K');

    expect(result[1].unit).toBe('°C');
    expect(result[1].degrees).toBe(-10);

    expect(result[2].unit).toBe('°F');
    expect(result[2].degrees).toBe(32);
  });
});
