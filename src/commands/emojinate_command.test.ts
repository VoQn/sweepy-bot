import { EmojinateComand } from './emojinate_command';

describe('EmojinateComand', () => {
  describe('help', () => {
     it('can find help', () => {
       console.log(EmojinateComand.help);
       expect(EmojinateComand.help).not.toBeNull();
     });
  });
});
