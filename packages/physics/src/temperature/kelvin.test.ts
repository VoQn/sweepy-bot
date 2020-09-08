import { Celsius } from './celsius';
import { Fahrenheit } from './fahrenheit';
import { Kelvin } from './kelvin';

describe('Kelvin', () => {
  const zeroKelvin = new Kelvin(0);
  it('Can not instantiate any X < 0K', () => {
    expect(new Kelvin(-1).existable).toBe(false);
  });
  it('0K === -273.15C', () => {
    expect(new Celsius(zeroKelvin).degrees).toBeCloseTo(-273.15);
  });
  it('0K === -459.67F', () => {
    expect(new Fahrenheit(zeroKelvin).degrees).toBeCloseTo(-459.67);
  });
  it('toString', () => {
    const k = new Kelvin(273);
    expect(`${k}`).toBe('273 K');
  });
});
