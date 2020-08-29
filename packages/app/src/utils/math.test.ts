import { round } from './math';

describe('round', () => {
  it('round(10.1, 0) to 10', () => {
    expect(round(10.1, 0)).toEqual(10);
  });
  it('round(10.04, 1) to 10', () => {
    expect(round(10.04, 1)).toEqual(10);
  });
  it('round(10.005, 2) to 10.01', () => {
    expect(round(10.005, 2)).toEqual(10.01);
  });
  it('round("12345e5", -2) to ', () => {
    expect(round(1.2345e4, -4)).toEqual(10000);
  });
});
