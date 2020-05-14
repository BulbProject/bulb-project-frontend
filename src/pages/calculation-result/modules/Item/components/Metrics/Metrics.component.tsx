import React, { useCallback } from 'react';
import { css } from 'styled-components';

import type { Metric, Observation } from 'ts4ocds/extensions/metrics';

import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';

import { formatNumber } from 'utils';

import Styled from './Metrics.styles';

export const Metrics = ({ metrics, showTitles }: { metrics: Metric[]; showTitles: boolean }) => {
  const getObservationUnit = useCallback((observation: Observation) => {
    if (observation.value) {
      return observation.value.currency;
    }
    if (observation.unit) {
      return observation.unit.name;
    }

    return '';
  }, []);

  return (
    <Styled.Metrics direction="column">
      {metrics.map((metric) => (
        <Styled.Metric key={metric.id} direction="column">
          <Flex margin={{ bottom: 'regular' }}>
            <Text
              variant="caption"
              styled={{
                Text: showTitles
                  ? css``
                  : css`
                      color: transparent;
                      pointer-events: none;
                    `,
              }}
            >
              {metric.title}
            </Text>
          </Flex>

          {metric.observations.map((observation) => (
            <Styled.Observation
              key={observation.id}
              margin={{ bottom: 'regular' }}
              alignment={showTitles ? undefined : { horizontal: 'center' }}
            >
              {showTitles && (
                <Styled.ObservationTitle>
                  <Text variant="small" color="var(--c-dark)">
                    {observation.notes}
                  </Text>
                </Styled.ObservationTitle>
              )}

              <Text
                variant="small"
                styled={{
                  Text: css`
                    white-space: nowrap;
                  `,
                }}
              >
                {typeof observation.measure === 'number' ? formatNumber(observation.measure) : observation.measure}
                {formatNumber(observation.value?.amount)} {getObservationUnit(observation)}
              </Text>
            </Styled.Observation>
          ))}
        </Styled.Metric>
      ))}
    </Styled.Metrics>
  );
};
