import React from 'react';

import type { Item as IItem } from 'types/data';

import { useCalculationContext } from '../../store';

import { Item } from './components';
import Styled from './Items.styles';

export const Items = () => {
  const {
    availableVariants,
    category: { items, documents },
  } = useCalculationContext();

  return (
    <Styled.Items>
      {availableVariants.map((variant) => {
        const relatedItem = items.find((item) => item.id === variant.relatedItem) as IItem;

        const relatedDocument = documents?.find(
          (document) => document.relatesTo === 'item' && document.relatedItem === relatedItem.id
        );

        return <Item key={variant.id} variant={variant} item={relatedItem} document={relatedDocument?.url} />;
      })}
    </Styled.Items>
  );
};
