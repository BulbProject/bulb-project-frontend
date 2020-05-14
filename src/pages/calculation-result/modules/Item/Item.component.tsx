import React from 'react';

import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';

import { AvailableVariant, Item as ItemType } from 'types/data';
import { Classification } from 'shared';

import { Metrics } from './components';
import { efficiencyClasses, EfficiencyClass } from './Item.module';

import Styled from './Item.styles';

export const Item = ({
  variant,
  item,
  document,
  isRequested = false,
  hoveredObservation,
  setHoveredObservation,
}: {
  variant: AvailableVariant;
  item: ItemType;
  document?: string;
  isRequested?: boolean;
  hoveredObservation: string;
  setHoveredObservation: (id: string) => void;
}) => {
  const efficiencyObservation = variant.metrics
    .flatMap((metric) => metric.observations)
    .find((observation) => observation.id === 'energyEfficiencyClass');

  const economyObservation = variant.metrics
    .flatMap((metric) => metric.observations)
    .find((observation) => observation.id === 'energyPerYear');

  return (
    <Styled.Item direction="column">
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

        {/* economyObservation && (
          <Styled.Economy>
            <Text align="center" appearance="bold">
              {formatNumber(economyObservation.measure as number)}
            </Text>

            <Text variant="small" align="center">
              {economyObservation.unit?.name}
            </Text>
          </Styled.Economy>
        ) */}
      </Styled.Image>

      <Styled.Content direction="column">
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
