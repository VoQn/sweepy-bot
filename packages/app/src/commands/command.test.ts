import { BookmarkCommand } from './bookmark-command';
import { Command, compare } from './command';
import { CritterCommand } from './critter-command';
import { HelpCommand } from './help-command';

describe('compare', () => {
  it('Category.General < Category.ONI', () => {
    expect(compare(HelpCommand, CritterCommand)).toEqual(-1);
  });
  it('If same command, returns 0', () => {
    expect(compare(HelpCommand, HelpCommand)).toEqual(0);
  });
  describe('If 2 commands have same category', () => {
    it('ordered', () => {
      expect(compare(CritterCommand, BookmarkCommand)).toEqual(1);
    });
    it('reversed', () => {
      expect(compare(BookmarkCommand, CritterCommand)).toEqual(-1);
    });
  });
});

describe('Command.find', () => {
  it('HelpCommand', () => {
    const result = Command.find('help');
    expect(result).toEqual(HelpCommand);
  });
});
