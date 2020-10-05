import React, { FC, useMemo } from 'react';
import Text from 'ustudio-ui/components/Text';
import i18next from 'i18next';

import type { AvailableVariant, Item as ItemType } from 'shared/entity/data';
import { useCategory } from 'core/context/category-provider';

import { FilterDrawer } from '../filter-drawer';
import { Item } from '../item';

import Styled from './items.styles';


export const Items: FC<{
  availableVariants: AvailableVariant[];
  isDrawerOpen: boolean;
  setDrawerOpen: (isDrawerOpen: boolean) => void;
  showFilter?: boolean;
  isRequestedNeedAbsent?: boolean;
}> = ({ availableVariants, isDrawerOpen, setDrawerOpen, isRequestedNeedAbsent = false }) => {
  const {
    category: { items, documents },
  } = useCategory();

  const itemsQuantity = useMemo(() => availableVariants.length - 1, [availableVariants.length]);
  const areCriteriaAbsent = useMemo(() => {
    return 'criteria' in availableVariants[0] && availableVariants[0]?.criteria?.length === 0;
  }, [availableVariants]);

  return (
    <Styled.Items direction="column" isRequestedNeedAbsent={isRequestedNeedAbsent}>
      <Styled.AvailableVariants>
        <Styled.ItemsTitle>
          {isRequestedNeedAbsent && !areCriteriaAbsent && (
            <FilterDrawer
              isDrawerOpen={isDrawerOpen}
              setDrawerOpen={setDrawerOpen}
              isRequestedNeedAbsent={isRequestedNeedAbsent}
            />
          )}

          {!isRequestedNeedAbsent && areCriteriaAbsent && (
            <Text variant="body" appearance="bold" color="var(--c-dark)">
              {itemsQuantity > 1 ? i18next.t('variants') : i18next.t('variant')}
            </Text>
          )}
        </Styled.ItemsTitle>

        {availableVariants.map((variant, index) => {
          const relatedItem = items.find((item) => item.id === variant.relatedItem) as ItemType;

          const relatedDocument = documents?.find(
            (document) => document.relatesTo === 'item' && document.relatedItem === relatedItem.id
          );

          return (
            <Item
              key={variant.id}
              variant={variant}
              item={relatedItem}
              document={relatedDocument?.url}
              showMetricsTitles={isRequestedNeedAbsent && index === 0}
            />
          );
        })}
      </Styled.AvailableVariants>
    </Styled.Items>
  );
};
