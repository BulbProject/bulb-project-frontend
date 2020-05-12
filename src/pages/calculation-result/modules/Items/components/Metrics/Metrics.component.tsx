import React from 'react';
import { css } from 'styled-components';

import type { Metric, Observation } from 'ts4ocds/extensions/metrics';

import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';

import Styled from './Metrics.styles';

export const Metrics = ({ metrics }: { metrics: Metric[] }) => {
  const getObservationUnit = (observation: Observation) => {
    if (observation.value) {
      return observation.value.currency;
    }
    if (observation.unit) {
      return observation.unit.name;
    }

    return '';
  };

  return (
    <Styled.Metrics>
      {metrics.map((metric) => (
        <Flex key={metric.id} direction="column">
          <Flex margin={{ bottom: 'large' }}>
            <Text variant="caption">{metric.title}</Text>
          </Flex>

          {metric.observations.map((observation) => (
            <Flex key={observation.id} margin={{ bottom: 'regular' }}>
              <Styled.ObservationTitle>
                <Text variant="small" color="var(--c-dark)">
                  {observation.notes}
                </Text>

                <Styled.Dots />
              </Styled.ObservationTitle>

              <Text
                variant="small"
                styled={{
                  Text: css`
                    white-space: nowrap;
                  `,
                }}
              >
                {typeof observation.measure === 'number'
                  ? observation.measure.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
                  : observation.measure ??
                    (observation.value?.amount ?? 0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')}{' '}
                {getObservationUnit(observation)}
              </Text>
            </Flex>
          ))}
        </Flex>
      ))}
    </Styled.Metrics>
  );
};
