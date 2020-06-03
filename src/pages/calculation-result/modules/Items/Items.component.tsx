import React, { useMemo } from 'react';
import Text from 'ustudio-ui/components/Text';

import type { AvailableVariant, Item as ItemType } from 'types/data';

import { useCalculationContext } from '../../store';

import { Item } from '../Item';
import Styled from './Items.styles';

export const Items = ({ availableVariants }: { availableVariants: AvailableVariant[] }) => {
  const {
    category: { items, documents },
  } = useCalculationContext();

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
