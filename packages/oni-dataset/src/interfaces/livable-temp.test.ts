import { Celsius } from '@sweepy-bot/physics';

import { LivableTemp } from './livable-temp';

describe('LivableTemp', () => {
  it('OK', () => {
    const temp = {
      lower: new Celsius(20),
      upper: new Celsius(90),
    } as LivableTemp;
    expect(temp.lower.kelvin).toBe(293.15);
  });
});
