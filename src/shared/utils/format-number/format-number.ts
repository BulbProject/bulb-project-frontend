export const formatNumber = (number: number | undefined, divider = ' '): string | null => {
  if (typeof number === 'undefined') return null;

  // eslint-disable-next-line prefer-named-capture-group
  return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/gu, `$1${divider}`);
};
