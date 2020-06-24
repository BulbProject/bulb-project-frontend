import React, { FC, useMemo } from 'react';
import Text from 'ustudio-ui/components/Text';

import type { AvailableVariant, Item as ItemType } from 'shared/entity/data';
import { useCategory } from 'core/context/category-provider';

import { Item } from '../item';
import Styled from './items.styles';

export const Items: FC<{ availableVariants: AvailableVariant[] }> = ({ availableVariants }) => {
  const {
    category: { items, documents },
  } = useCategory();

  const itemsQuantity = useMemo(() => availableVariants.length - 1, [availableVariants.length]);

  return (
    <Styled.Items direction="column">
      <Styled.AvailableVariants>
        <Styled.ItemsTitle>
          <Text variant="body" appearance="bold" color="var(--c-dark)">
            {itemsQuantity > 1 ? 'Більш енергоефективні варіанти' : 'Більш енергоефективний варіант'}
          </Text>
        </Styled.ItemsTitle>

        {availableVariants.slice(1).map((variant) => {
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
