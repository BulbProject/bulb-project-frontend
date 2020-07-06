import React, { FC } from 'react';
import Flex from 'ustudio-ui/components/Flex';

import { useCategory } from 'core/context/category-provider';
import type { AvailableVariant, Item as ItemType } from 'shared/entity/data';

import { Item } from '../item';
import { FilterDrawer } from '../filter-drawer';

import Styled from './requested-need.styles';

export const RequestedNeed: FC<{
  hasMany: boolean;
  isDrawerOpen: boolean;
  setDrawerOpen: (isDrawerOpen: boolean) => void;
  requestedNeed: AvailableVariant;
}> = ({ hasMany, isDrawerOpen, setDrawerOpen, requestedNeed }) => {
  const { category } = useCategory();

  return (
    <Styled.RequestedNeed direction="column">
      <Flex
        alignment={{ horizontal: 'space-between', vertical: 'center' }}
        margin={{ bottom: 'large', top: 'regular' }}
        padding={hasMany ? { left: 'regular' } : undefined}
      >
        <Styled.Title
          variant="body"
          // Another bug in props types
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          appearance="bold"
        >
          Те, що Ви шукали
        </Styled.Title>
        <FilterDrawer isDrawerOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen} />
      </Flex>

      <Item
        isRequested
        showMetrics
        variant={requestedNeed}
        item={category.items.find((item) => item.id === requestedNeed.relatedItem) as ItemType}
        document={
          (category?.documents ?? []).find((document) => {
            return document.relatesTo === 'item' && document.relatedItem === requestedNeed.relatedItem;
          })?.url
        }
      />
    </Styled.RequestedNeed>
  );
};
