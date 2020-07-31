export const isFormFilledIn = (data: unknown): boolean => {
  const formData = JSON.stringify(data, (key, value) => {
    if (value === undefined || Number.isNaN(value)) {
      return 'undefined';
    }

    return value;
  });

  return !formData.includes('undefined');
};
