import cheatsheets from '../data/cheatsheet.json';
import { CheatsheetCommand } from './cheatsheet-command';

describe('CheatsheetCommand', () => {
  const command = CheatsheetCommand;

  describe('message without args', () => {
    it('returns contents including all names', () => {
      for (const { name } of Object.values(cheatsheets)) {
        expect(command.exec('').content).toMatch(name);
      }
    });
  });

  describe('message with args', () => {
    it('returns contents including all names', () => {
      for (const { name, url } of Object.values(cheatsheets)) {
        expect(command.exec(name).content).toMatch(url);
      }
    });
  });

  describe('message with keywords', () => {
    it('returns exact one', () => {
      expect(command.exec('液体 上下').content).toMatch(
        cheatsheets.liquidWeight.url
      );
    });

    it('returns some two', () => {
      expect(command.exec('人数').content).toMatch(
        cheatsheets.oxygenBuilds.name
      );
      expect(command.exec('人数').content).toMatch(
        cheatsheets.plantsAndFeeding.name
      );
    });
  });
});
