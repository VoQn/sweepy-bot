import { SweepyBot } from './sweepy-bot';

describe('SweepyBot', () => {
  describe('ask', () => {
     it('cannot any response', () => {
       const bot = new SweepyBot();
       expect(bot.ask('hello')).toEqual('何のこと？');
     });
  });
});
