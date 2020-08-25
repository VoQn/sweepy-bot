import { SweepyBot } from './sweepy-bot';

describe('SweepyBot', () => {
  describe('ask', () => {
     it('cannot any response', () => {
       const bot = new SweepyBot();
       expect(() => bot.ask('hello')).toThrow('not-implemented-error');
     });

    it('one easy command, one easy response', () => {
      const bot = new SweepyBot();
      bot.register({
        name: 'test',
        pattern: /^!test$/,
        help: 'test',
        message(args: string) {
          return { content: 'foo' };
        }
      })

      expect(bot.ask('!test')).toEqual({ content: 'foo' });
      expect(() => bot.ask('!testa')).toThrow('not-implemented-error');
    });
  });
});
