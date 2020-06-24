import { getLocaleDataType } from '../index';

describe('getLocaleDataType', () => {
  describe('When locale is not defined', () => {
    it('Should return an empty string', () => {
      expect(getLocaleDataType(undefined)).toBe('');
    });

    describe('When locale is UA', () => {
      describe('When dataType is string', () => {
        it('Should return текст', () => {
          expect(getLocaleDataType('string', 'UA')).toBe('текст');
        });
      });

      describe('When dataType is boolean', () => {
        it('Should return так/ні', () => {
          expect(getLocaleDataType('boolean', 'UA')).toBe('так/ні');
        });
      });

      describe('When dataType is number', () => {
        it('Should return число', () => {
          expect(getLocaleDataType('number', 'UA')).toBe('число');
        });
      });

      describe('When dataType is integer', () => {
        it('Should return одиниць', () => {
          expect(getLocaleDataType('integer', 'UA')).toBe('одиниць');
        });
      });
    });
  });
});
