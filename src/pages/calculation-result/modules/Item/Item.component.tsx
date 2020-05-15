import React from 'react';

import { Observation } from 'ts4ocds/extensions/metrics';

import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';

import { Classification } from 'shared';
import { formatNumber } from 'utils';

import { Metrics } from './components';
import { efficiencyClasses, EfficiencyClass } from './Item.module';

import Styled from './Item.styles';
import { ItemProps } from './Item.types';

export const Item = ({
  variant,
  item,
  document,
  isRequested = false,
  hoveredObservation,
  setHoveredObservation,
  hasMany = true,
}: ItemProps) => {
  const efficiencyObservation = variant.metrics
    .flatMap((metric) => metric.observations)
    .find((observation) => observation.id === 'energyEfficiencyClass');

  const economyMetric = variant.metrics.find((metric) => metric.id === 'economy');

  const getUnit = (observation: Observation) => {
    return observation.unit?.name || observation.value?.currency || '';
  };

  return (
    <Styled.Item direction="column" isRequested={isRequested}>
      <Styled.Image link={document} isReversed={!isRequested}>
        {isRequested && (
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

        {economyMetric && (
          <Styled.EconomyContainer>
            {economyMetric.observations.map((observation) => (
              <Styled.Economy key={observation.id}>
                <Styled.EconomyNote variant="small">{observation.notes}</Styled.EconomyNote>

                <Styled.EconomyMeasure>
                  {getUnit(observation) ? (
                    <Text appearance="bold">
                      {formatNumber((observation.measure as number) || observation.value?.amount)}
                    </Text>
                  ) : (
                    <Flex alignment={{ vertical: 'center', horizontal: 'end' }}>
                      <Styled.BoldText variant="small">x &nbsp;</Styled.BoldText>

                      <Text variant="h4">
                        {formatNumber((observation.measure as number) || observation.value?.amount)}
                      </Text>
                    </Flex>
                  )}

                  <Styled.BoldText variant="small">{getUnit(observation)}</Styled.BoldText>
                </Styled.EconomyMeasure>
              </Styled.Economy>
            ))}
          </Styled.EconomyContainer>
        )}
      </Styled.Image>

      <Styled.Content direction="column" hasMany={hasMany}>
        <Styled.ItemDescription>
          <Text variant="body" appearance="bold">
            {item.description}
          </Text>

          <Flex margin={{ top: 'medium' }} alignment={{ horizontal: 'center' }}>
            <Classification {...item.classification} />
          </Flex>
        </Styled.ItemDescription>

        <Metrics
          showTitles={isRequested}
          metrics={variant.metrics}
          hoveredObservation={hoveredObservation}
          setHoveredObservation={setHoveredObservation}
        />

        {/* <Flex direction="column">
          <Styled.Link href="#" target="_blank" rel="noopener noreferrer">
            <Button
              styled={{
                Button: css`
                   {
                    width: 100%;
                    padding: var(--i-regular);
                  }
                `,
              }}
              appearance="text"
            >
              Prozorro Market Teaser
            </Button>
          </Styled.Link>

          <Button
            styled={{
              Button: css`
                 {
                  padding: var(--i-regular);
                }
              `,
            }}
            appearance="text"
            intent="positive"
          >
            Contract Notice
          </Button>
        </Flex> */}
      </Styled.Content>
    </Styled.Item>
  );
};
