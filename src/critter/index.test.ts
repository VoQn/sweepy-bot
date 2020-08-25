import { Critter } from './critter';
import * as Critters from './critters';

describe('critter', () => {
  describe('hitPoint', () => {
    it('Stone Hatch\'s HP was overried', () => {
      expect(Critters.stoneHatch.hitPoint).toEqual(200);
    });
  });
  describe('lightEmitter', () => {
    it('Shine Bug has lightEmitter', () => {
      expect(Critters.shineBug.lightEmitter).toEqual({ range: 5, lux: 1800 });
    });
    it('Abyss Bug has not lightEmitter', () => {
      expect(Critters.abyssBug.lightEmitter).toBeNull();
    });
  });
  describe('Critter.findByName', () => {
    it('can not find "stinky"', () => {
      const dupe = Critter.findByName('stinky');
      expect(dupe).toBeNull();
    });
    it('can find "hatch"', () => {
      const result = Critter.findByName('hatch');
      expect(result).not.toBeNull();
      expect(result.id).toEqual(Critters.hatch.id);
    });
    it('can find "sagehatch" => Sage Hatch', () => {
      const result = Critter.findByName('sagehatch');
      expect(result).not.toBeNull();
      expect(result.id).toEqual(Critters.sageHatch.id);
    });
    it('can find "sage hatch" => Sage Hatch', () => {
      const result = Critter.findByName('sage hatch');
      expect(result).not.toBeNull();
      expect(result.id).toEqual(Critters.sageHatch.id);
    });
    it('can find "ハッチ"', () => {
      const target = Critters.hatch;
      const result = Critter.findByName('ハッチ');
      expect(result).not.toBeNull();
      expect(result.id).toEqual(target.id);
    });
    it('can find Puft Prince by "プリンス"', () => {
      const target = Critters.puftPrince;
      const result = Critter.findByName('プリンス');
      expect(result).not.toBeNull();
      expect(result?.id).toEqual(target.id);
    });
  });
  describe('Critter.getEmojiCode', () => {
    it('can find :hatch: by "hatch', () => {
      expect(Critter.getEmojiCode('hatch')).toEqual(':hatch:');
    });
  });
});
