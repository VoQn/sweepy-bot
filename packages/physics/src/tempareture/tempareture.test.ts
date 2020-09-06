import { Celsius, Kelvin } from '.';

describe('Tempareture', () => {
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
  describe('Celcius', () => {
    it('Can not exist any X < -273.15C', () => {
      expect(new Celsius(-300).existable).toBe(false);
    });
    it('0C === 273.15K', () => {
      expect(new Celsius(0).toKelvin.value).toBeCloseTo(273.15);
    });
    it('26.85C === 300K', () => {
      expect(new Celsius(26.85).toKelvin.value).toBeCloseTo(300);
    });
    it('-273.15 === 0K', () => {
      expect(new Celsius(-273.15).toKelvin.value).toBeCloseTo(0);
    });
    it('0C === 32F', () => {
      const c = new Celsius(0);
      expect(c.toFahrenheit.value).toBeCloseTo(32);
    });
    it('100C === 212F', () => {
      const c = new Celsius(100);
      expect(c.toFahrenheit.value).toBeCloseTo(212);
    });
    it('toString', () => {
      const c = new Celsius(-10);
      expect(`${c}`).toBe('-10°C');
    });
  });
});
