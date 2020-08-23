import { Critter, critters } from './critter';

describe('critter', () => {
  describe('Critter.findByName', () => {
    it('can find "hatch"', () => {
      expect(Critter.findByName('hatch', 'en')).toEqual(critters.hatch);
    });
    it('can find "sage hatch" => Sage Hatch', () => {
      expect(Critter.findByName('sage hatch', 'en')).toEqual(critters.sageHatch);
    });
    it('can find "ハッチ"', () => {
      expect(Critter.findByName('ハッチ', 'ja')).toEqual(critters.hatch);
    });
  });
});
