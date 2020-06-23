import React, { FC, useMemo } from 'react';
import { CategoryFeatureProps } from '../../category-feature.props';

import { EfficiencyClass, efficiencyClasses } from './entity';
import Styled from './lamps-feature.styles';

export const LampsFeature: FC<CategoryFeatureProps> = ({ availableVariant, isItemRequested }) => {
  const efficiencyObservation = useMemo(() => {
    return availableVariant.metrics
      .flatMap((metric) => metric.observations)
      .find((observation) => observation.id === 'energyEfficiencyClass');
  }, [JSON.stringify(availableVariant.metrics)]);

  return (
    <>
      {isItemRequested && (
        <Styled.EfficiencyClassesList>
          {Object.keys(efficiencyClasses).map((efficiencyClass: string) => (
            <li key={efficiencyClass}>
              <Styled.EfficiencyClass efficiencyClass={efficiencyClass as EfficiencyClass} trianglePosition="left">
                {efficiencyClass}
              </Styled.EfficiencyClass>
            </li>
          ))}
        </Styled.EfficiencyClassesList>
      )}

      {efficiencyObservation && (
        <Styled.EfficiencyClass
          efficiencyClass={efficiencyObservation.measure as EfficiencyClass}
          trianglePosition="right"
        >
          {efficiencyObservation.measure}
        </Styled.EfficiencyClass>
      )}
    </>
  );
};
