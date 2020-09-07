import { Celsius } from '@sweepy-bot/physics';

import { LivableTemp } from './livable-temp';

describe('LivableTemp', () => {
  it('OK', () => {
    const temp: LivableTemp = {
      lower: new Celsius(20),
      upper: new Celsius(90),
    };
    expect(temp.lower.kelvin).toBe(293.15);
  });
});
