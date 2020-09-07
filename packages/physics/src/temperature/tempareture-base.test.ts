import { Celsius } from '.';

describe('TemperatureBase', () => {
  it('Can access overloaded property', () => {
    const t = new Celsius(0);
    expect(t.unit).toBe('°C');
  });
});
