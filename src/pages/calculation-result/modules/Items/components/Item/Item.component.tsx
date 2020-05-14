import React from 'react';

import { css } from 'styled-components';

import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';
import Button from 'ustudio-ui/components/Button';

import { AvailableVariant, Item as IItem } from 'types/data';
import { Classification } from 'shared';

import { formatNumber } from 'utils';

import { Metrics } from '../Metrics';

import Styled from './Item.styles';

export const Item = ({
  variant,
  item,
  document,
  hoveredObservation,
  setHoveredObservation,
  isSearched,
}: {
  variant: AvailableVariant;
  item: IItem;
  document?: string;
  hoveredObservation: string;
  setHoveredObservation: (observationId: string) => void;
  isSearched?: boolean;
}) => {
  const efficiencyObservation = variant.metrics
    .flatMap((metric) => metric.observations)
    .find((observation) => observation.id === 'energyEfficiencyClass');

  const consumptionObservation = variant.metrics
    .flatMap((metric) => metric.observations)
    .find((observation) => observation.id === 'energyPerYear');

  return (
    <Styled.Item direction="column" isSearched={!!isSearched}>
      <Styled.Image link={document}>
        {efficiencyObservation && (
          <Styled.EfficiencyClass efficiencyClass={efficiencyObservation.measure as string}>
            {efficiencyObservation.measure}
          </Styled.EfficiencyClass>
        )}

        {consumptionObservation && (
          <Styled.Consumption>
            <Text align="center" appearance="bold">
              {formatNumber(consumptionObservation.measure as number)}
            </Text>

            <Text variant="small" align="center">
              {consumptionObservation.unit?.name}
            </Text>
          </Styled.Consumption>
        )}
      </Styled.Image>

      <Styled.Content direction="column">
        <Styled.ItemDescription>
          <Text appearance="bold">{item.description}</Text>

          <Flex margin={{ top: 'medium' }} alignment={{ horizontal: 'center' }}>
            <Text variant="h6">Кількість: {variant.quantity}</Text>
          </Flex>
        </Styled.ItemDescription>

        <Styled.Classifications direction="column">
          <Flex direction="column">
            <Flex margin={{ bottom: 'regular' }}>
              <Text variant="caption">Класифікація</Text>
            </Flex>

            <Classification {...item.classification} />
          </Flex>
        </Styled.Classifications>

        <Metrics
          metrics={variant.metrics}
          isSearched={!!isSearched}
          hoveredObservation={hoveredObservation}
          setHoveredObservation={setHoveredObservation}
        />

        <Flex direction="column">
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
        </Flex>
      </Styled.Content>
    </Styled.Item>
  );
};
