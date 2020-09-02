import { Kelvin, Celsius } from './tempareture';
describe('Tempareture', () => {
  describe('Kelvin', () => {
    it('0K === -273.15C', () => {
      const k = new Kelvin(0);
      expect(k.toCelsius.value).toBeCloseTo(-273.15);
    });
    it('0K === -459.67F', () => {
      const k = new Kelvin(0);
      expect(k.toFahrenheit.value).toBeCloseTo(-459.67);
    });
  });
  describe('Celcius', () => {
    it('0C === 273.15K', () => {
      expect(new Celsius(0).toKelvin.value).toBeCloseTo(273.15);
    });
    it('26.85C === 300K', () => {
      expect(new Celsius(26.85).toKelvin.value).toBeCloseTo(300);
    });
    it('0C === 32F', () => {
      const c = new Celsius(0);
      expect(c.toFahrenheit.value).toBeCloseTo(32);
    });
    it('100C === 212F', () => {
      const c = new Celsius(100);
      expect(c.toFahrenheit.value).toBeCloseTo(212);
    });
  });
});
