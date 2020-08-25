import { trimByRegexp, identify } from '.';
describe('identify', () => {
  it('can convert "x" => "x"', () => {
    expect(identify('x')).toEqual('x');
  });
  it('can convert "X" => "x"', () => {
    expect(identify('X')).toEqual('x');
  });
  it('can convert "Array" => "array"', () => {
    expect(identify('Array')).toEqual('array');
  });
  it('can convert "URL" => "url"', () => {
    expect(identify('URL')).toEqual('url');
  });
  it('can convert "SageHatch" => "sage_hatch"', () => {
    expect(identify('SageHatch')).toEqual('sage_hatch');
  });
});
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