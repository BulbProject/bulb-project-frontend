import { formatNumber } from './utils';

describe('formatNumber', () => {
  describe('When number is undefined', () => {
    it('Should return null', () => {
      // @ts-expect-error
      expect(formatNumber()).toBe(null);
    });
  });

  describe('When number length is equal or les than 3', () => {
    it('Should return number', () => {
      expect(formatNumber(12)).toBe('12');
    });
  });

  describe('When number length is more than 3', () => {
    it('Should return formatted number', () => {
      expect(formatNumber(1234)).toBe('1 234');
    });
  });

  describe('When custom divider is provided', () => {
    it('Should use custom divider', () => {
      expect(formatNumber(1264578, '-')).toBe('1-264-578');
    });
  });
});
