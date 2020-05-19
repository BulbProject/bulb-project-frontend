import React, { useCallback, useMemo, useState } from 'react';

import { css } from 'styled-components';

import { Observation } from 'ts4ocds/extensions/metrics';

import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';

import { Classification } from 'shared';
import { formatNumber } from 'utils';

import Bulb from '../../../../assets/images/bulb.svg';

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
}: ItemProps) => {
  const isEconomyObservation = useCallback(
    ({ id }: { id: string }) => id === 'serviceLife' || id === 'energyEconomy' || id === 'financeEconomy',
    []
  );

  const efficiencyObservation = useMemo(() => {
    return variant.metrics
      .flatMap((metric) => metric.observations)
      .find((observation) => observation.id === 'energyEfficiencyClass');
  }, [JSON.stringify(variant.metrics)]);

  const economyObservations = useMemo(() => {
    return variant.metrics
      .flatMap(({ observations }) => observations)
      .filter(isEconomyObservation)
      .sort(({ id }) => (id === 'energyEconomy' ? 1 : -1));
  }, [JSON.stringify(variant.metrics)]);

  const getUnit = useCallback(
    (observation: Observation) => {
      return observation.unit?.name || observation.value?.currency || '';
    },
    [JSON.stringify(variant)]
  );

  const [imgLink, setImgLink] = useState(Bulb);

  return (
    <Styled.Item direction="column">
      <Styled.ImageContainer isReversed={!isRequested}>
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

        {Boolean(economyObservations.length) && (
          <Styled.EconomyContainer>
            {economyObservations.map((observation) => (
              <Styled.Economy
                key={observation.id}
                $backgroundColor={observation.id === 'energyEconomy' ? 'secondary' : 'primary'}
              >
                <Styled.EconomyNote variant="small">{observation.notes}</Styled.EconomyNote>

                <Styled.EconomyMeasure>
                  {getUnit(observation) ? (
                    <Text appearance="bold">
                      {formatNumber((observation.measure as number) || observation.value?.amount)}
                    </Text>
                  ) : (
                    <Flex alignment={{ vertical: 'center', horizontal: 'end' }}>
                      <Styled.BoldText variant="small">x&nbsp;</Styled.BoldText>

                      <Styled.EconomyTimesMeasure>
                        {formatNumber((observation.measure as number) || observation.value?.amount)}
                      </Styled.EconomyTimesMeasure>
                    </Flex>
                  )}

                  {getUnit(observation) && (
                    <Styled.EconomyUnit
                      variant="small"
                      styled={{
                        Text: css`
                          white-space: nowrap;
                        `,
                      }}
                    >
                      {getUnit(observation)}
                    </Styled.EconomyUnit>
                  )}
                </Styled.EconomyMeasure>
              </Styled.Economy>
            ))}
          </Styled.EconomyContainer>
        )}

        <Styled.Image src={imgLink} onLoad={() => setImgLink(document)} onError={() => setImgLink(imgLink)} />
      </Styled.ImageContainer>

      <Styled.Content direction="column">
        <Styled.ItemDescription>
          <Text variant="body" appearance="bold">
            {item.description}
          </Text>

          <Flex margin={{ top: 'medium', bottom: 'medium' }} alignment={{ horizontal: 'center' }}>
            <Classification {...item.classification} />
          </Flex>

          <Text variant="h6">{`Кількість: ${variant.quantity}`}</Text>
        </Styled.ItemDescription>

        <Metrics
          showTitles={isRequested}
          metrics={variant.metrics.filter(({ observations }) => !observations.filter(isEconomyObservation).length)}
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
