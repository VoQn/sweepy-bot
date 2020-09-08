import { Celsius } from './celsius';

describe('Celcius', () => {
  it('Can exist any X >= -273.15C', () => {
    expect(new Celsius(-273.15).existable).toBe(true);
  });
  it('Can not exist any X < -273.15C', () => {
    expect(new Celsius(-274).existable).toBe(false);
  });
  it('0C === 273.15K', () => {
    expect(new Celsius(0).kelvin).toBeCloseTo(273.15);
  });
  it('26.85C === 300K', () => {
    expect(new Celsius(26.85).kelvin).toBeCloseTo(300);
  });
  it('-273.15 === 0K', () => {
    expect(new Celsius(-273.15).kelvin).toBeCloseTo(0);
  });
  it('toString', () => {
    const c = new Celsius(-10);
    expect(`${c}`).toBe('-10 °C');
  });
  it('valueOf', () => {
    const a = new Celsius(25);
    const b = new Celsius(30);
    const c = new Celsius(15);
    const d = new Celsius(25);
    expect(b > a).toBe(true);
    expect(c < a).toBe(true);
    expect(+a === +d).toBe(true);
  });
});
