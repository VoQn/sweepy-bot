import { Kelvin } from './kelvin';

describe('Kelvin', () => {
  it('Can not instantiate any X < 0K', () => {
    expect(new Kelvin(-1).existable).toBe(false);
  });
  it('0K === -273.15C', () => {
    const k = new Kelvin(0);
    expect(k.toCelsius.value).toBeCloseTo(-273.15);
  });
  it('0K === -459.67F', () => {
    const k = new Kelvin(0);
    expect(k.toFahrenheit.value).toBeCloseTo(-459.67);
  });
  it('toString', () => {
    const k = new Kelvin(273);
    expect(`${k}`).toBe('273K');
  });
});
