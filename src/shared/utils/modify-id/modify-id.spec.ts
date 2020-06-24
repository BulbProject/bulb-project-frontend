import { modifyId } from '../index';

describe('modifyId', () => {
  describe('When id includes not just numbers', () => {
    it('Should throw an error', () => {
      // @ts-expect-error
      expect(() => modifyId('01020a')).toThrow(TypeError);
    });
  });

  describe('When position is incorrect', () => {
    describe('position is < 0', () => {
      it('Should throw an error', () => {
        // @ts-expect-error
        expect(() => modifyId('010203', -5)).toThrow(RangeError);
      });
    });

    describe('When position is more than a half of id digits count', () => {
      it('Should throw an error', () => {
        // @ts-expect-error
        expect(() => modifyId('010203', 6)).toThrow(RangeError);
      });
    });
  });

  describe('When modifiedCallback is incorrect', () => {
    describe('when -1', () => {
      it('should return 1', () => {
        expect(modifyId('01', 1, () => -1)).toBe('01');
      });
    });

    describe('when 100', () => {
      it('should return 99', () => {
        expect(modifyId('01', 1, () => 100)).toBe('99');
      });
    });
  });
});
