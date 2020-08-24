import { EmojinateComand } from './emojinate_command';

describe('EmojinateComand', () => {
  describe('help', () => {
     it('can find help', () => {
       expect(EmojinateComand.help).toEqual('何のこと？');
     });
  });
});
