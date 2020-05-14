export const efficiencyClasses = {
  'A++': 'A++',
  'A+': 'A+',
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  E: 'E',
  F: 'F',
  G: 'G',
};

export type EfficiencyClass = keyof typeof efficiencyClasses;

export const getEfficiencyColor = (efficiencyClass: EfficiencyClass) => {
  switch (efficiencyClass) {
    case 'A++':
      return '#33a357';
    case 'A+':
      return '#33a357';
    case 'A':
      return '#33a357';
    case 'B':
      return '#79b752';
    case 'C':
      return '#c3d545';
    case 'D':
      return '#fff12c';
    case 'E':
      return '#edb731';
    case 'F':
      return '#d66f2c';
    case 'G':
      return '#cc232a';
    default:
      return 'var(--c-white)';
  }
};
