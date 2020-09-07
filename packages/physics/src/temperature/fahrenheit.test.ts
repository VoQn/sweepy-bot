import { Fahrenheit } from './fahrenheit';

describe('Fahrenheit', () => {
  it('32°F', () => {
    expect(new Fahrenheit(32).value).toBeCloseTo(32);
  });
  it('32°F => 273.15K', () => {
    expect(new Fahrenheit(32).kelvin).toBeCloseTo(273.15);
  });
});
