import { EmojiCommand } from "./emoji-command";
import { HelpCommand } from "./help-command";

describe('Emoji Command', () => {
    it('return help detail', () => {
      const result = EmojiCommand.exec('');
      const expected = HelpCommand.exec('emoji');
      expect(result).not.toBeNull();
      expect(result.content).toEqual(expected.content);
    });
  it('can convert multiline input', () => {
    const result = EmojiCommand.exec('O\nK');
    expect(result).not.toBeNull();
    expect(result.content).toEqual(
      ':regional_indicator_o:\n:regional_indicator_k:'
    );
  });
});
