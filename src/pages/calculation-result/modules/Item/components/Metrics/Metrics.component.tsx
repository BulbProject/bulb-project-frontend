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
    <Flex direction="column">
      {metrics.map((metric) => (
        <Flex key={metric.id} direction="column" margin={{ bottom: 'large' }}>
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
            <Flex
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
                    padding-left: var(--i-small);
                    background-color: var(--c-lightest);
                    white-space: nowrap;
                  `,
                }}
              >
                {typeof observation.measure === 'number' ? formatNumber(observation.measure) : observation.measure}
                {formatNumber(observation.value?.amount)} {getObservationUnit(observation)}
              </Text>
            </Flex>
          ))}
        </Flex>
      ))}
    </Flex>
  );
};
