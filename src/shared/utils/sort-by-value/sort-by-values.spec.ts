import { sortByValue } from './sort-by-value';

describe('sortByValue', () => {
  it('Should sort an unsorted array of objects by the value of specified key', () => {
    expect([{ 1: '0102' }, { 1: '0101' }].sort(sortByValue(1))).toStrictEqual([{ 1: '0101' }, { 1: '0102' }]);
  });
});
