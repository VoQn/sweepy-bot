import { elementProperties } from '../element';
import { ElementCommand } from './element-command';
import { HelpCommand } from './help-command';

describe('ElementCommand', () => {
  describe('exec', () => {
    it('without argument', () => {
      const result = ElementCommand.exec('');
      expect(result).not.toBeNull();
      expect(result.content).toEqual(HelpCommand.exec('element').content);
    });
    it('with exact name', () => {
      const result = ElementCommand.exec('Oxygen');
      expect(result).not.toBeNull();
      expect(result.content).toMatch('その物質は知っているよ');
      expect(result.content).toMatch(/^Oxygen@気体/m);
      expect(result.content).toMatch(/^Oxygen@液体/m);
      expect(result.content).toMatch(/^Oxygen@固体/m);
    });
    it('with lower name', () => {
      const result = ElementCommand.exec('oxygen');
      expect(result).not.toBeNull();
      expect(result.content).toMatch('その物質は知っているよ');
      expect(result.content).toMatch(/^Oxygen@気体/m);
      expect(result.content).toMatch(/^Oxygen@液体/m);
      expect(result.content).toMatch(/^Oxygen@固体/m);
    });
    it('with exact name and prop', () => {
      const result = ElementCommand.exec('Oxygen shc');
      expect(result).not.toBeNull();
      expect(result.content).toMatch('気体: 1.005');
      expect(result.content).toMatch('液体: 1.01');
      expect(result.content).toMatch('固体: 1.01');
    });
    it('with exact name and prop (case insensitive)', () => {
      const result = ElementCommand.exec('oXyGen ShC');
      expect(result).not.toBeNull();
      expect(result.content).toMatch('気体: 1.005');
      expect(result.content).toMatch('液体: 1.01');
      expect(result.content).toMatch('固体: 1.01');
    });
    it('with fuzzy name', () => {
      const result = ElementCommand.exec('Oxy');
      expect(result).not.toBeNull();
      expect(result.content).toMatch('複数あるよ。');
      expect(result.content).toMatch(/^Oxygen/m);
      expect(result.content).toMatch(/^Polluted Oxygen/m);
      expect(result.content).toMatch(/^Oxylite/m);
    });
    it('with fuzzy lower name', () => {
      const result = ElementCommand.exec('oxy');
      expect(result).not.toBeNull();
      expect(result.content).toMatch('複数あるよ。');
      expect(result.content).toMatch(/^Oxygen/m);
      expect(result.content).toMatch(/^Polluted Oxygen/m);
      expect(result.content).toMatch(/^Oxylite/m);
    });
    it('with fuzzy name and prop', () => {
      const result = ElementCommand.exec('Oxy shc');
      expect(result).not.toBeNull();
      expect(result.content).toMatch('複数あるよ。');
      expect(result.content).toMatch(/^Oxygen/m);
      expect(result.content).toMatch(/^Polluted Oxygen/m);
      expect(result.content).toMatch(/^Oxylite/m);
    });
    it('with fuzzy name and prop (case insensitive)', () => {
      const result = ElementCommand.exec('oxy ShC');
      expect(result).not.toBeNull();
      expect(result.content).toMatch('複数あるよ。');
      expect(result.content).toMatch(/^Oxygen/m);
      expect(result.content).toMatch(/^Polluted Oxygen/m);
      expect(result.content).toMatch(/^Oxylite/m);
    });
    it('with special 属性', () => {
      const result = ElementCommand.exec('属性');
      expect(result).not.toBeNull();
      for (const prop of elementProperties) {
        expect(result.content).toMatch(prop.name);
      }
    });
  });
});
