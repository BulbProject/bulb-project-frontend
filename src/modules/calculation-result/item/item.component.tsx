import React, { FC, useEffect, useMemo, useState } from 'react';
import { css } from 'styled-components';
import { useTranslation } from 'react-i18next';

import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';
import Button from 'ustudio-ui/components/Button';

import { Classification } from 'shared/components';
import { AvailableVariant, Item as ItemType } from 'shared/entity/data';
import { useCalculation } from 'shared/context/calculation';
import { useCategory } from 'core/context/category-provider';

import Bulb from '../../../assets/images/bulb.svg';
import recommendedBadge from '../../../assets/images/recommended-badge.svg';

import { CategoryFeature } from '../category-feature';
import { Specification } from '../specification';
import { Economy } from './economy';

import { MarketModal } from './market-modal';
import { Metrics } from './metrics';

import Styled from './item.styles';

const isEconomyObservation = ({ id }: { id: string }): boolean => {
  return id === 'serviceLife' || id === 'energyEconomy' || id === 'financeEconomy';
};

export const Item: FC<{
  variant: AvailableVariant;
  item: ItemType;
  document?: string;
  isRequested?: boolean;
  showMetricsTitles?: boolean;
}> = ({ variant, item, document, isRequested = false, showMetricsTitles = false }) => {
  const { category } = useCategory();

  const { calculationData } = useCalculation();

  const { recommendedVariant } = calculationData ?? {};

  const isLed = useMemo(() => item.classification?.id === '31712341-2', [item.classification?.id]);

  const [isMarketModalOpen, setMarketModalOpen] = useState(false);

  const { t } = useTranslation(['item', 'common']);

  const economyObservations = useMemo(() => {
    return variant.metrics
      .flatMap(({ observations }) => observations)
      .filter(isEconomyObservation)
      .sort(({ id }) => (id === 'energyEconomy' ? 1 : -1));
  }, [variant.id]);

  const metrics = useMemo(() => {
    return variant.metrics.filter(({ observations }) => !observations.some(isEconomyObservation));
  }, [variant.id]);

  const [imgLink, setImgLink] = useState(document);

  useEffect(() => {
    setImgLink(document);
  }, [document]);

  const [isSpecificationOpen, setSpecificationOpen] = useState(false);

  return (
    <Styled.Item direction="column">
      {variant.relatedItem === recommendedVariant && (
        <Styled.RecommendedVariant
          title={t('recommended-option')}
          src={recommendedBadge}
          alt={t('recommended-option')}
        />
      )}

      <Styled.ImageContainer isReversed={!isRequested}>
        <CategoryFeature availableVariant={variant} item={item} isItemRequested={isRequested} />

        {Boolean(economyObservations.length) && <Economy economyObservations={economyObservations} />}

        <Styled.Image src={imgLink} onError={() => setImgLink(Bulb as string)} />
      </Styled.ImageContainer>

      <Styled.Content direction="column">
        <Styled.ItemDescription>
          <Text
            variant="body"
            appearance="bold"
            styled={{
              Text: css`
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
              `,
            }}
            title={item.description}
          >
            {item.description}
          </Text>

          <Flex margin={{ top: 'medium', bottom: 'medium' }} alignment={{ horizontal: 'center' }}>
            <Classification {...item.classification} />
          </Flex>

          <Text variant="h6">{`Кількість: ${variant.quantity}`}</Text>
        </Styled.ItemDescription>

        <Metrics isRequested={isRequested} showTitles={showMetricsTitles} metrics={metrics} />

        <Metrics
          isRequested={isRequested}
          metrics={[
            {
              id: '0300',
              title: t('item:offers-on-Prozorro-market'),
              observations: [
                {
                  id: 'prozorroQuantity',
                  notes: t('item:proposals-number'),
                  measure: isLed ? 109 : '-',
                  unit: isLed
                    ? {
                        name: 'шт',
                      }
                    : undefined,
                },
                {
                  id: 'prozorroPrice',
                  notes: t('item:average-cost'),
                  value: {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-ignore
                    amount: isLed ? 22.8 : '-',
                    currency: isLed ? 'UAH' : undefined,
                  },
                  unit: isLed
                    ? {
                        name: t('item:uah'),
                      }
                    : undefined,
                },
              ],
            },
          ]}
          showTitles={showMetricsTitles}
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
            {t('common:documentation')}
          </Button>

          {isLed && (
            <>
              <Button
                styled={{
                  Button: css`
                     {
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
            criterion={variant.criteria?.[0]}
            availableVariant={variant}
            categoryTitle={category.title}
          />
        </Flex>
      </Styled.Content>
    </Styled.Item>
  );
};
