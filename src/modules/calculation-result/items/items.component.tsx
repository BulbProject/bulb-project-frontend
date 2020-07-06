import React, { FC, useMemo } from 'react';
import Text from 'ustudio-ui/components/Text';

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

  return (
    <Styled.Items direction="column" isRequestedNeedAbsent={isRequestedNeedAbsent}>
      <Styled.AvailableVariants>
        <Styled.ItemsTitle>
          {isRequestedNeedAbsent ? (
            <FilterDrawer
              isDrawerOpen={isDrawerOpen}
              setDrawerOpen={setDrawerOpen}
              isRequestedNeedAbsent={isRequestedNeedAbsent}
            />
          ) : (
            <Text variant="body" appearance="bold" color="var(--c-dark)">
              {itemsQuantity > 1 ? 'Більш енергоефективні варіанти' : 'Більш енергоефективний варіант'}
            </Text>
          )}
        </Styled.ItemsTitle>

        {availableVariants.map((variant) => {
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
