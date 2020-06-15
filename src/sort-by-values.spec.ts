import { sortByValue } from './utils';

describe('sortByValue', () => {
  describe('When value of secondObject is greater than the value of firstObject', () => {
    it('Should swap values', () => {
      expect([{ 1: '0102' }, { 1: '0101' }].sort(sortByValue(1))).toStrictEqual([{ 1: '0101' }, { 1: '0102' }]);
    });
  });
});
