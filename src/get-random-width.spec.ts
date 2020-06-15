import { getRandomWidth } from './utils';

describe('getRandomWidth', () => {
  jest.spyOn(Math, 'random').mockReturnValue(1);

  describe('When min > max', () => {
    it('Should throw an error', () => {
      expect(() => getRandomWidth(5, 2)).toThrow(new RangeError('Min should be less than max.'));
    });
  });

  describe('When min and max are undefined', () => {
    it('Should throw an error', () => {
      // @ts-expect-error
      expect(() => getRandomWidth(undefined, undefined)).toThrow(
        new ReferenceError('Min and max should be positive numbers.')
      );
    });
  });

  describe('When min === undefined', () => {
    it('Should throw an error', () => {
      // @ts-expect-error
      expect(() => getRandomWidth(undefined, 5)).toThrow(new ReferenceError('Min should be a positive number.'));
    });
  });

  describe('When max === undefined', () => {
    it('Should throw an error', () => {
      // @ts-expect-error
      expect(() => getRandomWidth(3, undefined)).toThrow(new ReferenceError('Max should be a positive number.'));
    });
  });

  describe('When min is equal to max', () => {
    it('Should throw an error', () => {
      expect(() => getRandomWidth(3, 3)).toThrow(RangeError);
    });
  });

  describe('When min < 0', () => {
    it('Should throw an error', () => {
      expect(() => getRandomWidth(-1, 6)).toThrow(RangeError);
    });
  });

  describe('When max < 0', () => {
    it('Should throw an error', () => {
      expect(() => getRandomWidth(2, -1)).toThrow(RangeError);
    });
  });

  describe('With correct arguments', () => {
    it('Should return random width', () => {
      expect(getRandomWidth(2, 5)).toBe('5%');
    });
  });
});
