import React, { FC } from 'react';
import Text from 'ustudio-ui/components/Text';

import type { AvailableVariant, Item as ItemType } from 'shared/entity/data';
import { useCategory } from 'core/context/category-provider';

import { Item } from '../item';
import Styled from './items.styles';
import { FilterDrawer } from '../filter-drawer';
import { useCalculation } from '../../../shared/context/calculation';

export const Items: FC<{
  availableVariants: AvailableVariant[];
  isDrawerOpen: boolean;
  setDrawerOpen: (isDrawerOpen: boolean) => void;
  showFilter?: boolean;
  noRequested?: boolean;
}> = ({ availableVariants, isDrawerOpen, setDrawerOpen, showFilter = false, noRequested = false  }) => {
  const {
    category: { items, documents },
  } = useCategory();

  const { calculationData } = useCalculation();

  const { requestedVariant } = calculationData ?? {};

  return (
    <Styled.Items direction="column">
      <Styled.AvailableVariants>
        <Styled.ItemsTitle>
          <Text variant="body" appearance="bold" color="var(--c-dark)">
            {showFilter && (
              <FilterDrawer
                isDrawerOpen={isDrawerOpen}
                setDrawerOpen={setDrawerOpen}
              />
            )}
          </Text>
        </Styled.ItemsTitle>

        {availableVariants.slice(Number(Boolean(requestedVariant))).map((variant) => {
          const relatedItem = items.find((item) => item.id === variant.relatedItem) as ItemType;

          const relatedDocument = documents?.find(
            (document) => document.relatesTo === 'item' && document.relatedItem === relatedItem.id
          );

          return <Item key={variant.id} variant={variant} item={relatedItem} document={relatedDocument?.url} />;
        })}
      </Styled.AvailableVariants>
    </Styled.Items>
  );
};
