import cheatsheets from '../../data/cheatsheet.json';
import { CheatsheetCommand } from './cheatsheet-command';

describe('CheatsheetCommand', () => {
  const command = CheatsheetCommand;

  describe('message without args', () => {
    it('returns contents including all names', () => {
      for (let { name } of Object.values(cheatsheets)) {
        expect(command.exec('').content).toMatch(name);
      }
    });
  });

  describe('message with args', () => {
    it('returns contents including all names', () => {
      for (let { name, url } of Object.values(cheatsheets)) {
        expect(command.exec(name).content).toMatch(url);
      }
    });
  });
});
