import { Critter } from './critter';
import * as Critters from './critters';

describe('critter', () => {
  describe('Critter.findByName', () => {
    it('can find "hatch"', () => {
      expect(Critter.findByName('hatch', 'en')).toEqual(Critters.hatch);
    });
    it('can find "sage hatch" => Sage Hatch', () => {
      expect(Critter.findByName('sage hatch', 'en')).toEqual(Critters.sageHatch);
    });
    it('can find "ハッチ"', () => {
      expect(Critter.findByName('ハッチ', 'ja')).toEqual(Critters.hatch);
    });
  });
});
