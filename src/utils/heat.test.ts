import { convertKelvinTemp } from './heat';

describe('heat', () => {
  describe('convertKelvinTemp', () => {
    it('convert 243.15K to -30℃', () => {
      expect(convertKelvinTemp(243.15)).toEqual(-30);
    });
    it('convert 300.15K to 27℃', () => {
      expect(convertKelvinTemp(300.15)).toEqual(27);
    });
  });
});
