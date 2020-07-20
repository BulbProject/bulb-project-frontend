export const isFormFilledIn = (data: unknown): boolean => {
  const formData = JSON.stringify(data, (key, value) => {
    if (value === undefined || Number.isNaN(Number(value))) {
      return 'undefined';
    }

    return value;
  });

  return !formData.includes('undefined');
};
