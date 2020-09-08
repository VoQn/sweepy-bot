import { Celsius } from './celsius';
import { Fahrenheit } from './fahrenheit';

describe('Celsius to Fahrenheit', () => {
  it('0C === 32F', () => {
    const c = new Celsius(0);
    expect(new Fahrenheit(c).degrees).toBeCloseTo(32);
  });
  it('100C === 212F', () => {
    const c = new Celsius(100);
    expect(new Fahrenheit(c).degrees).toBeCloseTo(212);
  });
});

describe('Temperature.equals', () => {
  it('0C === 32F', () => {
    const c = new Celsius(0);
    const f = new Fahrenheit(32);
    expect(c.equals(f)).toBe(true);
  });
  it('100C === 212F', () => {
    const c = new Celsius(100);
    const f = new Fahrenheit(212);
    expect(c.equals(f)).toBe(true);
  });
});
