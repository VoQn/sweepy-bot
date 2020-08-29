import { hatch, shineBug } from './critters';

describe('Critter', () => {
  describe('detailEmbed', () => {
    it('hatch', () => {
      const result = hatch.detailEmbed(null);
      expect(result).not.toBeNull();
      expect(result.content).toEqual(':bulb: _**ハッチ** は知ってるよ_');
      const embed = result.options.embed;
      expect(embed.title).toEqual('_Hatch_');
    });
    it('shineBug', () => {
      const result = shineBug.detailEmbed(null);
      expect(result).not.toBeNull();
    });
  });
});
