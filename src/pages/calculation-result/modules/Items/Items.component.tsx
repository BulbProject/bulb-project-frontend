import React from 'react';

import useMediaQuery from 'ustudio-ui/hooks/use-media-query';

import type { AvailableVariant, Item as IItem } from 'types/data';

import { useCalculationContext } from '../../store';

import { Item } from './components';
import Styled from './Items.styles';

export const Items = ({ availableVariants }: { availableVariants: AvailableVariant[] }) => {
  const {
    category: { items, documents },
  } = useCalculationContext();

  const isMd = useMediaQuery('screen and (min-width: 798px)');

  return (
    <Styled.Items direction={isMd ? 'row' : 'column'}>
      <Item
        variant={availableVariants[0]}
        item={items.find((item) => item.id === availableVariants[0].relatedItem) as IItem}
        document={
          documents?.find((document) => {
            return document.relatesTo === 'item' && document.relatedItem === availableVariants[0].relatedItem;
          })?.url
        }
        isSearched
      />

      <Styled.AvailableVariants isMd={isMd}>
        {availableVariants.slice(1).map((variant) => {
          const relatedItem = items.find((item) => item.id === variant.relatedItem) as IItem;

          const relatedDocument = documents?.find(
            (document) => document.relatesTo === 'item' && document.relatedItem === relatedItem.id
          );

          return <Item key={variant.id} variant={variant} item={relatedItem} document={relatedDocument?.url} />;
        })}
      </Styled.AvailableVariants>
    </Styled.Items>
  );
};
