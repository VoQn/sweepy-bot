import { Fahrenheit } from './fahrenheit';

describe('Fahrenheit', () => {
  describe('.existable', () => {
    it('can not exist any X < -459.67°F', () => {
      expect(new Fahrenheit(-460).existable).toBe(false);
    });
    it('can be existable X >= -459.67°F', () => {
      expect(new Fahrenheit(-459.67).existable).toBe(true);
    });
  });
  describe('.degrees', () => {
    it('32°F', () => {
      expect(new Fahrenheit(32).degrees).toBeCloseTo(32);
    });
    it('212°F', () => {
      expect(new Fahrenheit(212).degrees).toBeCloseTo(212);
    });
  });
  describe('.kelvin', () => {
    it('32°F => 273.15K', () => {
      expect(new Fahrenheit(32).kelvin).toBeCloseTo(273.15);
    });
    it('212°F => 373.15K', () => {
      expect(new Fahrenheit(212).kelvin).toBeCloseTo(373.15);
    });
  });
});
