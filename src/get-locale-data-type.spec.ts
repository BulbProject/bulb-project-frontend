import { getLocaleDataType } from './utils';

describe('getLocaleDataType', () => {
  describe('When locale is not defined', () => {
    it('Should return empty string', () => {
      // @ts-expect-error
      expect(getLocaleDataType()).toBe('');
    });

    describe('When locale is UA', () => {
      describe('When datatype is string', () => {
        it('Should return string', () => {
          expect(getLocaleDataType('string', 'UA')).toBe('текст');
        });
      });

      describe('When datatype is boolean', () => {
        it('Should return ', () => {
          expect(getLocaleDataType('boolean', 'UA')).toBe('так/ні');
        });
      });

      describe('When datatype is number', () => {
        it('Should return ', () => {
          expect(getLocaleDataType('number', 'UA')).toBe('число');
        });
      });

      describe('When datatype is integer', () => {
        it('Should return ', () => {
          expect(getLocaleDataType('integer', 'UA')).toBe('одиниць');
        });
      });
    });
  });
});
