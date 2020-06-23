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
