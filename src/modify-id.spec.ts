import { modifyId } from './utils';

describe('modifyId', () => {
  describe('With incorrect id', () => {
    it('Should throw an error', () => {
      // @ts-expect-error
      expect(() => modifyId('01020a')).toThrow(new TypeError('Id should include only numbers'));
    });
  });

  describe('When position is incorrect', () => {
    describe('position is < 0', () => {
      it('Should throw an error', () => {
        // @ts-expect-error
        expect(() => modifyId('010203', -5)).toThrow(
          new RangeError('Position should be positive number no more than a half of id length')
        );
      });
    });

    describe('position is more than a half of id length', () => {
      it('Should throw an error', () => {
        // @ts-expect-error
        expect(() => modifyId('010203', 6)).toThrow(
          new RangeError('Position should be positive number no more than a half of id length')
        );
      });
    });
  });

  describe('When modifiedCallback is incorrect', () => {
    describe('when 0', () => {
      it('should return 1', () => {
        expect(modifyId('01', 1, () => 0)).toBe('01');
      });
    });

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
