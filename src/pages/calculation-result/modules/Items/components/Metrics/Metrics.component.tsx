import React, { useCallback } from 'react';
import { css } from 'styled-components';

import type { Metric, Observation } from 'ts4ocds/extensions/metrics';

import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';
import useMediaQuery from 'ustudio-ui/hooks/use-media-query';

import { formatNumber } from 'utils';

import Styled from './Metrics.styles';

export const Metrics = ({
  metrics,
  hoveredObservation,
  setHoveredObservation,
  isSearched,
}: {
  metrics: Metric[];
  hoveredObservation: string;
  setHoveredObservation: (observationId: string) => void;
  isSearched: boolean;
}) => {
  const getObservationUnit = useCallback((observation: Observation) => {
    if (observation.value) {
      return observation.value.currency;
    }
    if (observation.unit) {
      return observation.unit.name;
    }

    return '';
  }, []);

  const isMd = useMediaQuery('screen and (min-width: 798px)');

  return (
    <Flex direction="column">
      {metrics.map((metric) => (
        <Styled.Metric
          key={metric.id}
          direction="column"
          margin={{ bottom: 'large' }}
          economy={metric.id === 'economy'}
        >
          <Flex margin={{ bottom: 'regular' }}>
            <Text variant="caption">{metric.title}</Text>
          </Flex>

          {metric.observations.map((observation) => (
            <Flex
              key={observation.id}
              margin={{ bottom: 'regular' }}
              onMouseEnter={() => setHoveredObservation(observation.id)}
              onMouseLeave={() => setHoveredObservation('')}
              styled={{
                Flex: css`
                  position: relative;
                `,
              }}
            >
              {isMd && metric.id !== 'economy' && (
                <Styled.Highlight isHovered={hoveredObservation === observation.id} />
              )}

              <Styled.ObservationTitle>
                {!isMd || isSearched || metric.id === 'economy' ? (
                  <Text variant="small" color="var(--c-dark)">
                    {observation.notes}
                  </Text>
                ) : null}

                <Styled.Dots />
              </Styled.ObservationTitle>

              <Text
                variant="small"
                styled={{
                  Text: css`
                    padding-left: var(--i-small);
                    white-space: nowrap;
                  `,
                }}
              >
                {typeof observation.measure === 'number' ? formatNumber(observation.measure) : observation.measure}
                {formatNumber(observation.value?.amount)} {getObservationUnit(observation)}
              </Text>
            </Flex>
          ))}
        </Styled.Metric>
      ))}
    </Flex>
  );
};
