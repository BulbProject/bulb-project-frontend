export const formatNumber = (number: number | undefined, divider: string = ' ') => {
  if (typeof number === 'undefined') return null;

  return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${divider}`);
};
