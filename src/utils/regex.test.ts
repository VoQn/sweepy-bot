import { trimByRegexp } from '.';

describe('trimByRegexp', () => {
  it('can trim "1000" by /^100/', () => {
    const text = '1000';
    const regexp = /^100/;
    expect(trimByRegexp(regexp, text)).toEqual(['100', '0']);
  });
  it('can trim "10" by /^10/', () => {
    const text = '1020';
    const regexp = /^10/;
    expect(trimByRegexp(regexp, text)).toEqual(['10', '20']);
  });
});