import { HelpCommand } from './help-command';

describe('help command', () => {
  it('!help', () => {
    const result = HelpCommand.exec('');
    expect(result).not.toBeNull();
  });
  it('!help help', () => {
    const result = HelpCommand.exec('help');
    expect(result).not.toBeNull();
  });
  it('!help unknown', () => {
    const result = HelpCommand.exec('unknown');
    expect(result).not.toBeNull();
    expect(result.content).toEqual(
      ':thinkdupe: `!unknown` _そのコマンドは無いよ……?_'
    );
  });
});
