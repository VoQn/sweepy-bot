import { elementProperties } from '../element';
import { ElementCommand } from './element-command';

describe('ElementCommand', () => {
  describe('exec', () => {
    it('with exact name and prop', () => {
      const result = ElementCommand.exec('Oxygen shc');
      expect(result).not.toBeNull();
      expect(result.content).toMatch('気体: 1.005');
      expect(result.content).toMatch('液体: 1.01');
      expect(result.content).toMatch('固体: 1.01');
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
