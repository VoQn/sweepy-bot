import { LiquidCommand } from './liquid-command';

describe('LiquidCommand', () => {
  describe('exec', () => {
    it('without argument', () => {
      const result = LiquidCommand.exec('');
      expect(result).not.toBeNull();
      expect(result.content).toMatch(
        '液体の比重だよ。(25℃ で存在する液体のみだよ)'
      );
    });
    it('with valid argument', () => {
      const result = LiquidCommand.exec('100');
      expect(result).not.toBeNull();
      expect(result.content).toMatch('100℃での、液体の比重だよ');
    });
    it('with valid argument', () => {
      const result = LiquidCommand.exec('-273');
      expect(result).not.toBeNull();
      expect(result.content).toMatch('-273℃での、液体の比重だよ');
    });
    it('with invalid argument', () => {
      const result = LiquidCommand.exec('ABC');
      expect(result).not.toBeNull();
      expect(result.content).toMatch(
        '液体の比重だよ。ABCは分からなかったから、25℃だよ'
      );
    });
  });
});
