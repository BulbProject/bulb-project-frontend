import React from 'react';
import type { Document } from 'ts4ocds';

import type { Item as IItem } from 'types/data';

import { availableVariants } from './harcode.json';

import { Item } from './components';

import Styled from './Items.styles';

export const Items = ({ items, documents }: { items: IItem[]; documents: Document[] }) => {
  return (
    <Styled.Items>
      {availableVariants.map((variant) => {
        const relatedItem = items.find((item) => item.id === variant.relatedItem) as IItem;
        //@TODO узнать как связаны доки с айтемами
        const relatedDocument = documents?.find((document) => document.id === relatedItem.id);

        //@TODO problem with hardcode
        //@ts-ignore
        return <Item key={variant.id} variant={variant} item={relatedItem} document={relatedDocument} />;
      })}
    </Styled.Items>
  );
};
