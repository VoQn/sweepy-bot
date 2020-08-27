import { parseCommand } from '.';

describe('parseCommand', () => {
  describe('with some arguments', () => {
    it('!critter hatch', () => {
      expect(parseCommand('!critter hatch')).toEqual({
        command: 'critter',
        args: 'hatch',
      });
    });
  });
  describe('with multiline arguments', () => {
    it('!critter hatch', () => {
      expect(parseCommand('!critter hatch\nhatch')).toEqual({
        command: 'critter',
        args: 'hatch\nhatch',
      });
    });
  });
  describe('without any argument', () => {
    it('!cheatsheet', () => {
      expect(parseCommand('!cheatsheet')).toEqual({
        command: 'cheatsheet',
        args: '',
      });
    });
  });
  describe('ignore any not command text', () => {
    it("it's not command!", () => {
      expect(parseCommand("it's not command!")).toBeNull();
    });
  });
});
