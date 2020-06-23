export const efficiencyClasses = ['A++', 'A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G'].reduce(
  (efficiencyClassesMap, efficiencyClass) => {
    return Object.assign(efficiencyClassesMap, { [efficiencyClass]: efficiencyClass });
  },
  {}
);

export type EfficiencyClass = keyof typeof efficiencyClasses;
