import { AbsoluteZero } from './constants';
import {
  celsiusToFahrenheit,
  celsiusToKelvin,
  fahrenheitToCelsius,
  fahrenheitToKelvin,
  kelvinToCelsius,
  kelvinToFahrenheit,
} from './convert';

describe('Tempareture.constants', () => {
  describe('kelvinToCelsius', () => {
    it('0K => -273.15°C', () => {
      expect(kelvinToCelsius(0)).toBeCloseTo(AbsoluteZero.Celsius);
    });
    it('273.15K => 0°C', () => {
      expect(kelvinToCelsius(273.15)).toBeCloseTo(0);
    });
  });
  describe('celsiusToKelvin', () => {
    it('0°C => 273.15K', () => {
      expect(celsiusToKelvin(0)).toBeCloseTo(273.15);
    });
    it('-273.15°C => 0K', () => {
      expect(celsiusToKelvin(-273.15)).toBeCloseTo(0);
    });
    it('26.85°C => 300K', () => {
      expect(celsiusToKelvin(26.85)).toBeCloseTo(300);
    });
  });
  describe('kelvinToFahrenheit', () => {
    it('0K => -459.67°F', () => {
      expect(kelvinToFahrenheit(0)).toBeCloseTo(-459.67);
    });
    it('255.372K => 0°F', () => {
      expect(kelvinToFahrenheit(255.372)).toBeCloseTo(0);
    });
    it('273.15K => 32°F', () => {
      expect(kelvinToFahrenheit(273.15)).toBeCloseTo(32);
    });
  });
  describe('fahrenheitToKelvin', () => {
    it('-459.67°F => 0K', () => {
      expect(fahrenheitToKelvin(-459.67)).toBeCloseTo(0);
    });
    it('0°F => 255.372K', () => {
      expect(fahrenheitToKelvin(0)).toBeCloseTo(255.372);
    });
    it('32°F => 273.15K', () => {
      expect(fahrenheitToKelvin(32)).toBeCloseTo(273.15);
    });
    it('212°F => 373.15K', () => {
      expect(fahrenheitToKelvin(212)).toBeCloseTo(373.15);
    });
  });
  describe('fahrenheitToCelsius', () => {
    it('32°F => 0°C', () => {
      expect(fahrenheitToCelsius(32)).toBeCloseTo(0);
    });
    it('-40°F => -40°C', () => {
      expect(fahrenheitToCelsius(-40)).toBeCloseTo(-40);
    });
    it('212°F => 100°C', () => {
      expect(fahrenheitToCelsius(212)).toBeCloseTo(100);
    });
    it('32°F => 0°C', () => {
      expect(fahrenheitToCelsius(32)).toBeCloseTo(0);
    });
  });
  describe('celsiusToFahrenheit', () => {
    it('35°C => 95°F', () => {
      expect(celsiusToFahrenheit(35)).toBeCloseTo(95);
    });
  });
});
