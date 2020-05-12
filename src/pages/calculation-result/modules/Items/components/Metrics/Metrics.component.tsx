import React from 'react';
import type { Metric, Observation } from 'ts4ocds/extensions/metrics';

import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';

import Styled from './Metrics.styles';

export const Metrics = ({ metrics }: { metrics: Metric[] }) => {

  const getObservationUnit = (observation: Observation) => {
    if (observation.value) {
      return `, ${observation.value.currency}`;
    }
    if (observation.unit) {
      return `, ${observation.unit.name}`;
    }

    return '';
  };

  return (
    <Styled.Metrics>
      <Flex margin={{ bottom: 'regular' }}>
        <Text appearance="bold"> Збереження</Text>
      </Flex>

      {metrics.map((metric) => (
        <Flex key={metric.id} direction="column">
          <Flex margin={{ bottom: 'regular' }}>
            <Text variant="caption">{metric.title}</Text>
          </Flex>

          {metric.observations.map((observation) => (
            <Flex key={observation.id} margin={{ bottom: 'regular' }}>
              <Styled.ObservationTitle>
                <Text variant="small" color="var(--c-dark)">
                  {observation.notes}
                  {getObservationUnit(observation)}
                </Text>

                <Styled.Dots />
              </Styled.ObservationTitle>

              <Text variant="small">{observation.measure ?? observation.value?.amount}</Text>
            </Flex>
          ))}
        </Flex>
      ))}
    </Styled.Metrics>
  );
};
