import React from 'react';
import type { Metric } from 'ts4ocds/extensions/metrics';

import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';

import Styled from './Forecasts.styles';

export const Forecasts = ({ forecasts }: { forecasts: Metric[] }) => {
  return (
    <Styled.Forecasts>
      <Flex margin={{ bottom: 'regular' }}>
        <Text appearance="bold"> Збереження</Text>
      </Flex>

      {forecasts.map((forecast) => (
        <Flex key={forecast.id} direction="column">
          <Flex margin={{ bottom: 'regular' }}>
            <Text variant="caption">{forecast.title}</Text>
          </Flex>

          {forecast.observations.map((observation) => (
            <Flex key={observation.id} margin={{ bottom: 'regular' }}>
              <Styled.ObservationTitle>
                <Text variant="small" color="var(--c-dark)">
                  {observation.notes}
                  {observation?.unit ? `, ${observation.unit.name}` : ''}
                </Text>

                <Styled.Dots />
              </Styled.ObservationTitle>

              <Text variant="small">{observation.measure}</Text>
            </Flex>
          ))}
        </Flex>
      ))}
    </Styled.Forecasts>
  );
};
