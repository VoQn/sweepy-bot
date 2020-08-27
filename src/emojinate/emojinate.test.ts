import { emojinateLine } from './emojinate';

describe('emojinate', () => {
  describe('emojinateLine', () => {
    it('can convert "100!"', () => {
      const text = '100!';
      expect(emojinateLine(text)).toEqual(':100: :exclamation:');
    });
    it('can convert "100101"', () => {
      const text = '100101';
      expect(emojinateLine(text)).toEqual(':100: :keycap_ten: :one:');
    });
    it('can convert "hello"', () => {
      const text = 'hello';
      expect(emojinateLine(text)).toEqual(
        ':regional_indicator_h: :regional_indicator_e: :regional_indicator_l: :regional_indicator_l: :regional_indicator_o:'
      );
    });
    it('can convert "0123', () => {
      const text = '0123';
      expect(emojinateLine(text)).toEqual(
        ':zero: :one: :two: :three:'
      );
    });
    it('can convert "Hello World."', () => {
      const text = 'Hello, World!!';
      const expected =
        ':regional_indicator_h: :regional_indicator_e: :regional_indicator_l: :regional_indicator_l: :regional_indicator_o: ,  :regional_indicator_w: :regional_indicator_o: :regional_indicator_r: :regional_indicator_l: :regional_indicator_d: :bangbang:';
      expect(emojinateLine(text)).toEqual(expected);
    });
    it('can convert "日本語!?"', () => {
      const text = '日本語!?';
      expect(emojinateLine(text)).toEqual('日本語 :interrobang:');
    });
    it('全角の！や？もemojinateできる!!のか!？', () => {
      const text = '全角の！や？もemojinateできる!!のか!？';
      const expected =
        '全角の :exclamation: や :question: も :regional_indicator_e: :regional_indicator_m: :regional_indicator_o: :regional_indicator_j: :regional_indicator_i: :regional_indicator_n: :regional_indicator_a: :regional_indicator_t: :regional_indicator_e: できる :bangbang: のか :interrobang:';
      expect(emojinateLine(text)).toEqual(expected);
    });
    it('すでに :emoji: 化されたワードは変換しない100', () => {
      const text = 'すでに :emoji: 化されたワードは変換しない';
      expect(emojinateLine(text)).toEqual(text);
    });
    it('カスタム絵文字 <:emoji:012345679> も変換はスキップする', () => {
      const text = 'カスタム絵文字 <:emoji:012345679> も変換はスキップする';
      expect(emojinateLine(text)).toEqual(text);
    });
  });
});
