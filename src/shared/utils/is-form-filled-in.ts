export const isFormFilledIn = (data: unknown): boolean => {
  const formValue = JSON.stringify(data, (key, value) => {
    if (value === undefined || Number.isNaN(Number(value))) {
      return 'undefined';
    }

    return value;
  });

  return !formValue.includes('undefined');
};
