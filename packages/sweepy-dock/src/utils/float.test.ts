import { lengthFloat, padFloat } from './float';

describe('float', () => {
  describe('lengthFloat', () => {
    it('integer', () => {
      expect(lengthFloat(0)).toEqual({ digits: 1, decimals: 0 });
    });
    it('ordinal float', () => {
      expect(lengthFloat(43.15)).toEqual({ digits: 2, decimals: 3 });
    });
    it('float with zero', () => {
      expect(lengthFloat(234.15)).toEqual({ digits: 3, decimals: 3 });
    });
    it('float without digits', () => {
      expect(lengthFloat(0.15)).toEqual({ digits: 1, decimals: 3 });
    });
  });

  describe('padFloat', () => {
    describe('with 0', () => {
      it('no padding', () => {
        expect(padFloat(0, { digits: 0, decimals: 0 })).toEqual('0');
      });
      it('padding to digits', () => {
        expect(padFloat(0, { digits: 2, decimals: 0 })).toEqual(' 0');
      });
      it('padding to decimals', () => {
        expect(padFloat(0, { digits: 0, decimals: 3 })).toEqual('0   ');
      });
      it('padding to both', () => {
        expect(padFloat(0, { digits: 2, decimals: 3 })).toEqual(' 0   ');
      });
    });

    describe('with 123', () => {
      it('no padding', () => {
        expect(padFloat(123, { digits: 0, decimals: 0 })).toEqual('123');
      });
      it('padding to digits', () => {
        expect(padFloat(123, { digits: 2, decimals: 0 })).toEqual('123');
      });
      it('padding to decimals', () => {
        expect(padFloat(123, { digits: 0, decimals: 3 })).toEqual('123   ');
      });
      it('padding to both', () => {
        expect(padFloat(123, { digits: 2, decimals: 3 })).toEqual('123   ');
      });
    });

    describe('with 0.3', () => {
      it('no padding', () => {
        expect(padFloat(0.3, { digits: 0, decimals: 0 })).toEqual('0.3');
      });
      it('padding to digits', () => {
        expect(padFloat(0.3, { digits: 2, decimals: 0 })).toEqual(' 0.3');
      });
      it('padding to decimals', () => {
        expect(padFloat(0.3, { digits: 0, decimals: 3 })).toEqual('0.3 ');
      });
      it('padding to both', () => {
        expect(padFloat(0.3, { digits: 2, decimals: 3 })).toEqual(' 0.3 ');
      });
    });

    describe('with 3.4', () => {
      it('no padding', () => {
        expect(padFloat(3.4, { digits: 0, decimals: 0 })).toEqual('3.4');
      });
      it('padding to digits', () => {
        expect(padFloat(3.4, { digits: 2, decimals: 0 })).toEqual(' 3.4');
      });
      it('padding to decimals', () => {
        expect(padFloat(3.4, { digits: 0, decimals: 3 })).toEqual('3.4 ');
      });
      it('padding to both', () => {
        expect(padFloat(3.4, { digits: 2, decimals: 3 })).toEqual(' 3.4 ');
      });
    });
  });
});
