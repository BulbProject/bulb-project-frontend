export const getLocaleDataType = (
  dataType: 'string' | 'boolean' | 'number' | 'integer' | undefined,
  locale?: string
) => {
  if (locale === 'UA') {
    switch (dataType) {
      case 'string':
        return 'текст';
      case 'boolean':
        return 'так/ні';
      case 'number':
        return 'число';
      case 'integer':
        return 'одиниць';
      default:
        return '';
    }
  }

  return '';
};
