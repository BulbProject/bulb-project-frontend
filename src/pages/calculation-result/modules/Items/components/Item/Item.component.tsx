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
  isSearched,
}: {
  variant: AvailableVariant;
  item: IItem;
  document?: string;
  isSearched?: boolean;
}) => {
  const efficiencyObservation = variant.metrics
    .flatMap((metric) => metric.observations)
    .find((observation) => observation.id === 'energyEfficiencyClass');

  const economyObservation = variant.metrics
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

        {economyObservation && (
          <Styled.Economy>
            <Text align="center" appearance="bold">
              {formatNumber(economyObservation.measure as number)}
            </Text>

            <Text variant="small" align="center">
              {economyObservation.unit?.name}
            </Text>
          </Styled.Economy>
        )}
      </Styled.Image>

      <Styled.Content direction="column">
        <Styled.ItemDescription>
          <Text variant="h3">{item.description}</Text>

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

        <Metrics metrics={variant.metrics} />

        {item.additionalClassifications && (
          <Styled.AdditionalClassification direction="column">
            <Flex margin={{ bottom: 'regular' }}>
              <Text variant="caption">Додаткові класифікації</Text>
            </Flex>

            {item.additionalClassifications.map((additionalClassification) => (
              <Classification key={additionalClassification.id} {...additionalClassification} />
            ))}
          </Styled.AdditionalClassification>
        )}

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
