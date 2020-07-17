export const isFormFilledIn = (data: unknown): boolean => {
  return !JSON.stringify(data, (key, value) => {
    if (value === undefined || Number.isNaN(Number(value))) {
      return 'undefined';
    }

    return value;
  }).includes('undefined');
};
