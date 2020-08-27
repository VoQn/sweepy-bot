import { getCustomEmoji } from "./custom-emoji";

describe('getCustomEmoji', () => {
  describe('without any Client', () => {
    it('return only wrapped code', () => {
      expect(getCustomEmoji('hello')).toEqual(':hello:');
    });
  });
});