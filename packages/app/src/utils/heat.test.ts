import { TemparetureUnit } from '../types';
import { convertKelvinTemp } from './heat';

describe('heat', () => {
  describe('convertKelvinTemp', () => {
    it('convert 0K to 0K', () => {
      expect(convertKelvinTemp(0, TemparetureUnit.Kelvin)).toEqual(0);
    });
    it('convert 243.15K to -30℃', () => {
      expect(convertKelvinTemp(243.15)).toEqual(-30);
    });
    it('convert 300.15K to 27℃', () => {
      expect(convertKelvinTemp(300.15)).toEqual(27);
    });
    it('convert 273.15K to 32°F', () => {
      expect(convertKelvinTemp(273.15, TemparetureUnit.Fahrenheit)).toEqual(32);
    });
  });
});
