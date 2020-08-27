import { CritterCommand } from './critter-command';
import { HelpCommand } from './help-command';

describe('CritterCommand', () => {
  describe('exec', () => {
    it('without any arguments', () => {
      const result = CritterCommand.exec('');
      const expected = HelpCommand.exec('critter');
      expect(result).not.toBeNull();
      expect(expected).not.toBeNull();
      expect(result.content).toEqual(expected.content);
      expect(result.options.embed.title).toEqual(expected.options.embed.title);
    });
  });
});
