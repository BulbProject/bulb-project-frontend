import React, { useCallback, useMemo, useState } from 'react';

import { css } from 'styled-components';

import type { Observation } from 'ts4ocds/extensions/metrics';

import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';
import Button from 'ustudio-ui/components/Button';

import { Classification } from 'shared';
import { formatNumber } from 'utils';

import Bulb from '../../../../assets/images/bulb.svg';
import { useCalculationContext } from '../../store';
import { CategoryFeature } from '../CategoryFeature';
import { Specification } from '../Specification';

import { Metrics, MarketModal } from './components';

import Styled from './Item.styles';
import type { ItemProps } from './Item.types';

export const Item = ({ variant, item, document, isRequested = false }: ItemProps) => {
  const { category } = useCalculationContext();

  const isLed = useMemo(() => item.classification?.id === '31712341-2', [item.classification?.id]);

  const [isMarketModalOpen, setMarketModalOpen] = useState(false);

  const isEconomyObservation = useCallback(
    ({ id }: { id: string }) => id === 'serviceLife' || id === 'energyEconomy' || id === 'financeEconomy',
    []
  );

  const economyObservations = useMemo(() => {
    return variant.metrics
      .flatMap(({ observations }) => observations)
      .filter(isEconomyObservation)
      .sort(({ id }) => (id === 'energyEconomy' ? 1 : -1));
  }, [JSON.stringify(variant.metrics)]);

  const metrics = useMemo(() => {
    return variant.metrics.filter(({ observations }) => !observations.filter(isEconomyObservation).length);
  }, [JSON.stringify(variant.metrics)]);

  const getUnit = useCallback(
    (observation: Observation) => {
      return observation.unit?.name || observation.value?.currency || '';
    },
    [JSON.stringify(variant)]
  );

  const [imgLink, setImgLink] = useState(document);

  const [isSpecificationOpen, setSpecificationOpen] = useState(false);

  return (
    <Styled.Item direction="column">
      <Styled.ImageContainer isReversed={!isRequested}>
        <CategoryFeature availableVariant={variant} item={item} isItemRequested={isRequested} />

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

        <Styled.Image src={imgLink} onError={() => setImgLink(Bulb)} />
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

        <Metrics isRequested={isRequested} showTitles={isRequested} metrics={metrics} />

        <Metrics
          isRequested={isRequested}
          metrics={[
            {
              id: '0300',
              title: 'Пропозиції на Prozorro-Market',
              observations: [
                {
                  id: 'prozorroQuantity',
                  notes: 'Кількість пропозицій',
                  measure: isLed ? 109 : '-',
                  unit: isLed
                    ? {
                        name: 'шт',
                      }
                    : undefined,
                },
                {
                  id: 'prozorroPrice',
                  notes: 'Середня вартість',
                  value: {
                    // @ts-ignore
                    amount: isLed ? 22.8 : '-',
                    currency: isLed ? 'UAH' : undefined,
                  },
                  unit: isLed
                    ? {
                        name: 'грн',
                      }
                    : undefined,
                },
              ],
            },
          ]}
          showTitles={isRequested}
        />

        <Flex direction="column" margin={{ top: 'regular' }}>
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
            onClick={() => setSpecificationOpen(true)}
          >
            Тендерна документація
          </Button>

          {isLed && (
            <>
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
                onClick={() => setMarketModalOpen(true)}
              >
                Prozorro Market
              </Button>

              <MarketModal isOpen={isMarketModalOpen} setOpen={setMarketModalOpen} />
            </>
          )}

          <Specification
            isOpen={isSpecificationOpen}
            setOpen={setSpecificationOpen}
            criterion={variant.criteria[0]}
            availableVariant={variant}
            categoryTitle={category.title}
          />
        </Flex>
      </Styled.Content>
    </Styled.Item>
  );
};
