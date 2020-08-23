import { trimByRegexp, emojinateLine } from './emojinate';

describe('emojinate', () => {
  describe('trimByRegexp', () => {
    it('can trim "10" by /^10/', () => {
      const text = '1020';
      const regexp = /^10/;
      expect(trimByRegexp(regexp, text)).toEqual(['10', '20']);
    });
  });
  describe('emojinateLine', () => {
    it('can convert "hello"', () => {
      const text = 'hello';
      expect(emojinateLine(text))
        .toEqual(
          `:regional_indicator_h::regional_indicator_e::regional_indicator_l::regional_indicator_l::regional_indicator_o:`,
        );
    });
    it('can convert "Hello World."', () => {
      const text = 'Hello, World!!';
      expect(emojinateLine(text)).toEqual(
        `:regional_indicator_h::regional_indicator_e::regional_indicator_l::regional_indicator_l::regional_indicator_o:, :regional_indicator_w::regional_indicator_o::regional_indicator_r::regional_indicator_l::regional_indicator_d::bangbang:`,
      );
    });
    it('can convert "日本語!?"', () => {
      const text = '日本語!?';
      expect(emojinateLine(text)).toEqual(
        `日本語:interrobang:`,
      );
    });
  });
});
